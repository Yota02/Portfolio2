export type ProjectCategory = "IA" | "Dev Web" | "Logiciel" | "Jeux Vidéo";
export type ProjectPurpose = "Éducation" | "Personnel" | "Professionnel";

export interface SubProject {
  id: string;
  name: string; // Key or name
  description: string; // Key
  images: string[];
  features: string[]; // Keys
}

export interface ProjectMetric {
  value: number;
  suffix?: string;
  labelKey: string;
}

export interface Project {
  id: string;
  name: string;
  version?: string;
  groupId?: string;
  description: string; // Key
  longDescription: string; // Key
  context?: string; // Key
  personalContribution?: string; // Key
  duration?: string; // Key
  tags: string[];
  images: string[];
  logo: string;
  logo_recadrer?: string;
  category: ProjectCategory;
  purpose: ProjectPurpose;
  features: string[]; // Keys
  links: {
    demo: string;
    github: string;
  };
  folder: string;
  startDate?: string; // Key
  endDate?: string; // Key
  isOngoing?: boolean;
  newTech: string[];
  subProjects?: SubProject[];
  metrics?: ProjectMetric[];
}

export const techIconMap: Record<string, string> = {
  "Python": "python",
  "Flask": "flask",
  "JavaScript": "javascript",
  "HTML5": "html",
  "CSS3": "css",
  "Excel": "excel",
  "Docker": "docker",
  "Scrum": "scrum",
  "MySQL": "mysql",
  "MVC": "mvc",
  "Vue.js": "vuejs",
  "TypeScript": "typescript",
  "Vite": "vite",
  "Unity": "unity",
  "C#": "csharp",
  "IA": "ia",
  "Pytorch": "pytorch",
  "TensorFlow": "tensorflow",
  "Ctfd": "ctfd",
  "Apache": "apache",
  "Conda": "conda",
  "Git": "git",
  "PHP": "php.webp",
  "JavaFX": "JavaFX",
  "Java": "java",
  "Pandas": "pandas",
  "NumPy": "numpy",
  "PyGame": "pygame",
  "SSH": "ssh",
  "WordPress": "wordpress",
  "Linux": "linux",
  "Symfony": "symfony",
  "Bootstrap": "bootstrap",
  "Reinforcement Learning": "reinforcement_learning",
  "Jeux": "jeux",
  "Twig": "twig",
  "JUnit": "junit",
  "Tkinter": "Tkinter",
  "CustomTkinter": "CustomTkinter",
  "Watchdog": "Watchdog",
  "Firebase": "firebase",
  "ChromaDb": "chromadb",
  "Ollama": "ollama",
  "Spark": "spark",
  "Hadoop": "hadoop",
  "Kubernetes": "kubernetes",
  "Terraform": "terraform",
  "Prometheus": "prometheus",
  "Grafana": "grafana",
  "GitHub Actions": "githubactions",
  "react": "react.png",
  "Hugging face": "huggingface.png"
};

export const categoryOrder: ProjectCategory[] = ["Dev Web", "IA", "Jeux Vidéo", "Logiciel"];

