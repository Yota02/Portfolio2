<template>
  <div class="about-page">
    <div class="noise-overlay"></div>

    <div class="background-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="container">

      <div class="hero-section">

        <h1 class="page-title">
          <span class="text-gradient">Architecte</span> de demain
        </h1>
        <p class="page-subtitle">
          <span class="mono-bracket">{</span> Explorateur IA & Développeur Passionné <span class="mono-bracket">}</span>
        </p>
      </div>

      <div class="bento-grid">

        <div class="card bio-card">
          <div class="card-header">
            <div class="avatar-wrapper">
              <span class="initials">AM</span>
              <div class="avatar-glow"></div>
            </div>
            <div class="header-infos">
              <span class="sub-label">À PROPOS</span>
              <h2>Alexis Michaux-Kinet</h2>
            </div>
          </div>
          <div class="card-content">
            <p class="bio-intro">
              Futur enseignant-chercheur en devenir. <br> Actuellement en <strong>BUT Informatique</strong> à Montpellier.
            </p>
            <p class="bio-desc">

            </p>
            <div class="tags-container">
              <span class="tag">💡 Curieux</span>
              <span class="tag">🎯 Rigoureux</span>
              <span class="tag">🎨 Créatif</span>
            </div>
          </div>
        </div>

        <div class="card mantra-card">
          <div class="terminal-header">
            <div class="window-controls">
              <span class="control red"></span>
              <span class="control yellow"></span>
              <span class="control green"></span>
            </div>
            <span class="filename">manifeste.sh — zsh</span>
          </div>
          <div class="terminal-body">
            <div class="code-line">
              <span class="kwd">while</span>(<span class="var">alive</span>) {
            </div>
            <div class="code-line indent-1">
              <span class="func">learn</span>();
            </div>
            <div class="code-line indent-1">
              <span class="func">question</span>(<span class="str">"everything"</span>);
            </div>
            <div class="code-line indent-1">
              <span class="func">explore</span>();
            </div>
            <div class="code-line">
              }
            </div>
            <div class="cursor-line">_</div>
          </div>
        </div>

        <div class="card hobbies-card">
          <h3 class="card-label">Univers Personnel</h3>
          <div class="hobbies-gallery">
            <div
              v-for="(hobby, index) in hobbies"
              :key="index"
              class="hobby-slice"
              :style="{ '--hobby-color': hobby.color }"
              tabindex="0"
            >
              <div class="slice-bg"></div>
              <div class="hobby-content">
                <div class="icon-box">
                  {{ hobby.icon }}
                </div>
                <div class="text-box">
                  <h4>{{ hobby.label }}</h4>
                  <span>{{ hobby.tagline }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card cv-card">
          <div class="cv-content">
            <div class="cv-text">
              <h3>Collaborons</h3>
              <p>Prêt à relever des défis techniques ?</p>
            </div>
            <a href="/pdf/cv.pdf" class="btn-download" download>
              <span>Télécharger CV</span>
              <div class="icon-circle">
                <i class="fas fa-arrow-down"></i>
              </div>
            </a>
          </div>
          <div class="cv-decoration"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Données statiques pour les hobbies
const hobbies = [
  { icon: '🌍', label: 'Géopolitique', tagline: 'Analyse du monde', color: '#3b82f6' },
  { icon: '🧪', label: 'Sciences', tagline: 'Curiosité infinie', color: '#10b981' },
  { icon: '🚀', label: 'Sci-Fi', tagline: 'Rêver le futur', color: '#8b5cf6' },
  { icon: '👥', label: 'Sociologie', tagline: 'L\'humain au centre', color: '#f59e0b' },
  { icon: '🎥', label: 'Cinéma', tagline: 'L\'art du récit', color: '#ef4444' }
]
</script>

<style scoped>
/* Import des polices modernes */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

/* --- CONFIGURATION GLOBALE --- */
.about-page {
  /* Palette de couleurs */
  --bg-gradient-start: #f8fafc;
  --bg-gradient-end: #e2e8f0;
  --primary-blue: #2563eb;
  --primary-dark: #0f172a;
  --text-main: #1e293b;
  --text-muted: #64748b;

  /* Glassmorphism Variables */
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.8);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);

  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text-main);
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #fef3c7 100%);
  position: relative;
  overflow-x: hidden;
}

