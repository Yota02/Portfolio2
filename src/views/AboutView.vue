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
          <span class="bracket">{</span> Explorateur de l'IA & Développeur Passionné <span class="bracket">}</span>
        </p>
      </div>

      <div class="bento-grid">
        
        <div class="card bio-card" role="region">
          <div class="card-header">
            <div class="avatar-placeholder">
              <span>AM</span>
            </div>
            <div class="header-text">
              <span class="sub-label">À propos</span>
              <h2>Alexis Michaux-Kinet</h2>
            </div>
          </div>
          <div class="card-content">
            <p class="bio-text">
              Futur enseignant-chercheur en devenir. Actuellement en <strong>BUT Informatique</strong> à Montpellier.
            </p>
            <p class="bio-desc">
              Je fusionne rigueur académique et créativité technique. Mon ambition ? Combler le fossé entre le code d'aujourd'hui et l'intelligence de demain.
            </p>
            <div class="tags">
              <span class="tag">💡 Curieux</span>
              <span class="tag">🎯 Rigoureux</span>
              <span class="tag">🎨 Créatif</span>
            </div>
          </div>
        </div>

        <div class="card ai-card">
          <div class="fire-overlay"></div>
          <div class="card-content-ai">
            <div class="ai-header">
              <i class="fas fa-fire-alt fire-icon"></i>
              <h2>Vision Pyromane</h2>
            </div>
            <blockquote class="quote">
              "L'IA est le feu nouveau. Nous avons franchi l'horizon ; il est impératif de maîtriser cette puissance avant qu'elle ne nous consume."
            </blockquote>
            <div class="stat-box">
               <span class="stat-label">Objectif</span>
               <span class="stat-value">Master & Recherche IA</span>
            </div>
          </div>
        </div>

        <div class="card mantra-card">
          <div class="terminal-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="terminal-title">manifeste.sh</span>
          </div>
          <div class="terminal-body">
            <div class="code-line">
              <span class="cmd">while</span>(<span class="var">alive</span>) {
            </div>
            <div class="code-line indent">
              <span class="func">learn</span>();
            </div>
            <div class="code-line indent">
              <span class="func">question</span>(<span class="str">"everything"</span>);
            </div>
            <div class="code-line indent">
              <span class="func">explore</span>();
            </div>
            <div class="code-line">
              }
            </div>
          </div>
        </div>

        <div class="card hobbies-container">
          <h2 class="section-label">Univers Personnel</h2>
          
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
                <div class="icon-wrapper">
                  <span>{{ hobby.icon }}</span>
                </div>
                <div class="text-wrapper">
                  <h3>{{ hobby.label }}</h3>
                  <span class="tagline">{{ hobby.tagline }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card cv-card">
          <div class="cv-content">
            <div class="cv-text">
              <h2>Collaborons</h2>
              <p>Prêt à relever des défis techniques complexes ?</p>
            </div>
            <a href="pdf/cv.pdf" class="btn-download" download>
              <span>Télécharger CV</span>
              <div class="icon-circle">
                <i class="fas fa-arrow-down"></i>
              </div>
            </a>
          </div>
          <div class="cv-bg-decoration"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hobbies = [
  { 
    icon: '🌍', 
    label: 'Géopolitique', 
    tagline: 'Comprendre le monde',
    color: '#3b82f6' 
  },
  { 
    icon: '🧪', 
    label: 'Sciences', 
    tagline: 'Curiosité infinie',
    color: '#10b981' 
  },
  { 
    icon: '🚀', 
    label: 'Sci-Fi', 
    tagline: 'Rêver le futur',
    color: '#8b5cf6' 
  },
  { 
    icon: '👥', 
    label: 'Sociologie', 
    tagline: 'Humain au centre',
    color: '#f59e0b' 
  },
  { 
    icon: '🎥', 
    label: 'Cinéma', 
    tagline: 'L\'art du récit',
    color: '#ef4444' 
  }
]
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

/* --- VARIABLES --- */
.about-page {
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.8);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  
  --primary-dark: #0f172a;
  --primary-blue: #2563eb;
  --text-main: #1e293b;
  --text-muted: #64748b;
  
  --gradient-bg: linear-gradient(120deg, #f0f9ff 0%, #e0f2fe 100%);
  
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  padding: 2rem;
  background: #f1f5f9;
  position: relative;
  overflow-x: hidden;
  color: var(--text-main);
}

/* --- TEXTURE NOISE --- */
.noise-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* --- BLOBS ANIMÉS (Revisités) --- */
.background-blobs {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1; overflow: hidden;
}
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.5;
  animation: float 20s infinite alternate;
}
.blob-1 { top: -5%; left: -5%; width: 600px; height: 600px; background: #bfdbfe; }
.blob-2 { bottom: -10%; right: -10%; width: 500px; height: 500px; background: #ddd6fe; animation-delay: -5s; }
.blob-3 { top: 40%; left: 40%; width: 300px; height: 300px; background: #fed7aa; opacity: 0.3; animation-duration: 30s; }

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(30px, 50px) rotate(10deg); }
}

/* --- HERO SECTION --- */
.hero-section {
  text-align: center;
  margin-bottom: 5rem;
  padding-top: 3rem;
  animation: slideDown 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.badge-pill {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  color: #0f172a;
}

.text-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  margin-top: 1rem;
}
.bracket { color: #cbd5e1; font-weight: 300; }

/* --- BENTO GRID --- */
.bento-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bio-card { grid-column: span 2; }
  .cv-card { grid-column: span 2; }
  .hobbies-container { grid-column: span 2; }
}

@media (min-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto auto; }
  .bio-card { grid-column: 1 / 3; grid-row: 1; }
  .ai-card { grid-column: 3 / 4; grid-row: 1 / 3; }
  .mantra-card { grid-column: 1 / 3; grid-row: 2; }
  .hobbies-container { grid-column: 1 / 3; grid-row: 3; }
  .cv-card { grid-column: 3 / 4; grid-row: 3; }
}

/* --- CARTE BASE --- */
.card {
  background: var(--glass-bg);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--glass-shadow), inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.8);
}

