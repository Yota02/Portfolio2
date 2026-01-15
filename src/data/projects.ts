export type ProjectCategory = 'IA' | 'Dev Web' | 'Logiciel' | 'Jeux Vidéo'
export type ProjectPurpose = 'Éducation' | 'Personnel'

export interface SubProject {
  id: string
  name: string
  description: string
  images: string[]
  features: string[]
}

// Interface stricte basée sur le PN du BUT Informatique
export interface Competency {
  category: 'Réaliser' | 'Optimiser' | 'Administrer' | 'Gérer' | 'Conduire' | 'Collaborer'
  level: 'Niveau 1' | 'Niveau 2' | 'Niveau 3'
  items: string[] // Liste des AC (Apprentissages Critiques)
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  images: string[]
  logo: string
  logo_recadrer?: string
  category: ProjectCategory
  purpose: ProjectPurpose
  features: string[]
  links: {
    demo: string
    github: string
  }
  folder: string
  startDate?: string
  endDate?: string
  isOngoing?: boolean
  newTech: string[]
  subProjects?: SubProject[]
  competencies?: Competency[] // Déjà optionnel, mais s'assurer qu'il est bien défini
}

export const techIconMap: Record<string, string> = {
  'Python': 'python',
  'Flask': 'flask',
  'JavaScript': 'javascript',
  'HTML5': 'html',
  'CSS3': 'css',
  'Excel': 'excel',
  'Docker': 'docker',
  'Scrum': 'scrum',
  'MySQL': 'mysql',
  'MVC': 'mvc',
  'Vue.js': 'vuejs',
  'TypeScript': 'typescript',
  'Vite': 'vite',
  'Unity': 'unity',
  'C#': 'csharp',
  'IA': 'ia',
  'Pytorch': 'pytorch',
  'TensorFlow': 'tensorflow',
  'Ctfd': 'ctfd',
  'Apache': 'apache',
  'Conda': 'conda',
  'Git': 'git',
  'JavaFX': 'JavaFX',
  'Java': 'java',
  'Pandas': 'pandas',
  'NumPy': 'numpy',
  'PyGame': 'pygame',
  'SSH': 'ssh',
  'WordPress': 'wordpress',
  'Linux': 'linux',
  'Symfony': 'symfony',
  'Bootstrap': 'bootstrap',
  'Reinforcement Learning': 'reinforcement_learning',
  'Jeux': 'jeux',
  'Twig': 'twig',
  'JUnit': 'junit',
  'Tkinter': 'Tkinter',
  'CustomTkinter': 'CustomTkinter',
  'Watchdog': 'Watchdog',
  'Firebase': 'firebase',
  'ChromaDb': 'chromadb',
  'Ollama': 'ollama',
}

export const categoryOrder: ProjectCategory[] = ['Dev Web', 'IA', 'Jeux Vidéo', 'Logiciel']

