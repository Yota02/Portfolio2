<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type LanguageStatus = 'mastered' | 'learning' | 'planned'

interface Language {
  id: string
  name: string
  nativeName: string
  greeting: string
  level: string
  description: string
  flag: string
  color: string
  status: LanguageStatus
  year?: string
  proficiency?: number
}

const baseUrl = import.meta.env.BASE_URL;

const languages: Language[] = [
  // --- ACQUIS ---
  {
    id: 'lang-1',
    name: 'Français',
    nativeName: 'Français',
    greeting: 'Bonjour',
    level: 'Maîtrisé (C2)',
    description: 'Langue maternelle, utilisée quotidiennement pour la communication.',
    flag: `${baseUrl}drapeau/fr.svg`,
    color: '#10b981',
    status: 'mastered',
    year: 'Naissance',
    proficiency: 100
  },
  // --- EN COURS ---
  {
    id: 'lang-2',
    name: 'Anglais',
    nativeName: 'English',
    greeting: 'Hello',
    level: 'Avancé (C1)',
    description: 'Langue de travail et de veille technologique. Communication fluide.',
    flag: `${baseUrl}drapeau/en.svg`,
    color: '#3b82f6',
    status: 'learning',
    year: '2015',
    proficiency: 85
  },
  {
    id: 'lang-8',
    name: 'Allemand',
    nativeName: 'Deutsch',
    greeting: 'Hallo',
    level: 'Intermédiaire (B1)',
    description: 'Capacité à comprendre l\'essentiel et à discuter de sujets familiers.',
    flag: `${baseUrl}drapeau/de.svg`,
    color: '#6b7280',
    status: 'learning',
    year: '2024',
    proficiency: 45
  },
  {
    id: 'lang-3',
    name: 'Mandarin',
    nativeName: '普通话',
    greeting: 'Nǐ hǎo',
    level: 'Débutant (A1)',
    description: 'Apprentissage des tons et des premiers caractères (Hanzi).',
    flag: `${baseUrl}drapeau/zh.svg`,
    color: '#ef4444',
    status: 'learning',
    year: '2024',
    proficiency: 15
  },
  {
    id: 'lang-4',
    name: 'Japonais',
    nativeName: '日本語',
    greeting: 'Konnichiwa',
    level: 'Débutant (A1)',
    description: 'Apprentissage des Hiragana/Katakana et phrases de survie.',
    flag: `${baseUrl}drapeau/jp.svg`,
    color: '#f59e0b',
    status: 'learning',
    year: '2024',
    proficiency: 10
  },
  // --- FUTUR ---
  {
    id: 'lang-5',
    name: 'Russe',
    nativeName: 'Русский',
    greeting: 'Privet',
    level: 'Objectif A1',
    description: 'Découverte de l\'alphabet cyrillique.',
    flag: `${baseUrl}drapeau/ru.svg`,
    color: '#8b5cf6',
    status: 'planned',
    year: '2025'
  },
  {
    id: 'lang-6',
    name: 'Italien',
    nativeName: 'Italiano',
    greeting: 'Ciao',
    level: 'Curiosité',
    description: 'Attiré par la musique et la cuisine italienne.',
    flag: `${baseUrl}drapeau/it.svg`,
    color: '#06b6d4',
    status: 'planned'
  },
  {
    id: 'lang-7',
    name: 'Espagnol',
    nativeName: 'Español',
    greeting: 'Hola',
    level: 'Objectif A1',
    description: 'Préparation pour des voyages en Amérique Latine.',
    flag: `${baseUrl}drapeau/es.svg`,
    color: '#eab308',
    status: 'planned',
    year: '2025'
  }
]

const masteredLangs = computed(() => languages.filter(l => l.status === 'mastered'))
const learningLangs = computed(() => languages.filter(l => l.status === 'learning'))
const plannedLangs = computed(() => languages.filter(l => l.status === 'planned'))
</script>

