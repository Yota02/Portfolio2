<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppPageHeader from '@/components/AppPageHeader.vue'
import AppSection from '@/components/AppSection.vue'
import AppCard from '@/components/AppCard.vue'
import AppBackgroundDecor from '@/components/AppBackgroundDecor.vue'
import { Eye, GraduationCap, Globe, Plus, Fingerprint, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL;

const hobbies = [
  { icon: '🌍', key: 'geopolitics', tagline: '', color: '#2563eb' },
  { icon: '🧪', key: 'sciences', tagline: '', color: '#10b981' },
  { icon: '🚀', key: 'scifi', tagline: '', color: '#8b5cf6' },
  { icon: '👥', key: 'sociology', tagline: '', color: '#f59e0b' },
  { icon: '🎥', key: 'cinema', tagline: '', color: '#ef4444' }
]
</script>

<template>
  <div class="page-wrapper">
    <AppBackgroundDecor />

    <main class="main-card">
      <div class="content-padding">
        <AppPageHeader 
          :title="t('about.title')"
          :subtitle="t('about.subtitle')"
          centered
        />

        <div class="bento-grid">
          <div class="col-left">
            <AppSection :title="t('about.vision.title')" :icon="Eye" reveal="up">
              <div class="text-body space-y-4">
                <p v-html="t('about.vision.p1')"></p>
                <p v-html="t('about.vision.p2')"></p>
              </div>
            </AppSection>

            <AppSection :title="t('about.parcours.title')" :icon="GraduationCap" reveal="up">
              <div class="text-body space-y-4">
                <p v-html="t('about.parcours.p1')"></p>
                <p v-html="t('about.parcours.p2')"></p>
                <p v-html="t('about.parcours.p3')"></p>
              </div>
            </AppSection>

            <AppCard variant="glass" class="card-international" reveal="up">
              <div class="flex items-center gap-3 mb-4">
                <Globe class="text-blue-200" :size="24" />
                <h3 class="card-title text-white">{{ t('about.international.title') }}</h3>
              </div>
              <p class="text-blue-100 mb-6 font-light" v-html="t('about.international.description')"></p>
              <div class="tags-row">
                <span class="lang-badge">
                  <img :src="`${baseUrl}drapeau/en.svg`" alt="Anglais" class="badge-flag" /> {{ t('nav.languages_list.en') || 'English' }}
                </span>
                <span class="lang-badge">
                  <img :src="`${baseUrl}drapeau/de.svg`" alt="Allemand" class="badge-flag" /> {{ t('nav.languages_list.de') || 'Deutsch' }}
                </span>
                <span class="lang-badge">
                  <img :src="`${baseUrl}drapeau/jp.svg`" alt="Japonais" class="badge-flag" /> {{ t('nav.languages_list.jp') || '日本語' }}
                </span>
                <span class="lang-badge">
                  <img :src="`${baseUrl}drapeau/zh.svg`" alt="Mandarin" class="badge-flag" /> {{ t('nav.languages_list.zh') || '中文' }}
                </span>
                <span class="lang-badge dashed">
                  <Plus :size="14" class="mr-2" />{{ t('about.international.next') }}
                </span>
              </div>
            </AppCard>

             <div class="quote-container reveal-up">
              <blockquote class="quote-text">
                "{{ t('about.quote') }}"
              </blockquote>
            </div>
          </div>

          <div class="col-right">
            <AppSection :title="t('about.hobbies.title')" :icon="Fingerprint" reveal="up">
              <div class="hobbies-list">
                <div
                  v-for="(hobby, index) in hobbies"
                  :key="index"
                  class="hobby-card group"
                  :style="{ '--accent-color': hobby.color }"
                >
                  <div class="flex items-center gap-4">
                    <span class="hobby-icon">
                      {{ hobby.icon }}
                    </span>
                    <div>
                      <h3 class="hobby-label">
                        {{ t('about.hobbies.' + hobby.key) }}
                      </h3>
                      <p class="hobby-tagline">
                        {{ hobby.tagline }}
                      </p>
                    </div>
                  </div>
                  <div class="arrow-icon">
                    <ArrowRight :size="18" />
                  </div>
                </div>
              </div>
            </AppSection>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--color-text);
  position: relative;
  overflow-x: hidden;
}

.main-card {
  width: 100%;
  max-width: 1100px;
  z-index: 10;
}

.content-padding {
  padding: 2rem;
}

@media (min-width: 768px) {
  .content-padding { padding: 4rem; }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #475569;
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 3rem;
  }
  .col-left { grid-column: span 8; }
  .col-right { grid-column: span 4; }
}

.space-y-4 > * + * { margin-top: 1rem; }

.text-body { color: var(--color-text); font-size: 1.125rem; line-height: 1.75; }

.card-international {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  margin-top: 2.5rem;
}

.card-international:hover {
  transform: scale(1.02);
}

.card-title { font-size: 1.25rem; font-weight: 700; margin: 0; }
.text-blue-100 { color: #dbeafe; }
.text-blue-200 { color: #bfdbfe; }
.text-white { color: #fff; }

.tags-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.lang-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: default;
}

.badge-flag {
  width: 1.25rem;
  height: 0.875rem;
  object-fit: cover;
  border-radius: 2px;
}

.lang-badge.dashed {
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  color: #bfdbfe;
  cursor: pointer;
}
.lang-badge.dashed:hover { background: rgba(255, 255, 255, 0.1); color: white; }

.quote-container {
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 4rem;
}

.quote-text {
  font-size: 1.25rem;
  font-family: serif;
  font-style: italic;
  color: var(--color-text);
  margin: 0;
  line-height: 1.6;
}

.hobbies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hobby-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hobby-card:hover {
  border-color: var(--accent-color);
  background: var(--color-background-soft);
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.hobby-icon {
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  background: var(--color-background-soft);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.group:hover .hobby-icon { transform: scale(1.1); }

.hobby-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  transition: color 0.3s;
}

.group:hover .hobby-label { color: var(--accent-color); }

.hobby-tagline {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin: 0;
}

.arrow-icon {
  color: var(--accent-color);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.group:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

.flex { display: flex; }
.items-center { align-items: center; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.mr-2 { margin-right: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
</style>

