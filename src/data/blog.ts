export interface BlogPost {
  id: string
  title: {
    fr: string
    en: string
  }
  excerpt: {
    fr: string
    en: string
  }
  date: string
  category: string
  tags: string[]
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: {
      fr: 'Exploration de la Bioinformatique',
      en: 'Exploring Bioinformatics'
    },
    excerpt: {
      fr: 'Comment l\'informatique révolutionne notre compréhension du génome humain.',
      en: 'How computer science is revolutionizing our understanding of the human genome.'
    },
    date: '2026-03-01',
    category: 'Bioinfo',
    tags: ['Génomique', 'Algorithmique'],
    image: '/icone/deeplearning.png'
  },
  {
    id: 'post-2',
    title: {
      fr: 'Les enjeux de l\'IA en 2026',
      en: 'AI Challenges in 2026'
    },
    excerpt: {
      fr: 'Analyse des tendances actuelles et futures de l\'intelligence artificielle.',
      en: 'Analysis of current and future trends in artificial intelligence.'
    },
    date: '2026-02-15',
    category: 'IA',
    tags: ['Machine Learning', 'Ethique'],
    image: '/icone/ollama.png'
  }
]