export const projects: Project[] = [
  {
  id: "project-1",
  name: "CodeTonFutur",
  description: "projects.items.project-1.description",
  longDescription: "projects.items.project-1.longDescription",
  context: "projects.items.project-1.context",
  personalContribution: "projects.items.project-1.personalContribution",
  duration: "projects.items.project-1.duration",
  tags: [
    "Flask",
    "Python",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3"
  ],
  images: [
    "main.webp",
    "chatbot.webp",
    "Exercice1.webp",
    "progression.webp"
  ],
  logo: "logo.webp",
  category: "Dev Web",
  purpose: "Personnel",
  features: [
    "projects.items.project-1.features.0",
    "projects.items.project-1.features.1"
  ],
  links: {
    demo: "#",
    github: "#"
  },
  folder: "CodeTonFutur",
  startDate: "projects.items.project-1.startDate",
  isOngoing: true,
  newTech: []
},
  {
  id: "project-2",
  name: "Break The Code",
  description: "projects.items.project-2.description",
  longDescription: "projects.items.project-2.longDescription",
  context: "projects.items.project-2.context",
  personalContribution: "projects.items.project-2.personalContribution",
  duration: "projects.items.project-2.duration",
  tags: [
    "Python",
    "Flask",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Docker",
    "Scrum",
    "MySQL",
    "SSH"
  ],
  images: [
    "backlog.webp",
    "affichage_challenge.webp",
    "breakthecode1.webp",
    "challenge.webp",
    "ssh.webp",
    "rainbow_jumper.gif",
    "cristal_malicieux.gif"
  ],
  logo: "logo.webp",
  category: "Dev Web",
  purpose: "Éducation",
  features: [
    "projects.items.project-2.features.0",
    "projects.items.project-2.features.1",
    "projects.items.project-2.features.2"
  ],
  links: {
    demo: "#",
    github: "#"
  },
  folder: "CTF",
  startDate: "projects.items.project-2.startDate",
  endDate: "projects.items.project-2.endDate",
  isOngoing: false,
  newTech: [
    "Docker",
    "Scrum",
    "SSH",
    "Flask"
  ],
  subProjects: [
    {
      id: "sub-1",
      name: "projects.items.project-2.subProjects.0.name",
      description: "projects.items.project-2.subProjects.0.description",
      images: [
        "ssh.webp"
      ],
      features: [
        "projects.items.project-2.subProjects.0.features.0",
        "projects.items.project-2.subProjects.0.features.1"
      ]
    },
    {
      id: "sub-2",
      name: "projects.items.project-2.subProjects.1.name",
      description: "projects.items.project-2.subProjects.1.description",
      images: [
        "rainbow_jumper.gif"
      ],
      features: [
        "projects.items.project-2.subProjects.1.features.0",
        "projects.items.project-2.subProjects.1.features.1"
      ]
    }
  ]
},
  {
  id: "project-3",
  name: "Capital Wars",
  description: "projects.items.project-3.description",
  longDescription: "projects.items.project-3.longDescription",
  context: "projects.items.project-3.context",
  personalContribution: "projects.items.project-3.personalContribution",
  duration: "projects.items.project-3.duration",
  tags: [
    "Symfony",
    "Twig",
    "CSS3",
    "HTML5",
    "JavaScript",
    "MySQL"
  ],
  images: [
    "live_capture.webp",
    "uml_plugins.webp",
    "mcd.webp",
    "code_plugin.webp",
    "capital-wars.webp",
    "capital-wars2.webp",
    "capital-wars3.webp"
  ],
  logo: "logo.webp",
  category: "Jeux Vidéo",
  purpose: "Éducation",
  features: [
    "projects.items.project-3.features.0",
    "projects.items.project-3.features.1",
    "projects.items.project-3.features.2",
    "projects.items.project-3.features.3",
    "projects.items.project-3.features.4"
  ],
  links: {
    demo: "https://dev.capitalwars.rlbrt.fr/accueil",
    github: "#"
  },
  folder: "CapitalWars",
  startDate: "projects.items.project-3.startDate",
  isOngoing: true,
  newTech: [
    "Symfony",
    "Twig"
  ]
},
  {
  id: "project-4",
  name: "Star Guardian",
  description: "projects.items.project-4.description",
  longDescription: "projects.items.project-4.longDescription",
  context: "projects.items.project-4.context",
  personalContribution: "projects.items.project-4.personalContribution",
  duration: "projects.items.project-4.duration",
  tags: [
    "Python",
    "Pandas",
    "Excel"
  ],
  images: [
    "main.webp",
    "starguardian_complet.webp",
    "execl_star_guardian.webp"
  ],
  logo: "logo.webp",
  category: "Logiciel",
  purpose: "Éducation",
  features: [
    "projects.items.project-4.features.0",
    "projects.items.project-4.features.1"
  ],
  links: {
    demo: "#",
    github: "#"
  },
  folder: "starGuardian",
  startDate: "projects.items.project-4.startDate",
  endDate: "projects.items.project-4.endDate",
  isOngoing: false,
  newTech: [
    "Pandas"
  ]
},
  {
  id: "project-5",
  name: "Trains",
  description: "projects.items.project-5.description",
  longDescription: "projects.items.project-5.longDescription",
  context: "projects.items.project-5.context",
  personalContribution: "projects.items.project-5.personalContribution",
  duration: "projects.items.project-5.duration",
  tags: [
    "Java",
    "JavaFX",
    "JUnit"
  ],
  images: [
    "Trains_IHM.webp",
    "jeux_en_cours (1).gif",
    "test_train.webp",
    "page_accueil.gif"
  ],
  logo: "logo.webp",
  category: "Jeux Vidéo",
  purpose: "Éducation",
  features: [
    "projects.items.project-5.features.0",
    "projects.items.project-5.features.1"
  ],
  links: {
    demo: "#",
    github: "#"
  },
  folder: "trains",
  startDate: "projects.items.project-5.startDate",
  endDate: "projects.items.project-5.endDate",
  isOngoing: false,
  newTech: [
    "JavaFX",
    "JUnit"
  ]
},
  {
  id: "project-6",
  name: "Img Classifier",
  description: "projects.items.project-6.description",
  longDescription: "projects.items.project-6.longDescription",
  context: "projects.items.project-6.context",
  personalContribution: "projects.items.project-6.personalContribution",
  duration: "projects.items.project-6.duration",
  tags: [
    "Python",
    "Tkinter",
    "Pytorch"
  ],
  images: [
    "res_lumine.webp",
    "cnn.webp",
    "convolution.gif",
    "entrainement.webp"
  ],
  logo: "logo.webp",
  category: "IA",
  purpose: "Personnel",
  features: [
    "projects.items.project-6.features.0",
    "projects.items.project-6.features.1",
    "projects.items.project-6.features.2"
  ],
  links: {
    demo: "#",
    github: "#"
  },
  folder: "IA_Kiana",
  startDate: "projects.items.project-6.startDate",
  endDate: "projects.items.project-6.endDate",
  isOngoing: false,
  newTech: [
    "Pytorch"
  ]
},
  {
  id: "project-7",
  name: "Victoria",
  description: "projects.items.project-7.description",
  longDescription: "projects.items.project-7.longDescription",
  context: "projects.items.project-7.context",
  personalContribution: "projects.items.project-7.personalContribution",
  duration: "projects.items.project-7.duration",
  tags: [
    "Python",
    "CustomTkinter",
    "Watchdog",
    "ChromaDb",
    "Ollama"
  ],
  images: [
    "main.webp",
    "rss.webp",
    "issue_maker.webp",
    "logo.webp"
  ],
  logo: "logo.webp",
  logo_recadrer: "logo_recadrer.webp",
  category: "IA",
  purpose: "Personnel",
  features: [
    "projects.items.project-7.features.0",
    "projects.items.project-7.features.1",
    "projects.items.project-7.features.2"
  ],
  links: {
    demo: "#",
    github: "https://github.com/Yota02/Victoria_v3"
  },
  folder: "Victoria",
  startDate: "projects.items.project-7.startDate",
  isOngoing: true,
  newTech: [
    "CustomTkinter",
    "Watchdog"
  ],
  subProjects: [
    {
      id: "sub-victoria-1",
      name: "projects.items.project-7.subProjects.0.name",
      description: "projects.items.project-7.subProjects.0.description",
      images: [
        "rss.webp"
      ],
      features: [
        "projects.items.project-7.subProjects.0.features.0",
        "projects.items.project-7.subProjects.0.features.1"
      ]
    },
    {
      id: "sub-victoria-2",
      name: "projects.items.project-7.subProjects.1.name",
      description: "projects.items.project-7.subProjects.1.description",
      images: [
        "issue_maker.webp"
      ],
      features: [
        "projects.items.project-7.subProjects.1.features.0",
        "projects.items.project-7.subProjects.1.features.1"
      ]
    }
  ]
},
  {
  id: "project-8",
  name: "World of chan",
  description: "projects.items.project-8.description",
  longDescription: "projects.items.project-8.longDescription",
  context: "projects.items.project-8.context",
  personalContribution: "projects.items.project-8.personalContribution",
  duration: "projects.items.project-8.duration",
  tags: [
    "Symfony",
    "Twig",
    "Firebase",
    "MySQL",
    "CSS3",
    "HTML5",
    "JavaScript"
  ],
  images: [
    "live_capture.jpeg",
    "main.webp",
    "shiru.webp",
    "main_langue.webp",
    "shiruchan-liste.webp",
    "shiruchan-quiz.webp"
  ],
  logo: "logo.webp",
  category: "Dev Web",
  purpose: "Personnel",
  features: [
    "projects.items.project-8.features.0",
    "projects.items.project-8.features.1",
    "projects.items.project-8.features.2"
  ],
  links: {
    demo: "https://yota02.github.io/WorldOfChan/",
    github: "#"
  },
  folder: "WorldOfChan",
  startDate: "projects.items.project-8.startDate",
  isOngoing: true,
  newTech: [
    "Firebase"
  ]
},
  {
  id: "project-10",
  name: "Anakomi",
  description: "projects.items.project-10.description",
  longDescription: "projects.items.project-10.longDescription",
  tags: [
    "Flask",
    "MySQL",
    "CSS3",
    "HTML5",
    "JavaScript"
  ],
  images: [
    "main_anime.webp",
    "main_jv.webp",
    "top_anime.webp"
  ],
  logo: "logo.webp",
  category: "Dev Web",
  purpose: "Personnel",
  features: [
    "projects.items.project-10.features.0",
    "projects.items.project-10.features.1"
  ],
  links: {
    demo: "https://anakomi.onrender.com/",
    github: "#"
  },
  folder: "Anakomi",
  startDate: "projects.items.project-10.startDate",
  endDate: "projects.items.project-10.endDate",
  isOngoing: false,
  newTech: []
},
  {
  id: "project-11",
  name: "Nuit de l'Info 2025",
  description: "projects.items.project-11.description",
  longDescription: "projects.items.project-11.longDescription",
  context: "projects.items.project-11.context",
  personalContribution: "projects.items.project-11.personalContribution",
  duration: "projects.items.project-11.duration",
  tags: [
    "Vue.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Git"
  ],
  images: [
    "live_capture.webp",
    "main.webp",
    "BD_presentation.webp",
    "BD.webp",
    "texte.webp",
    "tux_animation.webm"
  ],
  logo: "tux.webp",
  category: "Dev Web",
  purpose: "Éducation",
  features: [
    "projects.items.project-11.features.0",
    "projects.items.project-11.features.1",
    "projects.items.project-11.features.2"
  ],
  links: {
    demo: "https://yota02.github.io/Ndi-2026/#/",
    github: "https://github.com/Yota02/Ndi-2026"
  },
  folder: "Ndi2025",
  startDate: "projects.items.project-11.startDate",
  endDate: "projects.items.project-11.endDate",
  isOngoing: false,
  newTech: []
},
  {
  id: "project-12",
  name: "CHIRAL",
  description: "projects.items.project-12.description",
  longDescription: "projects.items.project-12.longDescription",
  tags: [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Git"
  ],
  images: [
    "live_capture.webp",
    "titre.webp",
    "agario.webp",
    "nv1.webp"
  ],
  logo: "titre.webp",
  category: "Jeux Vidéo",
  purpose: "Personnel",
  features: [
    "projects.items.project-12.features.0",
    "projects.items.project-12.features.1",
    "projects.items.project-12.features.2"
  ],
  links: {
    demo: "https://yota02.github.io/CHIRAL/",
    github: "https://github.com/Yota02/CHIRAL"
  },
  folder: "CHIRAL",
  startDate: "projects.items.project-12.startDate",
  isOngoing: true,
  newTech: []
},
  {
  id: "project-13",
  name: "Loom",
  description: "projects.items.project-13.description",
  longDescription: "projects.items.project-13.longDescription",
  tags: [
    "Python",
    "TensorFlow",
    "Git",
    "Flask",
    "HTML5",
    "CSS3",
    "JavaScript"
  ],
  images: [
    "execution.webp",
    "pipeline.webp"
  ],
  logo: "logo.webp",
  category: "IA",
  purpose: "Personnel",
  features: [
    "projects.items.project-13.features.0",
    "projects.items.project-13.features.1",
    "projects.items.project-13.features.2"
  ],
  links: {
    demo: "https://yota02.github.io/KyoLoom/",
    github: "https://github.com/Yota02/KyoLoom"
  },
  folder: "KyoLoom",
  startDate: "projects.items.project-13.startDate",
  isOngoing: true,
  newTech: []
},
  {
  id: "project-gecolab",
  name: "Gecolab",
  description: "projects.items.project-gecolab.description",
  longDescription: "projects.items.project-gecolab.longDescription",
  context: "projects.items.project-gecolab.context",
  personalContribution: "projects.items.project-gecolab.personalContribution",
  duration: "projects.items.project-gecolab.duration",
  tags: [
    "Vue.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "GitHub Actions",
    "Git"
  ],
  images: [
    "main.jpeg",
    "services.jpeg",
    "contact.jpeg"
  ],
  logo: "main.jpeg",
  category: "Dev Web",
  purpose: "Professionnel",
  features: [
    "projects.items.project-gecolab.features.0",
    "projects.items.project-gecolab.features.1",
    "projects.items.project-gecolab.features.2"
  ],
  links: {
    demo: "https://www.gecolab.be/#/",
    github: "#"
  },
  folder: "Gecolab",
  startDate: "projects.items.project-gecolab.startDate",
  isOngoing: false,
  newTech: [
    "GitHub Actions"
  ]
},
  {
  id: "project-projekt-bersetzung",
  name: "Projekt Bersetzung",
  version: "1",
  groupId: "yomu-group",
  description: "projects.items.projekt-bersetzung.description",
  longDescription: "projects.items.projekt-bersetzung.longDescription",
  context: "projects.items.projekt-bersetzung.context",
  personalContribution: "projects.items.projekt-bersetzung.personalContribution",
  duration: "projects.items.projekt-bersetzung.duration",
  tags: [
    "Python",
    "Tkinter",
    "Pyinstaller",
    "Git"
  ],
  images: [
    "screenshot.webp",
    "fichier_2.webp",
    "fichier_anglais.webp",
    "fichier_français.webp"
  ],
  logo: "icon.webp",
  category: "Logiciel",
  purpose: "Personnel",
  features: [
    "projects.items.projekt-bersetzung.features.0",
    "projects.items.projekt-bersetzung.features.1"
  ],
  links: {
    demo: "",
    github: "https://github.com/Yota02/Projekt--bersetzung"
  },
  folder: "ProjektBersetzung",
  isOngoing: true,
  startDate: "projects.items.projekt-bersetzung.startDate",
  endDate: "",
  newTech: []
},
  {
  id: "project-1779285718375",
  name: "Yomu",
  version: "2",
  groupId: "yomu-group",
  description: "projects.items.yomu.description",
  longDescription: "projects.items.yomu.longDescription",
  context: "projects.items.yomu.context",
  personalContribution: "projects.items.yomu.personalContribution",
  duration: "projects.items.yomu.duration",
  tags: [
    "Flask",
    "TensorFlow",
    "Python",
    "HTML5",
    "Git",
    "Hugging face",
    "react"
  ],
  images: [
    "yomu-01.png",
    "yomu-02.png",
    "yomu-03.png"
  ],
  logo: "logo.webp",
  category: "Logiciel",
  purpose: "Personnel",
  features: [
    "projects.items.y.features.0"
  ],
  links: {
    demo: "",
    github: "https://github.com/Yota02/Yomu"
  },
  folder: "yomu",
  isOngoing: false,
  startDate: "projects.items.yomu.startDate",
  endDate: "projects.items.yomu.endDate",
  newTech: []
}
];

