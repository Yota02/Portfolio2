<template>
  <div class="page-wrapper min-h-screen relative flex items-center justify-center p-6">

    <div class="background-elements">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="noise-overlay"></div>
    </div>

    <main class="main-card relative w-full max-w-5xl mx-auto overflow-hidden">

      <div class="content-padding">

        <header class="text-center mb-16">

          <h1 class="hero-title mb-8" v-html="t('about.title')"></h1>

          <p class="hero-subtitle" v-html="t('about.subtitle')"></p>
        </header>

        <div class="bento-grid">

          <div class="col-left space-y-10">

            <section class="vision-section">
              <h2 class="section-title">
                <i class="fas fa-eye icon-indigo"></i> {{ t('about.vision.title') }}
              </h2>
              <div class="text-body space-y-4">
                <p v-html="t('about.vision.p1')"></p>
                <p v-html="t('about.vision.p2')"></p>
              </div>
            </section>

            <section class="parcours-section">
              <h2 class="section-title">
                <i class="fas fa-graduation-cap icon-indigo"></i> {{ t('about.parcours.title') }}
              </h2>
              <div class="text-body space-y-4">
                <p v-html="t('about.parcours.p1')"></p>
                <p v-html="t('about.parcours.p2')"></p>
                <p v-html="t('about.parcours.p3')"></p>
              </div>
            </section>

            <div class="card-international group">
              <div class="deco-circle"></div>

              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-4">
                  <i class="fas fa-globe-americas text-blue-200 text-xl"></i>
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
                    <i class="fas fa-plus mr-2"></i>{{ t('about.international.next') }}
                  </span>
                </div>
              </div>
            </div>

             <div class="quote-container">
              <blockquote class="quote-text">
                "{{ t('about.quote') }}"
              </blockquote>
            </div>
          </div>

          <div class="col-right">
            <h2 class="section-title mb-6">
              <i class="fas fa-fingerprint icon-indigo"></i> {{ t('about.hobbies.title') }}
            </h2>
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
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
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


<style scoped>
/* --- 1. IMPORTS & RESET --- */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

* {
  box-sizing: border-box;
}

/* --- 2. LAYOUT & CENTRAGE (Votre demande principale) --- */
.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--color-text);
  position: relative;
  overflow-x: hidden;
  transition: background 0.5s ease, color 0.5s ease;
}

.main-card {
  backdrop-filter: blur(24px); /* Effet verre dépoli */
  -webkit-backdrop-filter: blur(24px);
  border-radius: 2.5rem;
  z-index: 10;
  width: 100%;
  max-width: 1100px; /* Largeur max contenu */
}

.content-padding {
  padding: 2rem;
}

@media (min-width: 768px) {
  .content-padding { padding: 4rem; }
}

/* --- 3. BACKGROUND ANIMATIONS (Blobs) --- */
.background-elements {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

.blob-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: #bae6fd; }
.blob-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: #c7d2fe; animation-delay: -5s; }
.blob-3 { top: 40%; left: 40%; width: 30vw; height: 30vw; background: #fef3c7; opacity: 0.4; animation-duration: 30s; }

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* --- 4. TYPOGRAPHIE & HEADER --- */
.text-center { text-align: center; }
.mb-8 { margin-bottom: 2rem; }
.mb-16 { margin-bottom: 4rem; }

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 9999px;
  margin: 0 auto;
}

.status-dot { position: relative; display: flex; height: 8px; width: 8px; }
.ping { position: absolute; display: inline-flex; height: 100%; width: 100%; border-radius: 50%; background: #60a5fa; opacity: 0.75; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
.dot { position: relative; display: inline-flex; height: 8px; width: 8px; border-radius: 50%; background: #3b82f6; }

@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-top: 0;
}

@media (min-width: 768px) {
  .hero-title { font-size: 4rem; }
}

.gradient-text {
  background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #475569;
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
}
@media (min-width: 768px) {
  .hero-subtitle { font-size: 1.25rem; }
}

.text-dark { color: #0f172a; font-weight: 700; }

/* --- 5. GRILLES (BENTO GRID) --- */
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

/* --- 6. SECTIONS & UTILITAIRES --- */
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-10 > * + * { margin-top: 2.5rem; }

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-indigo { color: #6366f1; }
.text-body { color: var(--color-text); font-size: 1.125rem; line-height: 1.75; }
.text-blue { color: #2563eb; font-weight: 600; }
.text-emerald { color: #059669; font-weight: 600; }

/* --- 7. CARTE INTERNATIONALE --- */
.card-international {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}

.card-international:hover {
  transform: scale(1.02);
}

.deco-circle {
  position: absolute;
  top: 0; right: 0;
  width: 16rem; height: 16rem;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  filter: blur(40px);
  transform: translate(50%, -50%);
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

/* --- 8. CITATION --- */
.quote-container {
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.quote-text {
  font-size: 1.25rem;
  font-family: serif;
  font-style: italic;
  color: #1e293b;
  margin: 0;
  line-height: 1.6;
}

/* --- 9. HOBBIES LIST --- */
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

/* Utilitaires communs manquants */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.relative { position: relative; }
.absolute { position: absolute; }
.w-full { width: 100%; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.mr-2 { margin-right: 0.5rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
</style>
