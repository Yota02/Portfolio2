const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src/data/projects.ts');
const jsonPath = path.join(__dirname, 'admin-tool/data/projects.json');

const content = fs.readFileSync(tsPath, 'utf8');
const match = content.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);

if (match) {
    let str = match[1];
    
    // 1. Remove comments safely (not inside strings)
    // This is a common trick to handle comments vs strings
    str = str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    
    // 2. Quote keys
    str = str.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$2"$3:');
    
    // 3. Fix strings (single to double)
    str = str.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

    // 4. Remove trailing commas
    str = str.replace(/,\s*([\]}])/g, '$1');

    try {
        const projects = JSON.parse(str);
        fs.writeFileSync(jsonPath, JSON.stringify(projects, null, 2));
        console.log("Importation réussie !");
    } catch (e) {
        console.error("Erreur de parsing final.");
        const pos = e.message.match(/at position (\d+)/);
        if (pos) {
            const p = parseInt(pos[1]);
            console.error("Contexte de l'erreur :");
            console.error(str.substring(Math.max(0, p - 60), Math.min(str.length, p + 60)));
        }
        console.error(e.message);
    }
}
