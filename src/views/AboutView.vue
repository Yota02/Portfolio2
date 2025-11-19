<template>
  <div class="about-page">
    <div class="background-glow"></div>

    <div class="container">
      <div class="hero-section">
        <h1 class="page-title">
          <span class="text-gradient">Architecte</span> de demain
        </h1>
        <p class="page-subtitle">Explorateur de l'IA & Développeur Passionné</p>
      </div>

      <div class="bento-grid">
        
        <div class="card bio-card" role="region" aria-labelledby="bio-title">
          <div class="card-header">
            <div class="icon-box"><i class="fas fa-fingerprint"></i></div>
            <h2 id="bio-title">Profil</h2>
          </div>
          <div class="card-content">
            <p class="highlight-text">
              Je suis <strong>Alexis Michaux-Kinet</strong>, futur enseignant-chercheur.
            </p>
            <p>
              Actuellement en BUT Informatique à Montpellier, je fusionne rigueur académique et créativité technique. Mon ambition ? Combler le fossé entre le développement web actuel et l'intelligence artificielle de demain.
            </p>
            <div class="tags">
              <span class="tag">Curieux</span>
              <span class="tag">Rigoureux</span>
              <span class="tag">Créatif</span>
            </div>
          </div>
        </div>

        <div class="card ai-card" role="region" aria-labelledby="ai-title">
          <div class="ai-glow"></div>
          <h2 id="ai-title"><i class="fas fa-fire-alt"></i> La Vision du Pyromane</h2>
          <p class="quote">
            "Tel un pyromane passionné par le feu, je suis fasciné par l'IA. C'est une force capable de transformer l'humanité. Nous avons franchi l'horizon ; il est impératif de maîtriser cette puissance avant qu'elle ne nous consume."
          </p>
          <div class="stat-box">
             <span>Objectif : Master & Recherche en IA</span>
          </div>
        </div>

        <div class="card mantra-card" role="region" aria-labelledby="mantra-title">
          <h2 id="mantra-title"><i class="fas fa-terminal"></i> Manifeste.sh</h2>
          <ul class="commandements-list">
            <li><span class="cmd-prefix">></span> Je ne passerai pas un jour sans apprendre.</li>
            <li><span class="cmd-prefix">></span> Toujours questionner pour comprendre.</li>
            <li><span class="cmd-prefix">></span> Explorer sans crainte de l'échec.</li>
          </ul>
        </div>

        <div class="card hobbies-container" role="region" aria-label="Mes passions">
          <h2 class="section-title"><i class="fas fa-heart"></i> Univers Personnel</h2>
          
          <div class="hobbies-gallery">
            <div 
              v-for="(hobby, index) in hobbies" 
              :key="index" 
              class="hobby-slice" 
              :style="{ '--hobby-color': hobby.color }"
              tabindex="0"
            >
              <div class="hobby-content">
                <div class="icon-wrapper">
                  <i :class="hobby.icon"></i>
                </div>
                <div class="text-wrapper">
                  <h3>{{ hobby.label }}</h3>
                  <span class="tagline">{{ hobby.tagline }}</span>
                </div>
              </div>
              <div class="slice-bg"></div>
            </div>
          </div>
        </div>

        <div class="card cv-card">
          <div class="cv-text">
            <h2>Collaborons</h2>
            <p>Prêt à relever des défis techniques ?</p>
          </div>
          <a href="pdf/cv.pdf" class="btn-download" download aria-label="Télécharger le CV">
            <span>Télécharger mon CV</span>
            <i class="fas fa-download"></i>
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hobbies = [
  { 
    icon: 'fas fa-globe-europe', 
    label: 'Géopolitique', 
    tagline: 'Comprendre le monde',
    color: '#3b82f6' // Bleu
  },
  { 
    icon: 'fas fa-flask', 
    label: 'Sciences', 
    tagline: 'Curiosité infinie',
    color: '#10b981' // Émeraude
  },
  { 
    icon: 'fas fa-rocket', 
    label: 'Sci-Fi', 
    tagline: 'Rêver le futur',
    color: '#8b5cf6' // Violet
  },
  { 
    icon: 'fas fa-users', 
    label: 'Sociologie', 
    tagline: 'L\'humain au centre',
    color: '#f59e0b' // Ambre
  },
  { 
    icon: 'fas fa-film', 
    label: 'Cinéma', 
    tagline: 'L\'art du récit',
    color: '#ef4444' // Rouge
  }
]
</script>

<style scoped>
/* --- VARIABLES & RESET --- */
.about-page {
  --glass-bg: rgba(20, 20, 30, 0.6);
  --glass-border: rgba(255, 255, 255, 0.1);
  --primary-glow: rgba(59, 130, 246, 0.4);
  --fire-glow: rgba(249, 115, 22, 0.4);
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --bg-color: #0f172a;

  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-color);
  color: var(--text-main);
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* --- FOND ANIMÉ --- */
.background-glow {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(80px);
  animation: pulse 10s infinite alternate;
  z-index: 0;
  pointer-events: none;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.2; }
  100% { transform: scale(1.1); opacity: 0.3; }
}

