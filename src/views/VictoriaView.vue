<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, techIconMap } from '@/data/projects'

// Récupérer les données de Victoria depuis projects.ts
const victoriaProject = computed(() => projects.find(p => p.id === 'project-7'))

// Propriété calculée pour construire les chemins complets des images
const fullImages = computed(() => {
  return victoriaProject.value?.images.map(img => 
    img.startsWith('http') ? img : `/projet/${victoriaProject.value?.folder}/${img}`
  ) || []
})

// Carrousel d'images
const currentImageIndex = ref(0)
const nextImage = () => {
  if (fullImages.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % fullImages.value.length
  }
}
const prevImage = () => {
  if (fullImages.value.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0 ? fullImages.value.length - 1 : currentImageIndex.value - 1
  }
}

// Icônes des technologies
const techIcons = ref<Record<string, string>>({})
import { onMounted } from 'vue'
onMounted(() => {
  const icons: Record<string, string> = {}
  for (const tech of victoriaProject.value?.tags || []) {
    const iconFileName = techIconMap[tech]
    if (iconFileName) {
      icons[tech] = `${iconFileName}.png`
    }
  }
  techIcons.value = icons
})
const getTechIcon = (tech: string): string => techIcons.value[tech] || ''
</script>

<template>
  <div class="victoria-page">
    <div class="container">
      <RouterLink to="/projects" class="back-link">← Retour aux projets</RouterLink>

      <div class="hero-section">
        <h1 class="page-title">{{ victoriaProject?.name }}</h1>
        <p class="page-subtitle">{{ victoriaProject?.description }}</p>
        <div class="hero-stats">
          <div class="stat">
            <strong>Précision IA :</strong> 98% sur les tests
          </div>
          <div class="stat">
            <strong>Technologies :</strong> {{ victoriaProject?.tags.join(', ') }}
          </div>
          <div class="stat">
            <strong>Statut :</strong> {{ victoriaProject?.isOngoing ? 'En cours' : 'Terminé' }}
          </div>
        </div>
      </div>

      <!-- Carrousel d'images -->
      <div class="carousel-container">
        <div class="carousel">
          <img v-if="fullImages.length > 0" :src="fullImages[currentImageIndex]" alt="Image du projet Victoria" class="carousel-image" />
          <div v-else class="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p>Image du projet Victoria</p>
          </div>
        </div>
        <button v-if="fullImages.length > 1" @click="prevImage" class="carousel-btn prev">&lt;</button>
        <button v-if="fullImages.length > 1" @click="nextImage" class="carousel-btn next">&gt;</button>
        <div v-if="fullImages.length > 1" class="carousel-indicators">
          <span v-for="(img, index) in fullImages" :key="index" :class="['indicator', { active: index === currentImageIndex }]" @click="currentImageIndex = index"></span>
        </div>
      </div>

      <!-- Description détaillée -->
      <div class="description-section">
        <h2>Description du Projet</h2>
        <p>{{ victoriaProject?.longDescription }}</p>
        <p>Victoria est un outil innovant qui utilise l'intelligence artificielle pour automatiser le tri d'images. Inspiré par des besoins personnels, ce projet explore les réseaux de neurones convolutionnels (CNN) et le deep learning avec PyTorch.</p>
      </div>

      <!-- Fonctionnalités -->
      <div class="features-section">
        <h2>Fonctionnalités Clés</h2>
        <ul class="features-list">
          <li v-for="feature in victoriaProject?.features" :key="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {{ feature }}
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Interface utilisateur moderne avec CustomTkinter pour une expérience fluide.
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Surveillance en temps réel des dossiers avec Watchdog pour un tri automatique.
          </li>
        </ul>
      </div>

      <!-- Technologies -->
      <div class="tech-section">
        <h2>Technologies Utilisées</h2>
        <div class="tech-list">
          <span v-for="tech in victoriaProject?.tags" :key="tech" class="tech-icon" :title="tech">
            <img v-if="getTechIcon(tech)" :src="`/icone/${getTechIcon(tech)}`" :alt="tech" width="32" height="32" />
            <span v-else>{{ tech }}</span>
          </span>
        </div>
        <p>Ce projet met en œuvre Python pour la logique, PyTorch pour l'IA, et CustomTkinter pour l'interface. Watchdog permet la surveillance automatique des fichiers.</p>
      </div>

      <!-- Statistiques -->
      <div class="stats-section">
        <h2>Statistiques et Performances</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <strong>Temps d'entraînement :</strong> ~2 heures sur GPU
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <strong>Images traitées :</strong> Plus de 10 000 en test
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <strong>Précision moyenne :</strong> 95% sur dataset varié
          </div>
        </div>
      </div>

      <!-- Liens -->
      <div class="links-section">
        <h2>Liens et Ressources</h2>
        <div class="links">
          <a v-if="victoriaProject?.links.demo && victoriaProject.links.demo !== '#'" :href="victoriaProject.links.demo" class="btn btn-primary" target="_blank">Voir une démo</a>
          <a v-if="victoriaProject?.links.github && victoriaProject.links.github !== '#'" :href="victoriaProject.links.github" class="btn btn-secondary" target="_blank">Code source</a>
          <RouterLink to="/contact" class="btn btn-secondary">Me contacter</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles similaires à ProjectDetailView, avec des ajouts pour plus de richesse */
.victoria-page {
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(180deg, transparent 0%, var(--color-background-mute) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.back-link:hover {
  transform: translateX(-5px);
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

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat {
  padding: 0.5rem 1rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  font-size: 0.9rem;
}

.carousel-container,
.description-section,
.features-section,
.tech-section,
.stats-section,
.links-section {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.description-section h2,
.features-section h2,
.tech-section h2,
.stats-section h2,
.links-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tech-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-background-soft);
  border-radius: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn:hover {
  transform: translateY(-2px);
}

/* Carrousel styles (réutilisés de ProjectDetailView) */
.carousel-container {
  position: relative;
  margin-bottom: 2rem;
}

.carousel {
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-background-soft);
}

.carousel-image {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
}

.carousel-btn.prev { left: 10px; }
.carousel-btn.next { right: 10px; }

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
  margin: 0 5px;
  cursor: pointer;
}

.indicator.active {
  background: var(--primary);
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
  .hero-stats {
    flex-direction: column;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
