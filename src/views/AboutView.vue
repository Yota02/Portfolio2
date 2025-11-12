<template>
  <div class="about-page">
    <div class="container">
      <div class="hero-section">
        <h1 class="page-title">À propos de moi</h1>
        <p class="page-subtitle">Découvrez mon parcours, mes passions et mes objectifs professionnels.</p>
      </div>

      <div class="content-section">
        <div class="bio-section card" role="region" aria-labelledby="bio-title">
          <h2 id="bio-title"><i class="fas fa-user" aria-hidden="true"></i> Qui suis-je ?</h2>
          <p>
            Je suis Alexis Michaux-Kinet, étudiant en dernière année de BUT Informatique à l'IUT de Montpellier. Passionné par l'informatique depuis mon plus jeune âge, je m'intéresse particulièrement au développement web, à l'intelligence artificielle et aux technologies émergentes. <strong>Curieux</strong>, rigoureux et créatif, j'aime relever des défis techniques et apprendre de nouvelles technologies.
          </p>
          <p>
            Mon objectif après le BUT est de poursuivre mes études en master en IA, tout en acquérant de l'expérience professionnelle dans l'IA. Je vise à devenir un enseignant-chercheur dans ce domaine.
          </p>
        </div>

        <div class="objectives-section card" role="region" aria-labelledby="objectives-title">
          <h2 id="objectives-title"><i class="fas fa-bullseye" aria-hidden="true"></i> Mon placement sur l'IA</h2>
          <p>
            Tel un pyromane passionné par le feu, je suis fasciné par l'IA, cette force capable de transformer l'humanité telle que nous la connaissons, pour le meilleur comme pour le pire.
            Nous avons franchis la ligne des horizons et il est impératif de comprendre et maîtriser cette puissance avant qu'elle ne nous dépasse.
          </p>
        </div>

        <div class="hobbies-section card" role="region" aria-labelledby="hobbies-title">
          <h2 id="hobbies-title"><i class="fas fa-heart" aria-hidden="true"></i> Mes Hobbies</h2>
          <div class="hobbies-grid">
            <div class="hobby-card" v-for="(hobby, index) in hobbies" :key="index" :aria-label="hobby.label">
              <i :class="hobby.icon" aria-hidden="true"></i>
              <span>{{ hobby.label }}</span>
            </div>
          </div>
        </div>

        <div class="commandements-section card" role="region" aria-labelledby="commandements-title">
          <h2 id="commandements-title"><i class="fas fa-scroll" aria-hidden="true"></i> Mes 3 commandements</h2>
          <ul class="commandements-list">
            <li>"Je ne passerais pas un jour sans apprendre au moins 1 choses"</li>
            <li>"Je poserais toujours des questions pour comprendre le monde"</li>
            <li>"J'explorerais de nouvelles idées sans crainte de l'échec"</li>
          </ul>
        </div>

        <div class="cv-section card" role="region" aria-labelledby="cv-title">
          <h2 id="cv-title"><i class="fas fa-download" aria-hidden="true"></i> Téléchargez mon CV</h2>
          <a href="/pdf/cv.pdf" class="btn btn-primary" download aria-label="Télécharger le CV en PDF">Télécharger le CV</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
// Aucun script nécessaire pour cette vue statique
const hobbies = [
  { icon: 'fas fa-globe', label: 'Géopolitique' },
  { icon: 'fas fa-flask', label: 'Science' },
  { icon: 'fas fa-rocket', label: 'Science fiction' },
  { icon: 'fas fa-users', label: 'Sociologie' },
  { icon: 'fas fa-film', label: 'Films' }
]
</script>

<style scoped>
/* Styles de base existants */
.about-page {
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, var(--color-background-mute) 100%);
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
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-section h2 i {
  color: var(--primary);
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.bio-section p {
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  transition: color 0.3s ease;
}

.objectives-list li:hover {
  color: var(--primary);
}

.objectives-list li:last-child {
  border-bottom: none;
}

.hobbies-section {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.hobby-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hobby-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.2);
}

.hobby-card i {
  font-size: 2rem;
  color: var(--accent);
}

.hobby-card span {
  font-weight: 600;
  color: var(--color-text);
}

.commandements-section {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.commandements-list {
  list-style: none;
  padding: 0;
}

.commandements-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  font-style: italic;
  transition: color 0.3s ease;
}

.commandements-list li:hover {
  color: var(--primary);
}

.commandements-list li:last-child {
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  .card {
    padding: 1.5rem;
  }
  .hobbies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hobbies-grid {
    grid-template-columns: 1fr;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
