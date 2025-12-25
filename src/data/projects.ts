export type ProjectCategory = 'IA' | 'Dev Web' | 'Logiciel' | 'Jeux Vidéo'
export type ProjectPurpose = 'Éducation' | 'Personnel'

export interface SubProject {
  id: string
  name: string
  description: string
  images: string[]
  features: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  images: string[]  // Maintenant, contient seulement les noms de fichiers ou URLs externes
  logo: string  // Maintenant, nom de fichier ou URL externe
  logo_recadrer?: string  // Nouveau champ optionnel pour une version recadrée du logo
  category: ProjectCategory
  purpose: ProjectPurpose
  features: string[]
  links: {
    demo: string
    github: string
  }
  folder: string  // Nouveau champ pour le dossier du projet
  startDate?: string
  endDate?: string
  isOngoing?: boolean
  newTech: string[]      // Nouvelles technologies apprises pendant/après le projet
  subProjects?: SubProject[]  // Nouveau champ pour les sous-projets
}

// Mapping des noms de technologies vers les noms de fichiers d'icônes
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

// Ordre d'affichage des catégories
export const categoryOrder: ProjectCategory[] = ['Dev Web', 'IA', 'Jeux Vidéo', 'Logiciel']

// LISTE DE TOUS LES PROJETS - AJOUTEZ VOS NOUVEAUX PROJETS ICI
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'CodeTonFutur',
    description: 'CodeTonFutur est un site de vulgarisation scientifique axé sur l\'informatique, montrant comment celle-ci peut s\'intégrer dans divers domaines scientifiques. Le site propose de nombreux défis interactifs couvrant une variété de thèmes scientifiques.',
    longDescription: 'Ce projet est une application web complète qui démontre l\'utilisation des technologies modernes comme Vue.js, TypeScript et Vite. L\'application offre une expérience utilisateur fluide et performante.',
    tags: ['Flask', 'Python', 'MySQL','JavaScript', 'HTML5', 'CSS3',],  // Gardé pour compatibilité, mais non utilisé dans l'affichage
    images: ['main.png', 'chatbot.png', 'Exercice1.png', 'progression.png'],  // Gardé tel quel pour les URLs externes
    logo: 'logo.png',  // Gardé tel quel pour les URLs externes
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Un chatbot intelligent basé sur GPT pour répondre aux questions des étudiants et les guider dans leur apprentissage.',
      'Des exercices pratiques avec correction automatique et feedback personnalisé pour progresser à son rythme.'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    folder: 'CodeTonFutur',
    startDate: 'Avril 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: [],  // Apprises pendant le projet
  },
  {
    id: 'project-2',
    name: 'Break The Code',
    description: 'Plateforme dédiée aux défis Capture The Flag. Lors de ma deuxième année à l\'IUT informatique, j\'ai travaillé pour l\'association Yggame sur un événement CTF en cybersécurité.',
    longDescription: 'Break The Code est une plateforme interactive pour les défis Capture The Flag (CTF) en cybersécurité, développée dans le cadre d\'un projet associatif à l\'IUT. Elle permet aux participants de tester leurs compétences en sécurité informatique de manière ludique et pédagogique.',
    tags: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'Docker', 'Scrum', 'MySQL', 'SSH'],
    images: ['affichage_challenge.png', 'breakthecode1.png', 'challenge.png', 'ssh.png', 'rainbow_jumper.gif', 'cristal_malicieux.gif'],  // Changé pour ne contenir que le nom du fichier
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Éducation',
    features: [
      'Défis exploitant des vulnérabilités SSH',

      'Jeu "Rainbow Jumper" pour obtenir le flag',
      'Interface web responsive',
      'Déploiement conteneurisé avec Docker'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    folder: 'CTF',
    startDate: 'September 2024',
    endDate: 'Janvier 2025',
    isOngoing: false,
    newTech: ['Docker', 'Scrum', 'SSH', 'Flask'],  // Nouvelles apprises
    subProjects: [
      {
        id: 'sub-1',
        name: 'Défi SSH',
        description: 'Défi basé sur des vulnérabilités SSH.',
        images: ['ssh.png'],
        features: ['Exploitation de failles SSH', 'Obtention de flag via connexion sécurisée']
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
    description: 'Application Web de jeu vidéo qui permet aux utilisateurs de s\'affronter dans la simulation d\'entreprise.',
    longDescription: 'Application Web de jeu vidéo qui permet aux utilisateurs de s\'affronter dans la simulation d\'entreprise.',
    tags: ['Symfony', 'Twig', 'CSS3', 'HTML5', 'JavaScript', 'MySQL'],
    images: ['https://picsum.photo/seed/project3/600/400'],  // Gardé tel quel pour les URLs externes
    logo: 'logo.png',  // Gardé tel quel pour les URLs externes
    category: 'Dev Web',
    purpose: 'Éducation',
    features: [
      'Mécaniques de jeu interactives',
      'Graphismes optimisés',
      'Système de niveaux progressifs',
      'Support multiplateforme'
    ],
    links: {
      demo: 'https://dev.capitalwars.rlbrt.fr/accueil',
      github: '#'
    },
    folder: 'CapitalWars',
    startDate: 'Septembre 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['Symfony', 'Twig'],  // Toutes apprises
  },
  {
    id: 'project-4',
    name: 'Star Guardian',
    description: 'Outils d\'analyse de données Statistiques d\'alerte collision satellites',
    longDescription: 'Star Guardian est un logiciel conçu pour effectuer des analyses statistiques avancées sur les alertes de collision impliquant des satellites en orbite.',
    tags: ['Python', 'Pandas', 'Excel'],
    images: ['main.png', 'starguardian_complet.png', 'execl_star_guardian.png'],  // Gardé tel quel pour les URLs externes
    logo: 'logo.png',  // Gardé tel quel pour les URLs externes
    category: 'Logiciel',
    purpose: 'Éducation',
    features: [
      'Une interface intuitive permettant de visualiser les données et les alertes de collision de manière claire et efficace.',
      'Ce fichier regroupe toutes les analyses statistiques, telles que les probabilités de collision et les distances qui les séparaient. ',
    ],
    links: {
      demo: '#',
      github: '#'
    },
    folder: 'starGuardian',
    startDate: 'Janvier 2025',
    endDate: 'Avril 2025',
    isOngoing: false,
    newTech: ['Pandas'],  // Nouvelles
  },
  {
    id: 'project-5',
    name: 'Trains',
    description: 'Adaptation du jeu de société Trains en jeu vidéo',
    longDescription: 'Lors de ma première année, j\'ai dû développer une application en Java. Ce projet consistait à recréer le jeu de société japonais Trains en Java, en commençant par le back-end, puis en abordant dans un second temps l\'interface graphique avec JavaFX.',
    tags: ['Java', 'JavaFX', 'JUnit'],
    images: ['Trains_IHM.png', 'jeux_en_cours (1).gif', 'test_train.png', 'page_accueil.gif'],  // Gardé tel quel pour les URLs externes
    logo: 'logo.png',  // Gardé tel quel pour les URLs externes
    category: 'Jeux Vidéo',
    purpose: 'Éducation',
    features: [
      'Interface graphique développée avec JavaFX, permettant une expérience utilisateur intuitive.',
      'Développement piloté par les tests (TDD) avec JUnit pour garantir la fiabilité du code. Mise en place d\'une couverture de tests complète validant la logique du jeu, les règles, le système de points et les conditions de victoire. Ces tests ont été reconnus par l\'équipe pédagogique et intégrés à leur suite de tests de référence pour noté le projet.',
    ],
    links: {
      demo: '#',
      github: '#'
    },
    folder: 'trains',
    startDate: 'Mars 2024',
    endDate: 'Juin 2024',
    isOngoing: false,
    newTech: ['JavaFX', 'JUnit'],  // Toutes apprises
  },
  {
    id: 'project-6',
    name: 'Img Classifier',
    description: 'Un logiciel basé sur un model d\'Intéligence Artificielle pour trié des images',
    longDescription: 'L\'idée de ce projet personnel est née d\'une problématique liée au tri des images dans une bibliothèque. Le processus consistant à classer les images par catégorie tout en les renommant s\'avérait long et fastidieux. Je me suis alors dit : pourquoi ne pas créer une IA capable de réaliser cette tâche à ma place ? \n Cela m\'a conduit à explorer ce sujet, en me lançant dans la réalisation de ce projet. J\'ai ainsi découvert des outils comme PyTorch, les réseaux de convolution et le deep learning.',
    tags: ['Python', 'Tkinter', 'Pytorch'],
    images: ['res_lumine.png', 'cnn.png','convolution.gif', 'entrainement.png'],
    logo: 'logo.png',
    category: 'IA',
    purpose: 'Personnel',
    features: [
      'L\'image a été détectée avec une précision de 98 % lors des tests.',
      'La convolution extrait des caractéristiques importantes des images en appliquant des filtres pour détecter des motifs comme les bords, les textures et les formes.',
      'Un tableau de bord permettant de visualiser sa progression et d\'identifier les points à améliorer.',
    ],
    links: {
      demo: '#',
      github: '#'
    },
    folder: 'IA_Kiana',
    startDate: 'Juin 2023',
    endDate: 'Juin 2024',
    isOngoing: false,
    newTech: ['Pytorch'],  // Nouvelles
  },
  {
    id: 'project-7',
    name: 'Victoria',
    description: 'Victoria est une application de bureau utilisant une intelligence artificielle locale.',
    longDescription: 'Elle a était conçue pour assister les utilisateurs dans diverses tâches quotidiennes grâce à une interface conviviale. Elle est complétement modulaire et personnalisable. Il est possible d\'ajouter des plugins pour étendre ses fonctionnalités de manière simple et efficace.',
    tags: ['Python', 'CustomTkinter', 'Watchdog', 'ChromaDb', 'Ollama'],
    images: ['main.png', 'rss.png','issue_maker.png', 'logo.png'],
    logo: 'logo.png',
    logo_recadrer: 'logo_recadrer.png',
    category: 'IA',
    purpose: 'Personnel',
    features: [
      'Interface utilisateur moderne et intuitive avec CustomTkinter.',
      'Système de plugins pour ajouter facilement de nouvelles fonctionnalités.',
      'Intégration de ChromaDb pour la gestion de la mémoire du model',
    ],
    links: {
      demo: '#',
      github: 'https://github.com/Yota02/Victoria_v3'
    },
    folder: 'Victoria',
    startDate: 'Mai 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['CustomTkinter', 'Watchdog'],  // Nouvelles
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
    description: '',
    longDescription: 'World of Chan est une application web conçue pour aider les utilisateurs à apprendre de nouvelles langues de manière ludique et efficace. En utilisant des quiz interactifs et des fiches de révision, l\'application vise à faciliter l\'apprentissage quotidien de 10 mots dans une langue étrangère choisie par l\'utilisateur.',
    tags: ['Symfony', 'Twig', 'Firebase', 'MySQL', 'CSS3', 'HTML5', 'JavaScript'],
    images: ['main.png', 'shiru.png','main_langue.png', 'shiruchan-liste.png', 'shiruchan-quiz.png'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Permet d\'apprendre 10 mots d\'une langue étrangère par jour à travers des quiz et des fiches de révision.',
      'Système de rappel intelligent pour renforcer la mémorisation des mots appris.',
      'Avec 10 langues proposées, les utilisateurs peuvent choisir celle qu\'ils souhaitent apprendre.',
    ],
    links: {
      demo: 'https://yota02.github.io/WorldOfChan/',
      github: '#'
    },
    folder: 'WorldOfChan',
    startDate: 'Septembre 2025',
    endDate: undefined,
    isOngoing: true,
    newTech: ['Firebase'],  // Nouvelle
    subProjects: [
      {
        id: 'sub-worldofchan-english',
        name: 'Anglais',
        description: 'Apprenez l\'anglais avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-spanish',
        name: 'Espagnol',
        description: 'Apprenez l\'espagnol avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-french',
        name: 'Français',
        description: 'Apprenez le français avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-german',
        name: 'Allemand',
        description: 'Apprenez l\'allemand avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-italian',
        name: 'Italien',
        description: 'Apprenez l\'italien avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-japanese',
        name: 'Japonais',
        description: 'Apprenez le japonais avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-chinese',
        name: 'Chinois',
        description: 'Apprenez le chinois avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-korean',
        name: 'Coréen',
        description: 'Apprenez le coréen avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-arabic',
        name: 'Arabe',
        description: 'Apprenez l\'arabe avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      },
      {
        id: 'sub-worldofchan-russian',
        name: 'Russe',
        description: 'Apprenez le russe avec des quiz quotidiens et des fiches de révision pour maîtriser 10 mots par jour.',
        images: [],
        features: ['Quiz interactifs', 'Fiches de révision', 'Rappels intelligents']
      }
    ]
  },
  {
    id: 'project-10',
    name: 'Anakomi',
    description: 'Ce site permet de noté des jeux vidéo, anime et manga afin de partagé son avis avec la communauté.',
    longDescription: '',
    tags: ['Flask', 'MySQL', 'CSS3', 'HTML5', 'JavaScript'],
    images: ['main_anime.png', 'main_jv.png','top_anime.png'],
    logo: 'logo.png',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Créer des animés / manga / jeux vidéo afin de les notés',
      'Noté les animés / manga / jeux vidéo des autres utilisateurs et ajouter un commentaires',
      'Voir les top animés / manga / jeux vidéo des autres utilisateurs de la communauté',
    ],
    links: {
      demo: 'https://anakomi.onrender.com/',
      github: '#'
    },
    folder: 'Anakomi',
    startDate: 'Septembre 2025',
    endDate: 'Septembre 2025',
    isOngoing: false,
    newTech: [],  // Aucune nouvelle
  },
]

// Fonction helper pour récupérer un projet par son ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

// Fonction helper pour grouper les projets par catégorie
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