export const categoryMap: Record<ProjectCategory, string> = {
  "Dev Web": "web", "IA": "ia", "Jeux Vidéo": "games", "Logiciel": "software"
};

export const purposeMap: Record<ProjectPurpose, string> = {
  "Éducation": "education", "Personnel": "personnel", "Professionnel": "professionnel"
};

export const getProjectById = (id: string): Project | undefined => projects.find((p) => p.id === id);

export const getProjectsByGroupId = (groupId: string): Project[] => {
  return projects.filter((p) => p.groupId === groupId);
};

export const getProjectsByCategory = (): Record<ProjectCategory, Project[]> => {
  // First, identify the latest version for each groupId
  const latestVersions: Record<string, Project> = {};
  
  projects.forEach(project => {
    if (project.groupId) {
      const existing = latestVersions[project.groupId];
      if (!existing || (project.version && existing.version && parseInt(project.version) > parseInt(existing.version))) {
        latestVersions[project.groupId] = project;
      }
    }
  });

  return projects.reduce((groups, project) => {
    // If it's part of a group, only include it if it's the latest version
    if (project.groupId) {
      if (latestVersions[project.groupId]?.id !== project.id) {
        return groups;
      }
    }

    const category = project.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(project);
    return groups;
  }, {} as Record<ProjectCategory, Project[]>);
};