/* --- BIO CARD --- */
.card.bio-card {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #2563eb;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.1);
}

.sub-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #94a3b8;
  font-weight: 700;
}
.header-text h2 { margin: 0; font-size: 1.5rem; color: #1e293b; }

.bio-text { font-size: 1.15rem; margin-bottom: 1rem; color: #334155; }
.bio-desc { font-size: 1rem; color: #64748b; margin-bottom: 2rem; line-height: 1.6; }

.tags { display: flex; gap: 0.8rem; flex-wrap: wrap; }
.tag {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}
.tag:hover { border-color: #cbd5e1; transform: scale(1.05); }

/* --- AI CARD (DARK MODE) --- */
.ai-card {
  background: #0f172a; /* Dark blue/black */
  border: 1px solid #334155;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.ai-card:hover { transform: translateY(-4px); background: #151e32; box-shadow: 0 20px 40px -5px rgba(0,0,0,0.5); }

.fire-overlay {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 60%;
  background: radial-gradient(circle at bottom, rgba(249, 115, 22, 0.15) 0%, transparent 70%);
  filter: blur(30px); pointer-events: none;
}

.ai-header { margin-bottom: 2rem; position: relative; z-index: 2; }
.fire-icon { font-size: 2.5rem; background: linear-gradient(to top, #f97316, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; display: block; filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.4)); }
.ai-header h2 { font-size: 1.4rem; margin: 0; color: #fff; }

.quote {
  font-family: 'Georgia', serif; font-style: italic;
  color: #cbd5e1; line-height: 1.6; margin-bottom: 3rem;
  position: relative; z-index: 2; font-size: 1rem;
}

.stat-box {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.5rem;
  display: flex; flex-direction: column; gap: 0.3rem;
  position: relative; z-index: 2;
}
.stat-label { font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; }
.stat-value { font-weight: 700; color: #fbbf24; font-size: 1.1rem; }

/* --- MANTRA CARD (TERMINAL) --- */
.mantra-card {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 0;
  display: flex; flex-direction: column;
}
.card.mantra-card:hover { background: #1e293b; transform: translateY(-4px); border-color: #475569; }

.terminal-header {
  background: #0f172a; padding: 0.8rem 1.5rem;
  border-bottom: 1px solid #334155;
  display: flex; align-items: center;
}
.dots { display: flex; gap: 6px; margin-right: 1rem; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #22c55e; }
.terminal-title { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #64748b; }

.terminal-body {
  padding: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; line-height: 1.6; color: #e2e8f0;
}
.indent { padding-left: 1.5rem; }
.cmd { color: #c084fc; } .var { color: #f87171; } .func { color: #60a5fa; } .str { color: #facc15; }

/* --- HOBBIES CARD --- */
.hobbies-container { padding: 1.5rem; min-height: 250px; display: flex; flex-direction: column; }
.section-label { font-size: 0.9rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 1rem; font-weight: 700; letter-spacing: 0.5px; }

.hobbies-gallery { display: flex; flex: 1; gap: 0.5rem; height: 200px; }

.hobby-slice {
  position: relative; flex: 1; border-radius: 16px; overflow: hidden;
  cursor: pointer; transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  background: #f8fafc; border: 1px solid #e2e8f0;
}
.hobby-slice:hover, .hobby-slice:focus { flex: 4; border-color: var(--hobby-color); }

.slice-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at bottom right, var(--hobby-color), transparent);
  opacity: 0; transition: opacity 0.5s;
}
.hobby-slice:hover .slice-bg { opacity: 0.15; }

.hobby-content {
  position: absolute; bottom: 0; left: 0; width: 100%; padding: 1.5rem;
  display: flex; flex-direction: column; justify-content: flex-end;
}

.icon-wrapper {
  font-size: 1.2rem; color: var(--hobby-color);
  background: #fff; width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 1rem;
  transition: transform 0.3s;
}
.hobby-slice:hover .icon-wrapper { transform: scale(1.1); background: var(--hobby-color); color: #fff; }

.text-wrapper {
  opacity: 0; transform: translateY(10px); transition: all 0.3s 0.1s;
  white-space: nowrap;
}
.hobby-slice:hover .text-wrapper { opacity: 1; transform: translateY(0); }
.text-wrapper h3 { font-size: 1.1rem; margin: 0; color: #0f172a; }
.tagline { font-size: 0.8rem; color: #64748b; }

/* --- CV CARD --- */
.cv-card {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white; border: none;
  display: flex; align-items: center; overflow: hidden;
}
.cv-content { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 1rem; }
.cv-text h2 { margin: 0 0 0.3rem 0; font-size: 1.3rem; }
.cv-text p { color: #bfdbfe; font-size: 0.9rem; margin: 0; }

.btn-download {
  display: flex; align-items: center; gap: 1rem;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  padding: 0.6rem 0.6rem 0.6rem 1.2rem; border-radius: 50px;
  color: white; text-decoration: none; font-weight: 600; font-size: 0.9rem;
  transition: all 0.2s; backdrop-filter: blur(10px);
}
.btn-download:hover { background: rgba(255,255,255,0.2); padding-right: 0.8rem; }
.icon-circle {
  width: 32px; height: 32px; background: white; color: #1e3a8a;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem;
}

/* --- ANIMATION UTILS --- */
@keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

/* --- RESPONSIVE FIXES --- */
@media (max-width: 768px) {
  .page-title { font-size: 2.5rem; }
  .hobbies-gallery { flex-direction: column; height: auto; }
  .hobby-slice { min-height: 80px; display: flex; align-items: center; padding: 0 1.5rem; }
  .hobby-content { position: relative; flex-direction: row; align-items: center; padding: 0; width: 100%; gap: 1rem; }
  .icon-wrapper { margin-bottom: 0; }
  .text-wrapper { opacity: 1; transform: none; }
  .cv-content { flex-direction: column; text-align: center; }
  .btn-download { width: 100%; justify-content: space-between; }
}
</style>