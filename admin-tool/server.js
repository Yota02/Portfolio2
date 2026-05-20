const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Config paths
const PORTFOLIO_ROOT = path.join(__dirname, '..');
const PROJECTS_TS_PATH = path.join(PORTFOLIO_ROOT, 'src/data/projects.ts');
const PUBLIC_PROJET_DIR = path.join(PORTFOLIO_ROOT, 'public/projet');
const PUBLIC_ICONE_DIR = path.join(PORTFOLIO_ROOT, 'public/icone');
const LOCALES_DIR = path.join(PORTFOLIO_ROOT, 'src/locales');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/portfolio-assets', express.static(path.join(PORTFOLIO_ROOT, 'public')));
app.use('/temp-uploads', express.static(path.join(__dirname, 'temp_uploads')));

const ADMIN_DATA_DIR = path.join(__dirname);
const PROJECTS_JSON = path.join(ADMIN_DATA_DIR, 'data/projects.json');
const TECHS_JSON = path.join(ADMIN_DATA_DIR, 'data/techs.json');

// Helper to get nested object property
function getNested(obj, pathStr) {
    return pathStr.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

// Helper to set nested object property
function setNested(obj, pathStr, value) {
    const keys = pathStr.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((prev, curr) => {
        if (!prev[curr]) prev[curr] = {};
        return prev[curr];
    }, obj);
    lastObj[lastKey] = value;
}

function syncPortfolio(projects) {
    let tsContent = fs.readFileSync(PROJECTS_TS_PATH, 'utf8');
    const projectsArrayMatch = tsContent.match(/export const projects: Project\[\] = \[([\s\S]*?)\];/);
    if (projectsArrayMatch) {
        const formattedProjects = projects.map(p => {
            const cleanProject = { ...p };
            delete cleanProject.tempLogo;
            delete cleanProject.tempImages;
            delete cleanProject.imageOrder;
            return `  ${JSON.stringify(cleanProject, null, 2).replace(/"([^"]+)":/g, '$1:')}`;
        }).join(',\n');
        
        tsContent = tsContent.replace(projectsArrayMatch[1], `\n${formattedProjects}\n`);
        fs.writeFileSync(PROJECTS_TS_PATH, tsContent);
    }
}

function syncTechs(techs) {
    let tsContent = fs.readFileSync(PROJECTS_TS_PATH, 'utf8');
    const techMapMatch = tsContent.match(/export const techIconMap: Record<string, string> = \{([\s\S]*?)\};/);
    if (techMapMatch) {
        const formattedTechs = Object.entries(techs)
            .map(([name, icon]) => `  "${name}": "${icon}"`)
            .join(',\n');
        tsContent = tsContent.replace(techMapMatch[1], `\n${formattedTechs}\n`);
        fs.writeFileSync(PROJECTS_TS_PATH, tsContent);
    }
}

app.get('/api/techs', (req, res) => res.json(JSON.parse(fs.readFileSync(TECHS_JSON))));

app.post('/api/techs', (req, res) => {
    try {
        const { name, icon, tempIcon } = req.body;
        const techs = JSON.parse(fs.readFileSync(TECHS_JSON));
        
        let finalIcon = icon;
        if (tempIcon) {
            const ext = path.extname(tempIcon);
            const iconName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            finalIcon = (ext.toLowerCase() === '.webp') ? iconName : `${iconName}${ext}`;
            const source = path.join(__dirname, 'temp_uploads', tempIcon);
            const target = path.join(PUBLIC_ICONE_DIR, `${iconName}${ext}`);
            fs.copyFileSync(source, target);
        }

        techs[name] = finalIcon;
        fs.writeFileSync(TECHS_JSON, JSON.stringify(techs, null, 2));
        syncTechs(techs);
        res.json({ success: true, techs });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/projects', (req, res) => res.json(JSON.parse(fs.readFileSync(PROJECTS_JSON))));

app.get('/api/locales', (req, res) => {
    const locales = {};
    const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        const lang = file.replace('.json', '');
        locales[lang] = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, file)));
    });
    res.json(locales);
});

app.post('/api/upload', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const tempDir = path.join(__dirname, 'temp_uploads');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
            cb(null, tempDir);
        },
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    })
}).fields([
    { name: 'logo', maxCount: 1 }, 
    { name: 'images', maxCount: 10 },
    { name: 'techIcon', maxCount: 1 }
]), (req, res) => {
    const files = req.files;
    res.json({
        logo: files.logo ? files.logo[0].filename : null,
        images: files.images ? files.images.map(f => f.filename) : [],
        techIcon: files.techIcon ? files.techIcon[0].filename : null
    });
});

app.post('/api/projects', (req, res) => {
    try {
        const { project: projectData, translations } = req.body;
        const projectFolder = path.join(PUBLIC_PROJET_DIR, projectData.folder);
        const tempDir = path.join(__dirname, 'temp_uploads');

        if (!fs.existsSync(projectFolder)) fs.mkdirSync(projectFolder, { recursive: true });

        // Handle translations
        if (translations) {
            Object.keys(translations).forEach(lang => {
                const localePath = path.join(LOCALES_DIR, `${lang}.json`);
                if (fs.existsSync(localePath)) {
                    const localeData = JSON.parse(fs.readFileSync(localePath));
                    Object.keys(translations[lang]).forEach(key => {
                        setNested(localeData, key, translations[lang][key]);
                    });
                    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
                }
            });
        }

        // Handle logo
        let finalLogo = projectData.logo || 'logo.webp';
        if (projectData.tempLogo) {
            const ext = path.extname(projectData.tempLogo);
            finalLogo = 'logo' + ext;
            fs.copyFileSync(path.join(tempDir, projectData.tempLogo), path.join(projectFolder, finalLogo));
        }

        // Handle images
        const finalImages = projectData.imageOrder ? projectData.imageOrder.map(imgName => {
            if (imgName.includes('-')) {
                const originalName = imgName.split('-').slice(1).join('-');
                const source = path.join(tempDir, imgName);
                if (fs.existsSync(source)) fs.copyFileSync(source, path.join(projectFolder, originalName));
                return originalName;
            }
            return imgName;
        }) : projectData.images;

        const newProject = {
            id: projectData.id || `project-${Date.now()}`,
            name: projectData.name,
            description: projectData.description || "",
            longDescription: projectData.longDescription || "",
            context: projectData.context || "",
            personalContribution: projectData.personalContribution || "",
            duration: projectData.duration || "",
            tags: projectData.tags || [],
            images: finalImages || [],
            logo: finalLogo,
            category: projectData.category,
            purpose: projectData.purpose,
            features: projectData.features || [],
            links: projectData.links || { demo: "#", github: "#" },
            folder: projectData.folder,
            isOngoing: projectData.isOngoing || false,
            startDate: projectData.startDate || "",
            endDate: projectData.endDate || "",
            newTech: projectData.newTech || [],
            competencies: projectData.competencies || []
        };

        const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON));
        const index = projects.findIndex(p => p.id === newProject.id);
        if (index > -1) projects[index] = newProject;
        else projects.push(newProject);

        fs.writeFileSync(PROJECTS_JSON, JSON.stringify(projects, null, 2));
        syncPortfolio(projects);

        res.json({ success: true, project: newProject });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/projects/:id', (req, res) => {
    try {
        const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON));
        const filtered = projects.filter(p => p.id !== req.params.id);
        fs.writeFileSync(PROJECTS_JSON, JSON.stringify(filtered, null, 2));
        syncPortfolio(filtered);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