/* --- BACKGROUND FX --- */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.04;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.background-blobs {
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
.blob-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: #ddd6fe; animation-delay: -5s; }
.blob-3 { top: 40%; left: 40%; width: 30vw; height: 30vw; background: #fed7aa; opacity: 0.4; animation-duration: 30s; }

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

/* --- HERO --- */
.hero-section {
  text-align: center;
  padding: 4rem 0 5rem;
  animation: slideInDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.1);
}

.pulse-dot {
  width: 6px; height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
  animation: pulse 2s infinite;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.text-gradient {
  background: linear-gradient(to right, #2563eb, #7c3aed, #db2777);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.page-subtitle {
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-muted);
  font-size: 1.1rem;
}
.mono-bracket { color: #cbd5e1; }

/* --- BENTO GRID SYSTEM --- */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  animation: fadeInUp 0.8s ease 0.2s both;
}

@media (min-width: 768px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bio-card { grid-column: span 2; }
  .hobbies-card { grid-column: span 2; }
  .cv-card { grid-column: span 2; }
}

@media (min-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto; }
  .bio-card { grid-column: 1 / 3; grid-row: 1; }
  .mantra-card { grid-column: 3 / 4; grid-row: 1; height: 100%; }
  .hobbies-card { grid-column: 1 / 3; grid-row: 2; }
  .cv-card { grid-column: 3 / 4; grid-row: 2; }
}

/* --- COMMON CARD STYLES --- */
.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.08);
  border-color: #fff;
  z-index: 2;
}

/* --- BIO CARD --- */
.card.bio-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.avatar-wrapper {
  position: relative;
  width: 64px; height: 64px;
  background: linear-gradient(135deg, #eff6ff, #bfdbfe);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #2563eb;
  font-size: 1.25rem;
}

.header-infos h2 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
  line-height: 1.2;
}

.sub-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
}

.bio-intro { font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.8rem; line-height: 1.6; }
.bio-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6; }

.tags-container { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.tag {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #e2e8f0;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

/* --- TERMINAL MANTRA --- */
.mantra-card {
  padding: 0;
  background: #1e293b; /* Slate 800 */
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background: #0f172a;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #334155;
}

.window-controls { display: flex; gap: 6px; margin-right: 1rem; }
.control { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #22c55e; }
.filename { font-family: 'JetBrains Mono'; font-size: 0.75rem; color: #64748b; }

.terminal-body {
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e2e8f0;
  flex: 1;
}

.indent-1 { padding-left: 1.5rem; }
.kwd { color: #c084fc; } .var { color: #f87171; } .func { color: #60a5fa; } .str { color: #facc15; }
.cursor-line { animation: blink 1s step-end infinite; color: #2563eb; }
@keyframes blink { 50% { opacity: 0; } }

/* --- HOBBIES ACCORDION --- */
.hobbies-card {
  display: flex;
  flex-direction: column;
  min-height: 260px;
}
.card-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 1.2rem;
  letter-spacing: 0.05em;
}
.hobbies-gallery {
  display: flex;
  flex: 1;
  gap: 0.5rem;
  width: 100%;
}
.hobby-slice {
  position: relative;
  flex: 1;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}
.hobby-slice:hover, .hobby-slice:focus {
  flex: 4;
  border-color: var(--hobby-color);
}
.slice-bg {
  position: absolute; inset: 0;
  background: var(--hobby-color);
  opacity: 0; transition: opacity 0.4s;
}
.hobby-slice:hover .slice-bg { opacity: 0.1; }

.hobby-content {
  position: relative; z-index: 2; width: 100%;
  display: flex; flex-direction: column; gap: 0.5rem;
  white-space: nowrap;
}
.icon-box {
  font-size: 1.5rem;
  background: #f8fafc;
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hobby-slice:hover .icon-box {
  transform: scale(1.1) rotate(-5deg);
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.text-box {
  opacity: 0; transform: translateY(10px);
  transition: all 0.4s ease 0.1s;
}
.hobby-slice:hover .text-box { opacity: 1; transform: translateY(0); }
.text-box h4 { margin: 0; color: #0f172a; font-weight: 700; font-size: 1rem; }
.text-box span { font-size: 0.8rem; color: #64748b; }

/* --- CV CARD --- */
.cv-card {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border: none;
  color: white;
  display: flex;
  align-items: center;
}
.cv-card:hover {
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.4);
}
.cv-content {
  width: 100%;
  display: flex; justify-content: space-between; align-items: center;
  position: relative; z-index: 2;
}
.cv-text h3 { margin: 0 0 0.25rem; font-size: 1.25rem; }
.cv-text p { margin: 0; font-size: 0.85rem; color: #bfdbfe; }
.btn-download {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex; align-items: center; gap: 0.75rem;
  transition: all 0.3s ease;
}
.btn-download:hover { background: rgba(255,255,255,0.3); transform: translateX(-5px); }
.icon-circle {
  width: 32px; height: 32px; background: white; color: #2563eb;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
}

/* --- ANIMATIONS & RESPONSIVE --- */
@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@media (max-width: 640px) {
  .page-title { font-size: 2.5rem; }
  .hobbies-gallery { flex-direction: column; height: auto; }
  .hobby-slice {
    min-height: 70px;
    align-items: center;
    padding: 0 1.5rem;
  }
  .hobby-slice:hover { flex: 1; } /* Disable expansion on mobile */
  .hobby-content { flex-direction: row; align-items: center; gap: 1rem; }
  .text-box { opacity: 1; transform: translateY(0); }
  .cv-content { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  .btn-download { width: 100%; justify-content: space-between; }
}
</style>
