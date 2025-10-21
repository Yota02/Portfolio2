export type ProjectCategory = 'IA' | 'Dev Web' | 'Logiciel' | 'Jeux Vidéo'
export type ProjectPurpose = 'Éducation' | 'Personnel'

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  category: ProjectCategory
  purpose: ProjectPurpose
  features: string[]
  links: {
    demo: string
    github: string
  }
}

// Mapping des noms de technologies vers les noms de fichiers d'icônes
export const techIconMap: Record<string, string> = {
  'Python': 'python',
  'Flask': 'flask',
  'JavaScript': 'javascript',
  'HTML5': 'html',
  'CSS3': 'css',
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
  'JavaFX': 'javafx',
  'Pandas': 'pandas',
  'NumPy': 'numpy',
  'PyGame': 'pygame',
  'Ssh': 'ssh',
  'WordPress': 'wordpress',
  'Linux': 'linux',
  'Symfony': 'symfony',
  'Bootstrap': 'bootstrap',
  'Reinforcement Learning': 'reinforcement_learning',
  'Jeux': 'jeux'
}

// Ordre d'affichage des catégories
export const categoryOrder: ProjectCategory[] = ['Dev Web', 'IA', 'Jeux Vidéo', 'Logiciel']

// LISTE DE TOUS LES PROJETS - AJOUTEZ VOS NOUVEAUX PROJETS ICI
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Mon Premier Projet',
    description: 'Application web moderne développée avec Vue.js et TypeScript',
    longDescription: 'Ce projet est une application web complète qui démontre l\'utilisation des technologies modernes comme Vue.js, TypeScript et Vite. L\'application offre une expérience utilisateur fluide et performante.',
    tags: ['Vue.js', 'TypeScript', 'Vite', 'CSS3'],
    image: 'https://picsum.photos/seed/project1/600/400',
    category: 'Dev Web',
    purpose: 'Personnel',
    features: [
      'Interface utilisateur responsive',
      'Performance optimisée',
      'Code TypeScript type-safe',
      'Architecture modulaire'
    ],
    links: {
      demo: '#',
      github: '#'
    }
  },
  {
    id: 'project-2',
    name: 'Break The Code',
    description: 'Plateforme dédiée aux défis Capture The Flag. Lors de ma deuxième année à l\'IUT informatique, j\'ai travaillé pour l\'association Yggame sur un événement CTF en cybersécurité.',
    longDescription: 'Break The Code est une plateforme interactive pour les défis Capture The Flag (CTF) en cybersécurité, développée dans le cadre d\'un projet associatif à l\'IUT. Elle permet aux participants de tester leurs compétences en sécurité informatique de manière ludique et pédagogique.',
    tags: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'Docker', 'Scrum', 'MySQL', 'MVC'],
    image: 'https://picsum.photos/seed/breakthecode/600/400',
    category: 'Dev Web',
    purpose: 'Éducation',
    features: [
      'Défis exploitant des vulnérabilités SSH',
      'IA Chatbot intégré pour assistance',
      'Jeu "Rainbow Jumper" pour obtenir le flag',
      'Interface web responsive',
      'Déploiement conteneurisé avec Docker'
    ],
    links: {
      demo: '#',
      github: '#'
    }
  },
  {
    id: 'project-3',
    name: 'Mon Troisième Projet',
    description: 'Jeu vidéo interactif créé avec Unity et C#',
    longDescription: 'Un jeu vidéo immersif développé avec Unity, mettant en avant des mécaniques de jeu innovantes et une expérience utilisateur engageante.',
    tags: ['Unity', 'C#', 'Jeux'],
    image: 'https://picsum.photos/seed/project3/600/400',
    category: 'Jeux Vidéo',
    purpose: 'Éducation',
    features: [
      'Mécaniques de jeu interactives',
      'Graphismes optimisés',
      'Système de niveaux progressifs',
      'Support multiplateforme'
    ],
    links: {
      demo: '#',
      github: '#'
    }
  },
  {
    id: 'project-4',
    name: 'Mon Quatrième Projet',
    description: 'Agent IA pour un jeu de stratégie',
    longDescription: 'Un agent d\'intelligence artificielle conçu pour un jeu de stratégie, utilisant des techniques d\'apprentissage par renforcement pour prendre des décisions optimales.',
    tags: ['Python', 'IA', 'Reinforcement Learning'],
    image: 'https://picsum.photos/seed/project4/600/400',
    category: 'IA',
    purpose: 'Éducation',
    features: [
      'Algorithmes d\'apprentissage par renforcement',
      'Prise de décision autonome',
      'Simulation de stratégies complexes',
      'Intégration avec environnement de jeu'
    ],
    links: {
      demo: '#',
      github: '#'
    }
  }
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
