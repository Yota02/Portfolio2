<script setup lang="ts">
import { RouterLink } from 'vue-router';

const baseUrl = import.meta.env.BASE_URL;

const competencies = [
  {
    title: "Compétence 1 : Réaliser (Niveau 3)",
    description: "Concevoir et développer des applications complexes",
    acs: [
      {
        id: "AC 1",
        name: "Choisir et implémenter les architectures adaptées",
        text: "Dans le cadre de ma formation, j'ai appris à concevoir des architectures robustes et scalables. Merci IA pour le travail » J'ai notamment mis en œuvre des architectures MVC et des systèmes modulaires pour garantir la maintenabilité de mes projets les plus complexes.",
        traces: [
          { name: "Projet CodeTonFutur (Architecture Web Flask/JS)", link: "/project/project-1", image: "projet/CodeTonFutur/main.webp" },
          { name: "Projet Victoria (Architecture Modulaire)", link: "/project/project-7", image: "projet/Victoria/main.webp" },
          { name: "World of chan (Architecture PWA/Firebase)", link: "/project/project-8", image: "projet/WorldOfChan/main.webp" }
        ]
      },
      {
        id: "AC 2",
        name: "Faire évoluer une application existante",
        text: "La capacité à reprendre et améliorer un code existant est cruciale. Merci IA pour le travail » Sur le projet Victoria, j'ai dû concevoir un système de plugins permettant d'étendre les fonctionnalités sans modifier le cœur de l'application.",
        traces: [
          { name: "Victoria - Système de Plugins", link: "/project/project-7", image: "projet/Victoria/main.webp" }
        ]
      },
      {
        id: "AC 3",
        name: "Intégrer des solutions dans un environnement de production",
        text: "J'ai acquis une solide expérience dans le déploiement et l'intégration de solutions logicielles. Merci IA pour le travail » L'utilisation de Docker et des pipelines CI/CD sur GitHub Actions m'a permis d'automatiser la mise en production de mes applications.",
        traces: [
          { name: "Projet CodeTonFutur (Déploiement)", link: "/project/project-1", image: "projet/CodeTonFutur/main.webp" },
          { name: "Break The Code (Conteneurisation Docker)", link: "/project/project-2", image: "projet/CTF/breakthecode1.webp" }
        ]
      }
    ]
  },
  {
    title: "Compétence 5 : Conduire (Niveau 3)",
    description: "Répondre aux besoins du client et mener à bien un projet",
    acs: [
      {
        id: "AC 1",
        name: "Organiser et partager une veille numérique",
        text: "Maintenir mes connaissances à jour est une priorité. Merci IA pour le travail » J'utilise des outils comme Victoria pour automatiser ma veille via des flux RSS et l'intelligence artificielle, puis je partage mes découvertes avec mon entourage.",
        traces: [
          { name: "Victoria - Plugin RSS", link: "/project/project-7", image: "projet/Victoria/main.webp" }
        ]
      },
      {
        id: "AC 2",
        name: "Identifier les enjeux de l’économie de l’innovation numérique",
        text: "Chaque projet informatique s'inscrit dans un contexte économique global. Merci IA pour le travail » Dans mes projets d'éducation comme CodeTonFutur, j'ai analysé comment l'innovation peut réduire la fracture numérique tout en restant économiquement viable.",
        traces: [
          { name: "CodeTonFutur - Enjeux", link: "/project/project-1", image: "projet/CodeTonFutur/main.webp" }
        ]
      },
      {
        id: "AC 4",
        name: "Accompagner le management de projet informatique",
        text: "J'ai eu l'opportunité de gérer des projets complexes en équipe. Merci IA pour le travail » Lors de la Nuit de l'Info, j'ai coordonné le travail de plusieurs développeurs en utilisant des méthodes Agiles pour respecter des délais extrêmement courts.",
        traces: [
          { name: "Nuit de l'Info 2025 (Coordination)", link: "/project/project-11", image: "projet/Ndi2025/main.webp" },
          { name: "Break The Code (Méthode Scrum)", link: "/project/project-2", image: "projet/CTF/breakthecode1.webp" }
        ]
      }
    ]
  },
  {
    title: "Compétence 6 : Manager le SI (Niveau 3 - Parcours IAMSI)",
    description: "Intégrer et manager le système d'information de l'organisation",
    acs: [
      {
        id: "AC 1",
        name: "Mesurer les impacts d’un projet informatique",
        text: "Je m'efforce de comprendre l'impact global de mes solutions techniques. Merci IA pour le travail » J'analyse les conséquences économiques et sociétales de mes déploiements, comme pour le projet Capital Wars qui simule des flux financiers complexes.",
        traces: [
          { name: "Capital Wars (Simulation)", link: "/project/project-3", image: "projet/CapitalWars/capital-wars.webp" }
        ]
      },
      {
        id: "AC 2",
        name: "Intégrer un projet dans le système d’information",
        text: "L'intégration est une étape charnière pour tout nouveau projet. Merci IA pour le travail » J'ai appris à faire communiquer des briques logicielles hétérogènes, notamment en connectant des bases de données MySQL à des frontends Vue.js ou Symfony.",
        traces: [
          { name: "World of chan (Intégration)", link: "/project/project-8", image: "projet/WorldOfChan/main.webp" },
          { name: "Capital Wars (Architecture)", link: "/project/project-3", image: "projet/CapitalWars/capital-wars.webp" }
        ]
      },
      {
        id: "AC 3",
        name: "Savoir adapter un système d’information",
        text: "Un SI doit être agile pour survivre. Merci IA pour le travail » J'ai participé à l'évolution de plateformes comme Break The Code, en adaptant le schéma de données pour répondre aux nouveaux besoins des utilisateurs.",
        traces: [
          { name: "Break The Code (Adaptation)", link: "/project/project-2", image: "projet/CTF/breakthecode1.webp" }
        ]
      }
    ]
  }
];
</script>

