<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL;

interface Certification {
  id: string;
  titleKey: string;
  descriptionKey: string;
  institutionKey: string;
  date: string;
  icon: string;
  color: string;
  link?: string;
  image?: string;
}

const certifications: Certification[] = [
  {
    id: 'cert-1',
    titleKey: 'cert-1.title',
    descriptionKey: 'cert-1.description',
    institutionKey: 'cert-1.institution',
    date: '2022',
    icon: '🚀',
    color: '#3b82f6',
    image: 'bia.gif'
  },
  {
    id: 'cert-2',
    titleKey: 'cert-2.title',
    descriptionKey: 'cert-2.description',
    institutionKey: 'cert-2.institution',
    date: '2023',
    icon: '🎓',
    color: '#10b981',
    image: 'jeanJaurès.jpeg'
  },
  {
    id: 'cert-3',
    titleKey: 'cert-3.title',
    descriptionKey: 'cert-3.description',
    institutionKey: 'cert-3.institution',
    date: '2023 - 2026',
    icon: '💻',
    color: '#8b5cf6',
    image: 'IUT-Montpellier.png'
  }
]
</script>

<template>
  <div class="certifications-page">
    <div class="container">
      <header class="header reveal-up">
        <h1 class="page-title">{{ t('certifications.title') }}</h1>
        <p class="page-subtitle">{{ t('certifications.subtitle') }}</p>
      </header>

      <div class="certifications-grid">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          class="cert-card reveal"
          :style="{ '--cert-color': cert.color, '--delay': index * 0.1 + 's' }"
        >
          <div class="cert-image-container" v-if="cert.image">
            <img :src="`${baseUrl}icone/${cert.image}`" :alt="t('certifications.items.' + cert.titleKey)" class="cert-image" />
          </div>
          <div class="cert-content">
            <div class="cert-header">
              <span class="cert-icon">{{ cert.icon }}</span>
              <span class="cert-date">{{ cert.date }}</span>
            </div>
            <h3 class="cert-title">{{ t('certifications.items.' + cert.titleKey) }}</h3>
            <p class="cert-institution">{{ t('certifications.items.' + cert.institutionKey) }}</p>
            <p class="cert-description">{{ t('certifications.items.' + cert.descriptionKey) }}</p>
            <a v-if="cert.link" :href="cert.link" target="_blank" class="cert-link">
              Voir le certificat
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 8"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certifications-page {
  min-height: 80vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, transparent 0%, var(--color-background-mute) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.cert-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  animation-delay: var(--delay);
}

.cert-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
  border-color: var(--cert-color);
}

.cert-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--color-background-soft);
}

.cert-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.5s ease;
}

.cert-card:hover .cert-image {
  transform: scale(1.05);
}

.cert-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cert-icon {
  font-size: 1.5rem;
}

.cert-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.6;
  background: var(--color-background-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.cert-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.cert-institution {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
}

.cert-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: auto;
}

.cert-link:hover {
  color: var(--accent);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  .certifications-grid {
    grid-template-columns: 1fr;
  }
}
</style>
