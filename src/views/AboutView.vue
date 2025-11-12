<template>
  <div class="about-page">
    <div class="container">
      <div class="hero-section">
        <h1 class="page-title">À propos de moi</h1>
        <p class="page-subtitle">Découvrez mon parcours, mes passions et mes objectifs professionnels.</p>
      </div>

      <div class="content-section">
        <div class="bio-section">
          <h2>Qui suis-je ?</h2>
          <p>
            Je suis Alexis Michaux-Kinet, étudiant en BUT Informatique à l'IUT de Montpellier. Passionné par l'informatique depuis mon plus jeune âge, je m'intéresse particulièrement au développement web, à l'intelligence artificielle et aux technologies émergentes. Curieux, rigoureux et créatif, j'aime relever des défis techniques et apprendre de nouvelles technologies.
          </p>
          <p>
            Mon objectif après le BUT est de poursuivre mes études en master en IA, tout en acquérant de l'expérience professionnelle dans le développement full-stack. Je vise à devenir un expert en technologies innovantes et à contribuer à des projets impactants.
          </p>
        </div>

        <div class="parcours-section">
          <h2>Mon Parcours Académique</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Baccalauréat (2020-2023)</h3>
                <p>Lycée Jean Jaurès - Obtention du baccalauréat avec mention.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>BUT Informatique (2023-2026)</h3>
                <p>IUT de Montpellier - Formation en développement, IA et gestion de projets.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Stage au CSUM (Janvier-Avril 2025)</h3>
                <p>Centre Spatial Universitaire de Montpellier - Analyse de données spatiales.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Licence 3 MTS eLearning (2025-2026)</h3>
                <p>Tech Solutions - Spécialisation en eLearning et technologies éducatives.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Master en IA (2026-2028)</h3>
                <p>IAE de Montpellier - Recherche et développement en intelligence artificielle.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Thèse et Carrière Internationale (2028-...)</h3>
                <p>Thèse sur l'IA et la sociologie, puis enseignement-chercheur dans des universités internationales (Japon, Chine, Royaume-Uni, Allemagne, etc.).</p>
              </div>
            </div>
          </div>
        </div>

        <div class="objectives-section">
          <h2>Mes Objectifs Professionnels</h2>
          <ul class="objectives-list">
            <li>Devenir un développeur full-stack expert en Vue.js, TypeScript et IA.</li>
            <li>Contribuer à des projets open-source et innovants.</li>
            <li>Poursuivre une carrière académique en recherche sur l'IA.</li>
            <li>Travailler dans un environnement international et collaboratif.</li>
          </ul>
        </div>

        <div class="cv-section">
          <h2>Téléchargez mon CV</h2>
          <a href="/cv-alexis-michaux-kinet.pdf" class="btn btn-primary" download>Télécharger le CV</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Aucun script nécessaire pour cette vue statique
</script>

<style scoped>
.about-page {
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(180deg, transparent 0%, var(--color-background-mute) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 1rem;
}

.content-section > div {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.content-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.bio-section p {
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary), var(--accent));
}

.timeline-item {
  margin-bottom: 2rem;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  border: 3px solid white;
}

.timeline-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: var(--color-text);
  opacity: 0.7;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.objectives-list li:last-child {
  border-bottom: none;
}

.cv-section {
  text-align: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .timeline {
    padding-left: 1rem;
  }
}
</style>