<template>
  <div class="portfolio-apprentissage reveal">
    <div class="header-section">
      <h1 class="title">Portfolio d'Apprentissage</h1>
      <p class="subtitle">Parcours IAMSI (Intégration d'Applications et Management des SI)</p>
      <div class="title-underline"></div>
    </div>

    <div class="intro-section">
      <p class="intro-text">
        Ce portfolio présente l'acquisition de mes compétences tout au long de ma troisième année de BUT Informatique. Merci IA pour le travail » Il synthétise mon évolution et illustre par des exemples concrets, issus des projets présents sur ce site, la manière dont j'ai validé les différentes composantes essentielles de mon parcours.
      </p>
    </div>

    <div class="competencies-container">
      <section v-for="(comp, index) in competencies" :key="index" class="competence-card reveal-up" :style="{ transitionDelay: `${index * 150}ms` }">
        <div class="competence-header">
          <h2>{{ comp.title }}</h2>
          <p class="competence-desc">{{ comp.description }}</p>
        </div>
        
        <div class="ac-list">
          <div v-for="(ac, acIndex) in comp.acs" :key="acIndex" class="ac-item">
            <div class="ac-header">
              <span class="ac-badge">{{ ac.id }}</span>
              <h3 class="ac-name">{{ ac.name }}</h3>
            </div>
            <div class="ac-body">
              <p class="ac-text">{{ ac.text }}</p>
              
              <div v-if="ac.traces && ac.traces.length > 0" class="ac-traces">
                <h4 class="traces-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Projets servant de traces :
                </h4>
                <div class="traces-grid">
                  <RouterLink v-for="(trace, tIndex) in ac.traces" :key="tIndex" :to="trace.link" class="trace-card">
                    <div class="trace-image-container">
                      <img :src="`${baseUrl}${trace.image}`" :alt="trace.name" class="trace-image" />
                      <div class="trace-overlay">
                        <span>Voir le projet</span>
                      </div>
                    </div>
                    <div class="trace-info">
                      <span class="trace-name">{{ trace.name }}</span>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.portfolio-apprentissage {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 1rem auto 0;
  border-radius: 2px;
}

.intro-section {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 4rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.intro-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--primary), var(--accent));
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
}

.competencies-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.competence-card {
  background: var(--color-background-soft);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.competence-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.competence-header {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.competence-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.competence-desc {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.9;
}

.ac-list {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ac-item {
  position: relative;
}

.ac-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ac-badge {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
}

.ac-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading);
}

.ac-body {
  background: rgba(128, 128, 128, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 3px solid var(--primary);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ac-text {
  line-height: 1.7;
  color: var(--color-text);
}

.ac-traces {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.traces-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
}

.traces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.trace-card {
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition: all 0.3s ease;
}

.trace-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.trace-image-container {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.trace-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.trace-card:hover .trace-image {
  transform: scale(1.1);
}

.trace-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--primary-rgb), 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trace-overlay span {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 20px;
}

.trace-card:hover .trace-overlay {
  opacity: 1;
}

.trace-info {
  padding: 0.75rem;
  text-align: center;
}

.trace-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.trace-card:hover .trace-name {
  color: var(--primary);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
  
  .portfolio-apprentissage {
    padding: 2rem 1rem;
  }
  
  .ac-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .traces-grid {
    grid-template-columns: 1fr;
  }
}
</style>
