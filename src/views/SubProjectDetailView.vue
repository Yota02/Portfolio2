<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import { getProjectById } from '@/data/projects'

const route = useRoute()
const projectId = route.params.projectId as string
const subId = route.params.subId as string

const project = computed(() => getProjectById(projectId))
const subProject = computed(() => project.value?.subProjects?.find(sub => sub.id === subId))

const baseUrl = import.meta.env.BASE_URL;

// Propriété calculée pour construire les chemins complets des images du sous-projet
const fullImages = computed(() => {
  return subProject.value?.images.map(img => 
    img.startsWith('http') ? img : `${baseUrl}projet/${project.value?.folder}/${img}`
  ) || []
})

// Carrousel d'images (similaire à ProjectDetailView)
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
</script>

<template>
  <div class="sub-project-detail">
    <div class="container">
      <RouterLink to="/projects" class="back-link">← Retour aux projets</RouterLink>

      <div v-if="subProject" class="sub-project-header">
        <h1 class="sub-project-title">{{ subProject.name }}</h1>
        <p class="sub-project-subtitle">{{ subProject.description }}</p>
      </div>

      <div v-if="subProject" class="sub-project-content">
        <div class="main-section">
          <!-- Carrousel d'images -->
          <div class="carousel-container">
            <div class="carousel">
              <img v-if="fullImages.length > 0" :src="fullImages[currentImageIndex]" alt="Image du sous-projet" class="carousel-image" />
              <div v-else class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Image du sous-projet</p>
              </div>
            </div>
            <button v-if="fullImages.length > 1" @click="prevImage" class="carousel-btn prev">&lt;</button>
            <button v-if="fullImages.length > 1" @click="nextImage" class="carousel-btn next">&gt;</button>
            <div v-if="fullImages.length > 1" class="carousel-indicators">
              <span v-for="(img, index) in fullImages" :key="index" :class="['indicator', { active: index === currentImageIndex }]" @click="currentImageIndex = index"></span>
            </div>
          </div>

          <!-- Fonctionnalités -->
          <div class="features-section">
            <h2>Fonctionnalités</h2>
            <ul class="features-list">
              <li v-for="feature in subProject.features" :key="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="error">
        <p>Sous-projet introuvable.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles similaires à ProjectDetailView, adaptés pour les sous-projets */
.sub-project-detail {
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

.sub-project-header {
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

.sub-project-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sub-project-subtitle {
  font-size: 1.3rem;
  color: var(--color-text);
  opacity: 0.7;
}

.sub-project-content {
  display: grid;
  grid-template-columns: 1fr;
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

.features-section {
  margin-bottom: 2rem;
}

.features-section h2 {
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
  color: var(--color-text);
}

.features-list li:last-child {
  border-bottom: none;
}

.features-list li svg {
  color: var(--primary);
  flex-shrink: 0;
}

.error {
  text-align: center;
  color: var(--color-text);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .sub-project-detail {
    padding: 1rem;
  }

  .sub-project-title {
    font-size: 1.8rem;
  }

  .sub-project-subtitle {
    font-size: 1.1rem;
  }
}
</style>
