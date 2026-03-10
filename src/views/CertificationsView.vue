<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL;

interface Certification {
  id: string;
  date: string;
  link?: string;
  logo: string;
}

const certifications: Certification[] = [
  {
    id: "cert-1",
    date: "2021",
    link: "https://eduscol.education.fr/sti/aeronautique/bia",
    logo: "bia.gif",
  },
  {
    id: "cert-2",
    date: "2026",
    link: "https://datafromspace.fr/",
    logo: "datafromspace.png",
  },
  {
    id: "cert-3",
    date: "2026",
    link: "https://www.fun-mooc.fr/fr/cours/mooc-espace/",
    logo: "funmooc.svg",
  },
  {
    id: "cert-4",
    date: "2026",
    link: "https://lms.fun-mooc.fr/courses/course-v1%3Apasteur%2B96025%2Bsession02/",
    logo: "funmooc.svg",
  },
  {
    id: "cert-5",
    date: "2026",
    link: "https://lms.fun-mooc.fr/courses/course-v1:pasteur+96012+session04/info",
    logo: "funmooc.svg",
  },
  {
    id: "cert-6",
    date: "2026",
    link: "https://lms.fun-mooc.fr/courses/course-v1:pasteur+96020+session03/info",
    logo: "funmooc.svg",
  },
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
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="cert-image-container" v-if="cert.logo">
            <img :src="`${baseUrl}icone/${cert.logo}`" :alt="t('certifications.items.' + cert.id + '.title')" class="cert-image" />
          </div>
          <div class="cert-content">
            <div class="cert-header">
              <span class="cert-date">{{ cert.date }}</span>
            </div>
            <h3 class="cert-title">{{ t('certifications.items.' + cert.id + '.title') }}</h3>
            <p class="cert-institution">{{ t('certifications.items.' + cert.id + '.institution') }}</p>
            <p class="cert-description">{{ t('certifications.items.' + cert.id + '.description') }}</p>
            <a v-if="cert.link" :href="cert.link" target="_blank" class="cert-link">
              {{ t('certifications.view_cert') }}
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
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
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
