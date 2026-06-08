<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePageMeta } from '@/composables/usePageMeta'
import AppPageHeader from '@/components/AppPageHeader.vue'
import AppCard from '@/components/AppCard.vue'
import AppButton from '@/components/AppButton.vue'
import { ExternalLink } from 'lucide-vue-next'

const { t } = useI18n()
usePageMeta('certifications.title', 'certifications.subtitle')
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
    logo: "datafromspace.webp",
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
      <AppPageHeader 
        :title="t('certifications.title')"
        :subtitle="t('certifications.subtitle')"
        centered
      />

      <div class="certifications-grid">
        <AppCard
          v-for="(cert, index) in certifications"
          :key="cert.id"
          hoverable
          reveal="up"
          :style="{ transitionDelay: index * 0.1 + 's' }"
          class="cert-card"
        >
          <div class="cert-image-container" v-if="cert.logo">
            <img :src="`${baseUrl}icone/${cert.logo}`" :alt="t('certifications.items.' + cert.id + '.title')" class="cert-image" />
          </div>
          
          <div class="cert-header">
            <span class="cert-date">{{ cert.date }}</span>
          </div>
          <h3 class="cert-title">{{ t('certifications.items.' + cert.id + '.title') }}</h3>
          <p class="cert-institution">{{ t('certifications.items.' + cert.id + '.institution') }}</p>
          <p class="cert-description">{{ t('certifications.items.' + cert.id + '.description') }}</p>
          
          <template #footer>
            <AppButton 
              v-if="cert.link" 
              :href="cert.link" 
              variant="text" 
              :icon="ExternalLink" 
              iconRight
            >
              {{ t('certifications.view_cert') }}
            </AppButton>
          </template>
        </AppCard>
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

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.cert-card :deep(.card-body) {
  padding: 0;
  display: flex;
  flex-direction: column;
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

.cert-header {
  padding: 1.5rem 1.5rem 0.5rem;
  display: flex;
  justify-content: flex-end;
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
  padding: 0 1.5rem 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading);
}

.cert-institution {
  padding: 0 1.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.cert-description {
  padding: 0 1.5rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .certifications-grid {
    grid-template-columns: 1fr;
  }
}
</style>

