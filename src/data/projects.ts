export type ProjectCategory = 'IA' | 'Dev Web' | 'Logiciel' | 'Jeux Vidéo'
export type ProjectPurpose = 'Éducation' | 'Personnel'

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  images: string[]  // Maintenant, contient seulement les noms de fichiers ou URLs externes
  logo: string  // Maintenant, nom de fichier ou URL externe
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
  'Ssh': 'ssh',
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
    tags: ['JavaScript', 'Flask', 'Python', 'MySQL'],
    images: ['main.png', 'chatbot.png', 'Exercice1.png', 'progression.png'],  // Gardé tel quel pour les URLs externes
    logo: 'victoria_v.png',  // Gardé tel quel pour les URLs externes
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
    startDate: '2023-01-01',
    endDate: '2023-06-01',
    isOngoing: false
  },
  {
    id: 'project-2',
    name: 'Break The Code',
    description: 'Plateforme dédiée aux défis Capture The Flag. Lors de ma deuxième année à l\'IUT informatique, j\'ai travaillé pour l\'association Yggame sur un événement CTF en cybersécurité.',
    longDescription: 'Break The Code est une plateforme interactive pour les défis Capture The Flag (CTF) en cybersécurité, développée dans le cadre d\'un projet associatif à l\'IUT. Elle permet aux participants de tester leurs compétences en sécurité informatique de manière ludique et pédagogique.',
    tags: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'Docker', 'Scrum', 'MySQL'],
    images: ['affichage_challenge.png', 'breakthecode1.png', 'challenge.png', 'ssh.png', 'rainbow_jumper.gif', 'cristal_malicieux.gif'],  // Changé pour ne contenir que le nom du fichier
    logo: 'StormFlash.png', 
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
    isOngoing: false
  },
  {
    id: 'project-3',
    name: 'Capital Wars',
    description: 'Application Web de jeu vidéo qui permet aux utilisateurs de s\'affronter dans la simulation d\'entreprise.',
    longDescription: 'Application Web de jeu vidéo qui permet aux utilisateurs de s\'affronter dans la simulation d\'entreprise.',
    tags: ['Symfony', 'Twig'],
    images: ['https://picsum.photo/seed/project3/600/400'],  // Gardé tel quel pour les URLs externes
    logo: 'https://picsum.photos/seed/project3-logo/200/200',  // Gardé tel quel pour les URLs externes
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
    folder: 'Capital_Wars',
    startDate: '2023-03-01',
    endDate: undefined,
    isOngoing: true
  },
  {
    id: 'project-4',
    name: 'Star Guardian',
    description: 'Outils d\'analyse de données Statistiques d\'alerte collision satellites',
    longDescription: 'Star Guardian est un logiciel conçu pour effectuer des analyses statistiques avancées sur les alertes de collision impliquant des satellites en orbite.',
    tags: ['Python', 'Pandas', 'Excel'],
    images: ['main.png', 'starguardian_complet.png', 'execl_star_guardian.png'],  // Gardé tel quel pour les URLs externes
    logo: 'icon.png',  // Gardé tel quel pour les URLs externes
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
    endDate: undefined,
    isOngoing: true
  }, 
  {
    id: 'project-5',
    name: 'Trains',
    description: 'Adaptation du jeu de société Trains en jeu vidéo',
    longDescription: 'Lors de ma première année, j\'ai dû développer une application en Java. Ce projet consistait à recréer le jeu de société japonais Trains en Java, en commençant par le back-end, puis en abordant dans un second temps l\'interface graphique avec JavaFX.',
    tags: ['Java', 'JavaFX', 'JUnit'],
    images: ['Trains_IHM.png', 'jeux_en_cours (1).gif', 'test_train.png', 'page_accueil.gif'],  // Gardé tel quel pour les URLs externes
    logo: 'trains.png',  // Gardé tel quel pour les URLs externes
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
    isOngoing: false
  }, 
  {
    id: 'project-6',
    name: 'Img Classifier',
    description: 'Un logiciel basé sur un model d\'Intéligence Artificielle pour trié des images',
    longDescription: 'L\'idée de ce projet personnel est née d\'une problématique liée au tri des images dans une bibliothèque. Le processus consistant à classer les images par catégorie tout en les renommant s\'avérait long et fastidieux. Je me suis alors dit : pourquoi ne pas créer une IA capable de réaliser cette tâche à ma place ? \n Cela m\'a conduit à explorer ce sujet, en me lançant dans la réalisation de ce projet. J\'ai ainsi découvert des outils comme PyTorch, les réseaux de convolution et le deep learning.',
    tags: ['Python', 'Tkinter', 'Pytorch'],
    images: ['res_lumine.png', 'cnn.png','convolution.gif', 'entrainement.png'],  // Gardé tel quel pour les URLs externes
    logo: 'kiana.png',  // Gardé tel quel pour les URLs externes
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
    startDate: '2023-02-01',
    endDate: undefined,
    isOngoing: true
  }, 
  {
    id: 'project-7',
    name: 'Victoria',
    description: 'Un logiciel basé sur un model d\'Intéligence Artificielle pour trié des images',
    longDescription: 'L\'idée de ce projet personnel est née d\'une problématique liée au tri des images dans une bibliothèque. Le processus consistant à classer les images par catégorie tout en les renommant s\'avérait long et fastidieux. Je me suis alors dit : pourquoi ne pas créer une IA capable de réaliser cette tâche à ma place ? \n Cela m\'a conduit à explorer ce sujet, en me lançant dans la réalisation de ce projet. J\'ai ainsi découvert des outils comme PyTorch, les réseaux de convolution et le deep learning.',
    tags: ['Python', 'CustomTkinter', 'Watchdog'],
    images: ['res_lumine.png', 'cnn.png','convolution.gif', 'entrainement.png'],  // Gardé tel quel pour les URLs externes
    logo: 'kiana.png',  // Gardé tel quel pour les URLs externes
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
    folder: 'Victoria',
    startDate: 'Novembre 2024',
    endDate: undefined,
    isOngoing: true
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