// LISTE DES PROJETS AVEC LES VRAIS AC DU BUT INFO
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'CodeTonFutur',
    description: 'CodeTonFutur est un site de vulgarisation scientifique axé sur l\'informatique.',
    longDescription: 'Ce projet est une application web complète qui démontre l\'utilisation des technologies modernes comme Vue.js, TypeScript et Vite. L\'application offre une expérience utilisateur fluide et performante.',
    tags: ['Flask', 'Python', 'MySQL','JavaScript', 'HTML5', 'CSS3'],
    images: ['main.png', 'chatbot.png', 'Exercice1.png', 'progression.png'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Chatbot intelligent basé sur GPT',
      'Exercices pratiques avec correction automatique'
    ],
    links: { demo: '#', github: '#' },
    folder: 'CodeTonFutur',
    startDate: 'Avril 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: [],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 3',
        items: [
          'AC31.01 | Choisir et implémenter les architectures adaptées (Architecture Web Vue.js/Flask)',
          'AC31.03 | Intégrer des solutions dans un environnement de production'
        ]
      },
      {
        category: 'Conduire',
        level: 'Niveau 2',
        items: [
          'AC25.02 | Formaliser les besoins du client et de l\'utilisateur'
        ]
      },
      {
        category: 'Gérer',
        level: 'Niveau 2',
        items: [
          'AC24.03 | Organiser la restitution de données à travers la programmation et la visualisation (Tableaux de bord)'
        ]
      }
    ]
  },
  {
    id: 'project-2',
    name: 'Break The Code',
    description: 'Plateforme dédiée aux défis Capture The Flag (CTF) en cybersécurité.',
    longDescription: 'Break The Code est une plateforme interactive pour les défis Capture The Flag (CTF) en cybersécurité, développée dans le cadre d\'un projet associatif à l\'IUT.',
    tags: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'Docker', 'Scrum', 'MySQL', 'SSH'],
    images: ['affichage_challenge.png', 'breakthecode1.png', 'challenge.png', 'ssh.png', 'rainbow_jumper.gif', 'cristal_malicieux.gif'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Éducation',
    features: [
      'Défis exploitant des vulnérabilités SSH',
      'Jeu "Rainbow Jumper" pour obtenir le flag',
      'Déploiement conteneurisé avec Docker'
    ],
    links: { demo: '#', github: '#' },
    folder: 'CTF',
    startDate: 'September 2024',
    endDate: 'Janvier 2025',
    isOngoing: false,
    newTech: ['Docker', 'Scrum', 'SSH', 'Flask'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 2',
        items: [
          'AC21.01 | Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences',
          'AC21.04 | Vérifier et valider la qualité de l’application par les tests'
        ]
      },
      {
        category: 'Administrer',
        level: 'Niveau 2',
        items: [
          'AC23.01 | Concevoir et développer des applications communicantes',
          'AC23.02 | Utiliser des serveurs et des services réseaux virtualisés (Docker)',
          'AC23.03 | Sécuriser les services et données d’un système (SSH)'
        ]
      },
      {
        category: 'Conduire',
        level: 'Niveau 2',
        items: [
          'AC25.04 | Définir et mettre en œuvre une démarche de suivi de projet (Scrum/Agile)'
        ]
      },
      {
        category: 'Collaborer',
        level: 'Niveau 2',
        items: [
          'AC26.03 | Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique',
          'AC26.04 | Rendre compte de son activité professionnelle'
        ]
      }
    ],
    subProjects: [
      {
        id: 'sub-1',
        name: 'Défi SSH',
        description: 'Défi basé sur des vulnérabilités SSH.',
        images: ['ssh.png'],
        features: ['Exploitation de failles SSH', 'Obtention de flag']
      },
      {
        id: 'sub-2',
        name: 'Rainbow Jumper',
        description: 'Jeu pour obtenir le flag.',
        images: ['rainbow_jumper.gif'],
        features: ['Mécanique de saut', 'Récompense par flag']
      }
    ]
  },
  {
    id: 'project-3',
    name: 'Capital Wars',
    description: 'Application Web de jeu vidéo de simulation d\'entreprise.',
    longDescription: 'Application Web de jeu vidéo qui permet aux utilisateurs de s\'affronter dans la simulation d\'entreprise. Les joueurs gèrent des ressources, prennent des décisions stratégiques et rivalisent pour dominer le marché virtuel. Le projet met en œuvre des mécaniques de jeu interactives et un système de niveaux progressifs pour offrir une expérience engageante.',
    tags: ['Symfony', 'Twig', 'CSS3', 'HTML5', 'JavaScript', 'MySQL'],
    images: ['capital-wars.png', 'capital-wars2.png','capital-wars3.png'],
    logo: 'logo.png',
    category: 'Jeux Vidéo',
    purpose: 'Éducation',
    features: [
      'Mécaniques de jeu interactives',
      'Système de niveaux progressifs',
      'Compétition entre joueurs',
      'Gestion des ressources en temps réel',
      'Redaction de Bilan, Compte de résultat'
    ],
    links: { demo: 'https://dev.capitalwars.rlbrt.fr/accueil', github: '#' },
    folder: 'CapitalWars',
    startDate: 'Septembre 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['Symfony', 'Twig'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 2',
        items: [
          'AC21.03 | Adopter de bonnes pratiques de conception et de programmation (MVC Symfony)',
          'AC21.02 | Appliquer des principes d’accessibilité et d’ergonomie'
        ]
      },
      {
        category: 'Gérer',
        level: 'Niveau 2',
        items: [
          'AC24.01 | Optimiser les modèles de données de l’entreprise'
        ]
      },
      {
        category: 'Collaborer',
        level: 'Niveau 2',
        items: [
          'AC26.01 | Comprendre la diversité, la structure et la dimension de l’informatique dans une organisation'
        ]
      }
    ]
  },
  {
    id: 'project-4',
    name: 'Star Guardian',
    description: 'Outils d\'analyse de données statistiques d\'alerte collision satellites.',
    longDescription: 'Star Guardian est un logiciel conçu pour effectuer des analyses statistiques avancées sur les alertes de collision impliquant des satellites en orbite.',
    tags: ['Python', 'Pandas', 'Excel'],
    images: ['main.png', 'starguardian_complet.png', 'execl_star_guardian.png'],
    logo: 'logo.png',
    category: 'Logiciel',
    purpose: 'Éducation',
    features: [
      'Interface intuitive de visualisation des données',
      'Analyses statistiques de probabilités de collision'
    ],
    links: { demo: '#', github: '#' },
    folder: 'starGuardian',
    startDate: 'Janvier 2025',
    endDate: 'Avril 2025',
    isOngoing: false,
    newTech: ['Pandas'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 1',
        items: [
          'AC11.01 | Implémenter des conceptions simples',
          'AC11.04 | Développer des interfaces utilisateurs'
        ]
      },
      {
        category: 'Optimiser',
        level: 'Niveau 2',
        items: [
          'AC22.01 | Choisir des structures de données complexes adaptées au problème (Dataframes Pandas)'
        ]
      },
      {
        category: 'Gérer',
        level: 'Niveau 2',
        items: [
          'AC24.04 | Manipuler des données hétérogènes (Excel, CSV, API)'
        ]
      },
      {
        category: 'Conduire',
        level: 'Niveau 1',
        items: [
          'AC15.01 | Appréhender les besoins du client et de l\'utilisateur'
        ]
      }
    ]
  },
  {
    id: 'project-5',
    name: 'Trains',
    description: 'Adaptation du jeu de société Trains en jeu vidéo Java.',
    longDescription: 'Projet consistant à recréer le jeu de société japonais Trains en Java, avec une interface graphique JavaFX et une approche TDD.',
    tags: ['Java', 'JavaFX', 'JUnit'],
    images: ['Trains_IHM.png', 'jeux_en_cours (1).gif', 'test_train.png', 'page_accueil.gif'],
    logo: 'logo.png',
    category: 'Jeux Vidéo',
    purpose: 'Éducation',
    features: [
      'Interface graphique développée avec JavaFX',
      'Développement piloté par les tests (TDD) avec JUnit'
    ],
    links: { demo: '#', github: '#' },
    folder: 'trains',
    startDate: 'Mars 2024',
    endDate: 'Juin 2024',
    isOngoing: false,
    newTech: ['JavaFX', 'JUnit'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 1',
        items: [
          'AC11.03 | Faire des essais et évaluer leurs résultats en regard des spécifications (TDD/JUnit)',
          'AC11.04 | Développer des interfaces utilisateurs (JavaFX)'
        ]
      },
      {
        category: 'Optimiser',
        level: 'Niveau 1',
        items: [
          'AC12.01 | Analyser un problème avec méthode (découpage en éléments algorithmiques simples)',
          'AC12.02 | Comparer des algorithmes pour des problèmes classiques (Dijkstra)'
        ]
      },
      {
        category: 'Optimiser',
        level: 'Niveau 2',
        items: [
          'AC22.01 | Choisir des structures de données complexes adaptées au problème (Graphes)'
        ]
      }
    ]
  },
  {
    id: 'project-6',
    name: 'Img Classifier',
    description: 'Logiciel basé sur une IA pour trier des images.',
    longDescription: 'Création d\'une IA capable de classer les images par catégorie. Utilisation de PyTorch et des réseaux de convolution.',
    tags: ['Python', 'Tkinter', 'Pytorch'],
    images: ['res_lumine.png', 'cnn.png','convolution.gif', 'entrainement.png'],
    logo: 'logo.png',
    category: 'IA',
    purpose: 'Personnel',
    features: [
      'Détection avec précision de 98%',
      'Réseaux de convolution (CNN)',
      'Tableau de bord de progression'
    ],
    links: { demo: '#', github: '#' },
    folder: 'IA_Kiana',
    startDate: 'Juin 2023',
    endDate: 'Juin 2024',
    isOngoing: false,
    newTech: ['Pytorch'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 2',
        items: [
          'AC21.03 | Adopter de bonnes pratiques de conception et de programmation'
        ]
      },
      {
        category: 'Optimiser',
        level: 'Niveau 2',
        items: [
          'AC22.02 | Utiliser des techniques algorithmiques adaptées pour des problèmes complexes (Intelligence Artificielle)'
        ]
      }
    ]
  },
  {
    id: 'project-7',
    name: 'Victoria',
    description: 'Assistant de bureau modulaire avec IA locale.',
    longDescription: 'Victoria est une application de bureau utilisant une intelligence artificielle locale (Ollama), extensible via des plugins.',
    tags: ['Python', 'CustomTkinter', 'Watchdog', 'ChromaDb', 'Ollama'],
    images: ['main.png', 'rss.png','issue_maker.png', 'logo.png'],
    logo: 'logo.png',
    logo_recadrer: 'logo_recadrer.png',
    category: 'IA',
    purpose: 'Personnel',
    features: [
      'Interface CustomTkinter moderne',
      'Système de plugins',
      'Intégration RAG (ChromaDb)'
    ],
    links: { demo: '#', github: 'https://github.com/Yota02/Victoria_v3' },
    folder: 'Victoria',
    startDate: 'Mai 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['CustomTkinter', 'Watchdog'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 3',
        items: [
          'AC31.02 | Faire évoluer une application existante (Système de Plugins)',
          'AC31.01 | Choisir et implémenter les architectures adaptées (Modulaire)'
        ]
      },
      {
        category: 'Optimiser',
        level: 'Niveau 2',
        items: [
          'AC22.02 | Utiliser des techniques algorithmiques adaptées pour des problèmes complexes (IA, RAG)'
        ]
      },
      {
        category: 'Administrer',
        level: 'Niveau 1',
        items: [
          'AC13.01 | Identifier les différents composants (matériels et logiciels) d’un système numérique'
        ]
      }
    ],
    subProjects: [
      {
        id: 'sub-victoria-1',
        name: 'Plugin RSS',
        description: 'Plugin pour lire les flux RSS.',
        images: ['rss.png'],
        features: ['Lecture automatique', 'Filtrage des articles']
      },
      {
        id: 'sub-victoria-2',
        name: 'Issue Maker',
        description: 'Plugin pour créer des issues GitHub.',
        images: ['issue_maker.png'],
        features: ['Intégration GitHub', 'Génération automatique']
      }
    ]
  },
  {
    id: 'project-8',
    name: 'World of chan',
    description: 'Application d\'apprentissage de langues par la gamification.',
    longDescription: 'Application web pour apprendre 10 mots par jour via des quiz et des fiches de révision.',
    tags: ['Symfony', 'Twig', 'Firebase', 'MySQL', 'CSS3', 'HTML5', 'JavaScript'],
    images: ['main.png', 'shiru.png','main_langue.png', 'shiruchan-liste.png', 'shiruchan-quiz.png'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Apprentissage quotidien gamifié',
      'Système de rappel intelligent',
      'Support de 10 langues'
    ],
    links: { demo: 'https://yota02.github.io/WorldOfChan/', github: '#' },
    folder: 'WorldOfChan',
    startDate: 'Septembre 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['Firebase'],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 3',
        items: [
          'AC31.01 | Choisir et implémenter les architectures adaptées (Mobile/PWA)'
        ]
      },
      {
        category: 'Administrer',
        level: 'Niveau 2',
        items: [
          'AC23.01 | Concevoir et développer des applications communicantes (Firebase)'
        ]
      },
      {
        category: 'Gérer',
        level: 'Niveau 1',
        items: [
          'AC14.01 | Mettre à jour et interroger une base de données relationnelle (MySQL)'
        ]
      }
    ],
    subProjects: [
        // { id: 'sub-worldofchan-english', name: 'Anglais', description: 'Apprentissage de l\'anglais', images: [], features: [] },
        // { id: 'sub-worldofchan-spanish', name: 'Espagnol', description: 'Apprentissage de l\'espagnol', images: [], features: [] },
    ]
  },
  {
    id: 'project-10',
    name: 'Anakomi',
    description: 'Site communautaire de notation de jeux vidéo, anime et manga.',
    longDescription: '',
    tags: ['Flask', 'MySQL', 'CSS3', 'HTML5', 'JavaScript'],
    images: ['main_anime.png', 'main_jv.png','top_anime.png'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Notation et commentaires',
      'Classements communautaires'
    ],
    links: { demo: 'https://anakomi.onrender.com/', github: '#' },
    folder: 'Anakomi',
    startDate: 'Septembre 2025',
    endDate: 'Septembre 2025',
    isOngoing: false,
    newTech: [],
    competencies: [
      {
        category: 'Réaliser',
        level: 'Niveau 1',
        items: [
          'AC11.01 | Implémenter des conceptions simples',
          'AC11.04 | Développer des interfaces utilisateurs'
        ]
      },
      {
        category: 'Gérer',
        level: 'Niveau 1',
        items: [
          'AC14.03 | Concevoir une base de données relationnelle à partir d’un cahier des charges'
        ]
      }
    ]
  },
  {
    id: 'project-11',
    name: "Nuit de l'Info 2025",
    description: "Défi national de développement web en équipe sur une nuit entière.",
    longDescription: "Projet réalisé dans le cadre de la Nuit de l'Info. Le défi consistait à collaborer en équipe pour développer une application web fonctionnelle du coucher au lever du soleil. Ce projet a nécessité une gestion stricte du temps, une répartition efficace des tâches et une adaptation rapide aux contraintes du thème imposé.",
    tags: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    images: ['main.png', 'BD_presentation.png', 'BD.png', 'texte.png', 'tux_animation.webm'], // Pensez à mettre vos propres noms d'images
    logo: 'tux.png',
    category: 'Dev Web',
    purpose: 'Éducation',
    features: [
      'Développement intensif en temps limité (Hackathon)',
      'Travail collaboratif et répartition des tâches',
      'Respect d\'un thème et de contraintes techniques'
    ],
    links: { demo: 'https://yota02.github.io/Ndi-2026/#/', github: 'https://github.com/Yota02/Ndi-2026' },
    folder: 'Ndi2025',
    startDate: 'Décembre 2025',
    endDate: 'Décembre 2025',
    isOngoing: false,
    newTech: [],
    competencies: [
      {
        category: 'Collaborer',
        level: 'Niveau 2',
        items: [
          'AC26.03 | Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique',
          'AC26.01 | Comprendre la diversité et la dynamique d’une équipe informatique'
        ]
      },
      {
        category: 'Conduire',
        level: 'Niveau 2',
        items: [
          'AC25.01 | Organiser le travail d\'une équipe (Répartition des tâches)',
          'AC25.03 | Identifier les critères de faisabilité (Gestion du temps court)'
        ]
      },
      {
        category: 'Réaliser',
        level: 'Niveau 2',
        items: [
          'AC21.03 | Adopter de bonnes pratiques de conception et de programmation (Code collaboratif)'
        ]
      }
    ]
  },
]

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getProjectsByCategory = (): Record<ProjectCategory, Project[]> => {
  return projects.reduce((groups, project) => {
    const category = project.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(project)
    return groups
  }, {} as Record<ProjectCategory, Project[]>)
}
