export interface BlogPost {
  id: string
  title: string // i18n key
  excerpt: string // i18n key
  date: string
  category: string
  tags: string[]
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'blog.posts.post-1.title',
    excerpt: 'blog.posts.post-1.excerpt',
    date: '2026-03-01',
    category: 'IA',
    tags: ['Education', 'LLM'],
    image: '/icone/deeplearning.webp'
  },
  {
    id: 'post-2',
    title: 'blog.posts.post-2.title',
    excerpt: 'blog.posts.post-2.excerpt',
    date: '2026-02-15',
    category: 'Web',
    tags: ['Architecture', 'Frontend'],
    image: '/icone/vuejs.webp'
  }
]
