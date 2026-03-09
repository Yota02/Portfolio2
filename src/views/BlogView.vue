<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { blogPosts, type BlogPost } from '@/data/blog'

const { locale, t } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ['All', ...new Set(blogPosts.map(post => post.category))]

const filteredPosts = computed(() => {
  return blogPosts.filter(post => {
    const title = post.title[locale.value as 'fr' | 'en']
    const matchesSearch = title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="blog-page">
    <div class="container">
      <header class="blog-header">
        <h1 class="page-title">{{ t('nav.blog') }}</h1>
        <p class="page-subtitle">Mes réflexions sur le code et les sciences.</p>
        
        <div class="filters">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Rechercher un article..." 
            class="search-input"
          />
          <div class="category-filters">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="selectedCategory = cat"
              :class="{ active: selectedCategory === cat }"
              class="category-btn"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </header>

      <div class="blog-grid">
        <article v-for="post in filteredPosts" :key="post.id" class="post-card">
          <div class="post-image" v-if="post.image">
            <img :src="post.image" :alt="post.title[locale as 'fr' | 'en']" />
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="post-category">{{ post.category }}</span>
              <span class="post-date">{{ formatDate(post.date) }}</span>
            </div>
            <h2 class="post-title">{{ post.title[locale as 'fr' | 'en'] }}</h2>
            <p class="post-excerpt">{{ post.excerpt[locale as 'fr' | 'en'] }}</p>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
            <button class="read-more">Lire la suite →</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  padding: 4rem 1rem;
  min-height: 100vh;
  background: var(--color-background);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--color-text);
  opacity: 0.7;
  font-size: 1.2rem;
}

.filters {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  font-size: 1rem;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover, .category-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: var(--color-background-soft);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.post-image {
  height: 200px;
  background: var(--color-background-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.post-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  opacity: 0.6;
}

.post-category {
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.post-excerpt {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.8rem;
  color: var(--accent);
}

.read-more {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
}

.read-more:hover {
  transform: translateX(5px);
}
</style>