<template>
  <div class="timeline-page">
    <div class="background-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <RouterLink to="/project/project-8" class="worldofchan-button" title="Voir le projet WorldOfChan">
      <img :src="`${baseUrl}projet/WorldOfChan/logo.png`" alt="WorldOfChan" class="worldofchan-icon" />
    </RouterLink>

    <div class="container">
      <header class="header">
        <div class="subtitle-caps">Mon Voyage Linguistique</div>
        <h1 class="page-title">Chronologie d'une Passion</h1>
        <p class="page-subtitle">D'une langue maîtrisée aux horizons inexplorés.</p>
      </header>

      <div class="timeline">
        <div class="timeline-line"></div>

        <div class="timeline-section">
          <div class="section-marker mastered-marker">
            <span class="icon">✓</span>
          </div>
          <h2 class="section-title">L'Ancrage (Acquis)</h2>
          
          <div class="cards-list">
            <div 
              v-for="(lang, index) in masteredLangs" 
              :key="lang.id" 
              class="timeline-card mastered animate-pop"
              :style="{ '--lang-color': lang.color, '--animation-delay': index * 0.15 + 's' }"
            >
              <div class="card-shine"></div>
              <div class="card-content">
                <div class="flag-wrapper">
                  <img :src="lang.flag" :alt="lang.name" class="flag" />
                </div>
                <div class="info">
                  <h3 class="lang-name">{{ lang.name }} <span class="year" v-if="lang.year">depuis {{ lang.year }}</span></h3>
                  <p class="lang-desc">{{ lang.description }}</p>
                </div>
                <div class="badge">C2</div>
              </div>
            </div>
          </div>
        </div>

        <div class="timeline-section active-section">
          <div class="section-marker learning-marker">
            <span class="icon">✎</span> </div>
          <h2 class="section-title">L'Aventure (En cours)</h2>

          <div class="cards-list">
            <div 
              v-for="(lang, index) in learningLangs" 
              :key="lang.id" 
              class="timeline-card learning animate-pop"
              :style="{ '--lang-color': lang.color, '--animation-delay': index * 0.15 + 's' }"
            >
              <div class="card-bg-text">{{ lang.greeting }}</div>
              
              <div class="card-content">
                <div class="flag-wrapper">
                  <img :src="lang.flag" :alt="lang.name" class="flag" />
                </div>
                <div class="info">
                  <h3 class="lang-name">{{ lang.name }} <span class="native">{{ lang.nativeName }}</span></h3>
                  
                  <div class="progress-wrapper">
                    <div class="progress-bar">
                      <div 
                        class="fill" 
                        :style="{ 
                          width: lang.proficiency + '%', 
                          backgroundColor: lang.color 
                        }"
                      >
                        <div class="shimmer-bar"></div>
                      </div> 
                    </div>
                    <span class="level-text" :style="{ color: lang.color }">{{ lang.level }}</span>
                  </div>

                  <p class="lang-desc">{{ lang.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="timeline-section">
          <div class="section-marker planned-marker">
            <span class="icon">🔭</span>
          </div>
          <h2 class="section-title">L'Horizon (Futur)</h2>

          <div class="cards-list">
            <div 
              v-for="(lang, index) in plannedLangs" 
              :key="lang.id" 
              class="timeline-card planned animate-pop"
              :style="{ '--lang-color': lang.color, '--animation-delay': index * 0.15 + 's' }"
            >
              <div class="card-content">
                <div class="flag-wrapper">
                  <img :src="lang.flag" :alt="lang.name" class="flag grayscale" />
                </div>
                <div class="info">
                  <h3 class="lang-name">{{ lang.name }}</h3>
                  <p class="lang-desc">{{ lang.description }}</p>
                </div>
                <div class="arrow">➔</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

:root {
  --text-main: var(--color-text);
  --text-muted: var(--vt-c-text-light-2);
  --bg-color: var(--color-background);
  --line-color: var(--color-border);
}

.timeline-page {
  min-height: 100vh;
  padding: 4rem 1rem;
  background-color: var(--color-background);
  font-family: 'Inter', sans-serif;
  color: var(--color-text);
  position: relative;
  overflow-x: hidden;
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* --- BLOBS D'AMBIANCE --- */
.background-blobs {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.6;
  animation: float 10s ease-in-out infinite;
}
.blob-1 { 
  top: -10%; left: -10%; width: 500px; height: 500px; 
  background: radial-gradient(circle, #e0e7ff 0%, rgba(255,255,255,0) 70%);
}
.blob-2 { 
  bottom: -10%; right: -10%; width: 600px; height: 600px; 
  background: radial-gradient(circle, #fef3c7 0%, rgba(255,255,255,0) 70%);
  animation-delay: 5s;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 30px) scale(1.1); }
}

.container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* --- HEADER --- */
.header { text-align: center; margin-bottom: 4rem; }
.subtitle-caps { text-transform: uppercase; font-size: 0.8rem; letter-spacing: 3px; color: var(--text-muted); font-weight: 700; margin-bottom: 0.5rem; }
.page-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-heading); }
.page-subtitle { color: var(--text-muted); font-style: italic; }

/* --- TIMELINE STRUCTURE --- */
.timeline { position: relative; padding-left: 3rem; }
.timeline-line {
  position: absolute; left: 14px; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, #3b82f6 0%, #cbd5e1 100%);
  z-index: 0;
}
.timeline-section { position: relative; margin-bottom: 4rem; }
.section-title {
  font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;
}

/* Markers */
.section-marker {
  position: absolute; left: -3.2rem; top: 0;
  width: 32px; height: 32px; border-radius: 50%;
  background: white; border: 2px solid var(--line-color);
  display: flex; align-items: center; justify-content: center;
  z-index: 1; box-shadow: 0 0 0 4px var(--bg-color);
  transition: transform 0.3s ease;
}
.timeline-section:hover .section-marker { transform: scale(1.2); }
.mastered-marker { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
.learning-marker { 
  border-color: #f59e0b; color: #f59e0b; background: #fffbeb; 
  animation: pulse 2s infinite; 
}
.planned-marker { border-color: #94a3b8; color: #94a3b8; border-style: dashed; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
}

.cards-list { display: flex; flex-direction: column; gap: 1.5rem; }

/* --- CARTE PRINCIPALE --- */
.timeline-card {
  background: var(--color-background-soft);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  
  /* Transition fluide pour le hover */
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Animation HOVER globale de la carte */
.timeline-card:hover {
  transform: translateY(-5px) scale(1.01); /* Lévitation + Scale */
  box-shadow: var(--shadow-lg);
  border-color: var(--lang-color);
  background: var(--color-background-mute);
}

/* Effet de lumière traversante (Sheen) */
.card-shine {
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
  transform: skewX(-25deg);
  pointer-events: none;
  transition: 0.5s;
  z-index: 10;
}
.timeline-card:hover .card-shine {
  left: 150%;
  transition: 0.7s ease-in-out;
}

.card-content {
  display: flex; align-items: flex-start; gap: 1rem;
  position: relative; z-index: 2;
}

/* Drapeau animé */
.flag-wrapper { perspective: 100px; }
.flag {
  width: 48px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  transition: transform 0.4s ease;
  display: inline-block;
}
.timeline-card:hover .flag {
  transform: scale(1.15) rotate(8deg); /* Le drapeau "salue" */
}

.info { flex-grow: 1; }
.lang-name { margin: 0 0 0.25rem 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
.year { font-weight: 400; font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem; }
.native { font-weight: 400; font-size: 0.85rem; color: var(--lang-color); margin-left: 0.5rem; opacity: 0.8; }
.lang-desc { font-size: 0.9rem; color: var(--text-muted); margin: 0.5rem 0 0 0; line-height: 1.5; }

/* --- MASTERED --- */
.mastered .badge {
  background: #eff6ff; color: #3b82f6;
  padding: 0.25rem 0.6rem; border-radius: 20px;
  font-weight: 700; font-size: 0.75rem;
  border: 1px solid #dbeafe;
  transition: all 0.3s ease;
}
.mastered:hover .badge {
  background: #3b82f6; color: white;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

/* --- LEARNING --- */
.learning { border-left: 4px solid var(--lang-color); }

/* Greeting bg text animé */
.card-bg-text {
  position: absolute;
  right: -10px; top: -15px;
  font-size: 4.5rem; font-weight: 900;
  opacity: 0.06; color: var(--lang-color);
  pointer-events: none; font-family: sans-serif;
  z-index: 1;
  transition: transform 0.5s ease-out, opacity 0.3s;
}
.learning:hover .card-bg-text {
  transform: translateX(-20px) translateY(5px); /* Parallaxe */
  opacity: 0.15;
}

/* Barre de progression animée */
.progress-wrapper { display: flex; align-items: center; gap: 12px; margin: 0.75rem 0; }
.progress-bar {
  height: 8px; background: #f1f5f9; border-radius: 10px;
  flex-grow: 1; overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}
.progress-bar .fill {
  height: 100%; border-radius: 10px;
  position: relative;
  overflow: hidden;
}

/* Shimmer effect sur la barre */
.shimmer-bar {
  position: absolute; top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(
    90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.4) 50%, 
    rgba(255,255,255,0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 2.5s infinite;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}

/* --- PLANNED --- */
.planned {
  border: 1px dashed #cbd5e1; background: transparent; opacity: 0.7;
}
.planned:hover {
  opacity: 1; background: white; border-style: solid;
}
.planned .grayscale { filter: grayscale(100%); transition: filter 0.3s; }
.planned:hover .grayscale { filter: grayscale(0%); }
.arrow { color: #cbd5e1; font-size: 1.2rem; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.planned:hover .arrow { transform: translateX(10px) scale(1.2); color: var(--lang-color); }

/* --- ANIMATION D'ENTRÉE "POP" --- */
@keyframes popIn {
  0% { opacity: 0; transform: translateY(30px) scale(0.9); }
  60% { opacity: 1; transform: translateY(-5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-pop {
  animation: popIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0; /* Initial state */
  animation-delay: var(--animation-delay, 0s);
}

/* Bouton WorldOfChan */
.worldofchan-button {
  position: absolute; top: 2rem; right: 2rem;
  display: inline-block; width: 56px; height: 56px;
  border-radius: 50%; background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 10; padding: 2px; border: 2px solid white;
}
.worldofchan-button:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.worldofchan-icon { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

/* Responsive */
@media (max-width: 600px) {
  .timeline { padding-left: 2rem; }
  .section-marker { left: -2.2rem; width: 28px; height: 28px; }
  .timeline-line { left: 10px; }
  .page-title { font-size: 2rem; }
  .worldofchan-button { top: 1rem; right: 1rem; width: 45px; height: 45px; }
}
</style>