/* --- HERO SECTION --- */
.hero-section {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.text-gradient {
  background: linear-gradient(135deg, #60a5fa 0%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  font-family: 'Fira Code', monospace;
  opacity: 0.8;
}

/* --- BENTO GRID LAYOUT --- */
.bento-grid {
  display: grid;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto; 
  }
  
  /* Placement Desktop */
  .bio-card { grid-column: span 2; }
  .ai-card { grid-column: 3 / 4; grid-row: 1 / 3; } /* Colonne droite verticale */
  .mantra-card { grid-column: 1 / 2; }
  /* Hobbies prend toute la largeur du bas de la première section */
  .hobbies-container { grid-column: 1 / -1; } 
  .cv-card { grid-column: 1 / -1; }
}

@media (min-width: 1024px) {
  /* Ajustements Grand Écran */
  .bio-card { grid-column: 1 / 3; }
  .ai-card { grid-column: 3 / 4; grid-row: 1 / 3; }
  .mantra-card { grid-column: 1 / 3; grid-row: 2; }
  .hobbies-container { grid-column: 1 / -1; }
}

/* --- STYLE GÉNÉRAL DES CARTES --- */
.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 1.8rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.8s ease-out backwards;
}

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.card h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

/* --- 1. BIO CARD --- */
.icon-box {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #60a5fa;
}

.highlight-text {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #e2e8f0;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* --- 2. AI / FIRE CARD --- */
.ai-card {
  position: relative;
  background: linear-gradient(160deg, rgba(20,20,30,0.9) 0%, rgba(45,15,15,0.9) 100%);
  border: 1px solid rgba(249, 115, 22, 0.2);
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.ai-card:hover {
  border-color: #f97316;
  box-shadow: 0 10px 40px rgba(249, 115, 22, 0.15);
}

.ai-card h2 {
  color: #f97316;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.quote {
  font-style: italic;
  line-height: 1.6;
  color: #cbd5e1;
  position: relative;
  z-index: 2;
  font-size: 0.95rem;
}

.stat-box {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-weight: 700;
  color: #fff;
  font-size: 0.9rem;
}

.ai-glow {
  position: absolute;
  bottom: -20%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: var(--fire-glow);
  filter: blur(80px);
}

/* --- 3. MANTRA (TERMINAL) --- */
.mantra-card {
  background: #0d1117;
  font-family: 'Fira Code', monospace;
  border: 1px solid #30363d;
}

.mantra-card h2 {
  color: #4ade80;
  font-size: 1.1rem;
  border-bottom: 1px solid #30363d;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.commandements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.commandements-list li {
  margin-bottom: 0.8rem;
  color: #c9d1d9;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
}

.cmd-prefix {
  color: #4ade80;
  margin-right: 0.8rem;
  user-select: none;
}

/* --- 4. HOBBIES (ACCORDION GALLERY) --- */
.hobbies-container {
  padding: 1.5rem;
  min-height: 350px;
  overflow: hidden;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hobbies-gallery {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
  flex: 1;
}

.hobby-slice {
  position: relative;
  flex: 1;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.hobby-slice:hover {
  flex: 4;
}

.slice-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--hobby-color), transparent 80%);
  opacity: 0.2;
  transition: opacity 0.5s;
  z-index: 0;
}

.hobby-slice:hover .slice-bg {
  opacity: 0.6;
}

.hobby-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.icon-wrapper {
  font-size: 1.5rem;
  color: var(--hobby-color);
  background: rgba(0,0,0,0.3);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.hobby-slice:hover .icon-wrapper {
  transform: scale(1.1) translateY(-5px);
  background: var(--hobby-color);
  color: #fff;
  box-shadow: 0 0 15px var(--hobby-color);
}

.text-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
  white-space: nowrap;
}

.hobby-slice:hover .text-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.text-wrapper h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tagline {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.8);
  font-family: 'Fira Code', monospace;
}

/* --- 5. CV CARD --- */
.cv-card {
  background: linear-gradient(90deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.cv-text h2 {
  margin-bottom: 0.2rem;
  color: #fff;
}

.cv-text p {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.9rem;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: #fff;
  color: #000;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-download:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255,255,255,0.3);
}

/* --- ANIMATION ENTRÉE --- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .page-title { font-size: 2.5rem; }
  
  .cv-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .hobbies-gallery {
    flex-direction: column;
  }
  
  .hobby-slice {
    min-height: 70px;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  }
  
  .hobby-slice:hover { flex: 1.5; }
  
  .text-wrapper {
    opacity: 1;
    transform: translateY(0);
    margin-left: 1rem;
  }
  
  .hobby-content {
    flex-direction: row;
    align-items: center;
  }
}
</style>