<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { getProjectById, techIconMap } from '@/data/projects'

const route = useRoute()
const projectId = route.params.id as string

const project = computed(() => {
  const found = getProjectById(projectId)
  return found || {
    id: projectId,
    name: 'Projet Inconnu',
    description: 'Ce projet n\'existe pas',
    longDescription: '',
    tags: [],
    images: [],  // Ajouté pour le fallback
    folder: '',  // Ajouté pour le fallback
    features: [],
    links: { demo: '#', github: '#' },
    startDate: undefined,
    endDate: undefined,
    isOngoing: undefined,
    subProjects: []  // Ajouté pour le fallback
  }
})

// Ajout: Propriété calculée pour construire les chemins complets des images
const fullImages = computed(() => {
  return project.value.images.map(img => 
    img.startsWith('http') ? img : `/projet/${project.value.folder}/${img}`
  )
})

// Ajout pour le carrousel
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

const techIcons = ref<Record<string, string>>({})

onMounted(() => {
  const icons: Record<string, string> = {}
  
  for (const tech of project.value.tags) {
    const iconFileName = techIconMap[tech]
    if (iconFileName) {
      icons[tech] = `${iconFileName}.png`
    }
  }
  
  techIcons.value = icons
})

const getTechIcon = (tech: string): string => {
  return techIcons.value[tech] || ''
}
</script>

<template>
  <div class="project-detail">
    <div class="container">
      <RouterLink to="/projects" class="back-link">
        ← Retour aux projets
      </RouterLink>

      <div class="project-header">
        <h1 class="project-title">{{ project.name }}</h1>
        <p class="project-subtitle">{{ project.description }}</p>
      </div>

      <div class="project-content">
        <div class="main-section">
          <!-- Remplacement de l'image placeholder par le carrousel -->
          <div class="carousel-container">
            <div class="carousel">
              <img v-if="fullImages.length > 0" :src="fullImages[currentImageIndex]" alt="Image du projet" class="carousel-image" />
              <div v-else class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Image du projet</p>
              </div>
            </div>
            <button v-if="fullImages.length > 1" @click="prevImage" class="carousel-btn prev">&lt;</button>
            <button v-if="fullImages.length > 1" @click="nextImage" class="carousel-btn next">&gt;</button>
            <div v-if="fullImages.length > 1" class="carousel-indicators">
              <span v-for="(img, index) in fullImages" :key="index" :class="['indicator', { active: index === currentImageIndex }]" @click="currentImageIndex = index"></span>
            </div>
          </div>

          <div class="description-section">
            <h2>Description</h2>
            <p>{{ project.longDescription }}</p>
          </div>

          <div class="features-section">
            <h2>Fonctionnalités</h2>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <aside>
          <div class="info-card">
            <h3>Technologies</h3>
            <div class="tech-list">
              <span v-for="tech in project.tags" :key="tech" class="tech-icon" :title="tech">
                <img v-if="getTechIcon(tech)" :src="`/icone/${getTechIcon(tech)}`" :alt="tech" width="24" height="24" />
              </span>
            </div>
          </div>

          <div v-if="(project.links.demo && project.links.demo !== '#') || (project.links.github && project.links.github !== '#')" class="info-card">
            <h3>Liens</h3>
            <div class="links">
              <a v-if="project.links.demo && project.links.demo !== '#'" :href="project.links.demo" class="btn btn-primary" target="_blank">
                Voir la démo
              </a>
              <a v-if="project.links.github && project.links.github !== '#'" :href="project.links.github" class="btn btn-secondary" target="_blank">
                Code source
              </a>
            </div>
          </div>

          <div class="info-card">
            <h3>Statistiques du Projet</h3>
            <div class="stats-list">
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <strong>Date de début :</strong> {{ project.startDate || 'Non spécifiée' }}
              </div>
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <strong>Date de fin :</strong> {{ project.endDate || 'En cours' }}
              </div>
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <strong>Statut :</strong> {{ project.isOngoing ? 'En cours' : 'Terminé' }}
              </div>
            </div>
          </div>

          <div v-if="project.subProjects && project.subProjects.length > 0" class="info-card">
            <h3>Sous-projets</h3>
            <div class="sub-projects-list">
              <div v-for="sub in project.subProjects" :key="sub.id" class="sub-project-item">
                <RouterLink :to="{ name: 'sub-project-detail', params: { projectId: project.id, subId: sub.id } }" class="sub-project-link">
                  <h4>{{ sub.name }}</h4>
                </RouterLink>
                <p>{{ sub.description }}</p>
                <div v-if="sub.images.length > 0" class="sub-images">
                  <img v-for="img in sub.images" :key="img" :src="`/projet/${project.folder}/${img}`" :alt="sub.name" class="sub-image" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  min-height: 80vh;
  padding: 2rem;
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

.project-header {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
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

.project-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-subtitle {
  font-size: 1.3rem;
  color: var(--color-text);
  opacity: 0.7;
}

.project-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.main-section {
  animation: fadeInUp 0.6s ease-out 0.1s backwards;
}

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

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

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

.image-placeholder {
  background: var(--color-background-soft);
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  padding: 4rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
  opacity: 0.5;
}

.image-placeholder svg {
  margin-bottom: 1rem;
}

.description-section,
.features-section,
.stats-section {
  margin-bottom: 2rem;
}

.description-section h2,
.features-section h2,
.stats-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.description-section p {
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.8;
}

.stats-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, rgba(var(--primary-rgb), 0.05) 100%);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, var(--color-background-soft) 100%);
}

.stat-item svg {
  color: var(--primary);
  flex-shrink: 0;
}

.stat-item strong {
  font-weight: 600;
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
  color: var(--color-text);
}

.features-list li:last-child {
  border-bottom: none;
}

.features-list li svg {
  color: var(--primary);
  flex-shrink: 0;
}

.sidebar {
  animation: fadeInUp 0.6s ease-out 0.2s backwards;
}

.info-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.info-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-soft);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--primary);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-icon:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.tech-icon svg {
  width: 24px;
  height: 24px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

.sub-projects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px; /* Limite la hauteur pour éviter l'étirement */
  overflow-y: auto; /* Ajoute un défilement vertical si nécessaire */
  padding-right: 0.5rem; /* Espace pour la barre de défilement */
}

.sub-project-item {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, rgba(var(--primary-rgb), 0.05) 100%);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.6s ease-out;
}

.sub-project-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, var(--color-background-soft) 100%);
}

.sub-project-link {
  text-decoration: none;
  color: var(--primary);
  font-weight: 600;
  transition: color 0.3s ease;
}

.sub-project-link:hover {
  color: var(--accent);
}

.sub-features ul {
  list-style: none;
  padding: 0;
}

.sub-features li {
  padding: 0.25rem 0;
  color: var(--color-text);
  opacity: 0.8;
}

.sub-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.sub-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.sub-image:hover {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .project-content {
    grid-template-columns: 1fr;
  }

  .project-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .project-detail {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.8rem;
  }

  .project-subtitle {
    font-size: 1.1rem;
  }

  .image-placeholder {
    padding: 2rem;
  }

  .sub-images {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  .sub-image {
    height: 80px;
  }
}
</style>
