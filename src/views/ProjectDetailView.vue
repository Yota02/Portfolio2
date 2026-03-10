<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectById, techIconMap } from '@/data/projects'

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL

const route = useRoute()
const projectId = route.params.id as string

const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const project = computed(() => {
  const found = getProjectById(projectId)
  return found || {
    id: projectId,
    name: t('projects.unknown_project'),
    description: t('projects.project_not_found'),
    longDescription: '',
    tags: [],
    images: [],
    folder: '',
    features: [],
    links: { demo: '#', github: '#' },
    startDate: undefined,
    endDate: undefined,
    isOngoing: undefined,
    subProjects: [],
    competencies: []
  }
})

const fullImages = computed(() => {
  return project.value.images.map(img =>
    img.startsWith('http') ? img : `${baseUrl}projet/${project.value.folder}/${img}`
  )
})

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
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const getTechIcon = (tech: string): string => {
  return techIcons.value[tech] || ''
}

const getProjectImage = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${baseUrl}projet/${project.value.folder || ''}/${imagePath}`
}

const showCompetencies = ref(false)

const categoryColors: Record<string, string> = {
  'Réaliser': '#3b82f6',
  'Optimiser': '#8b5cf6',
  'Administrer': '#10b981',
  'Gérer': '#f59e0b',
  'Conduire': '#ef4444',
  'Collaborer': '#ec4899'
}

const categoryKeyMap: Record<string, string> = {
  'Réaliser': 'realiser',
  'Optimiser': 'optimiser',
  'Administrer': 'administrer',
  'Gérer': 'gerer',
  'Conduire': 'conduire',
  'Collaborer': 'collaborer'
}

const getBgColor = (category: string) => {
  const color = categoryColors[category] || '#ccc'
  return `${color}15`
}

const isVideo = (src: string): boolean => {
  return src.endsWith('.webm') || src.endsWith('.mp4') || src.endsWith('.avi')
}
</script>

<template>
  <div class="project-detail">
    <!-- Barre de progression -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <div class="container">
      <RouterLink to="/projects" class="back-link reveal">
        {{ t('projects.back_to_projects') }}
      </RouterLink>

      <div class="project-header reveal-up">
        <button
          v-if="project.competencies && project.competencies.length > 0"
          @click="showCompetencies = true"
          class="but-badge-btn"
          :title="t('projects.view_competencies')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15l-2 5l9-9l-9 9l2-5"></path><path d="M2 12l5 5l10 -10"></path></svg>
          {{ t('projects.but_competencies') }}
        </button>
        <h1 class="project-title">{{ project.name }}</h1>
        <p class="project-subtitle">{{ t(project.description) }}</p>
      </div>

      <div class="project-content">
        <div class="main-section reveal-left">
          <div class="carousel-container">
            <div class="carousel">
              <div v-if="fullImages.length > 0 && isVideo(fullImages[currentImageIndex]!)" class="carousel-video">
                <video :src="fullImages[currentImageIndex]!" controls autoplay muted loop class="video-element">
                  {{ t('projects.video_not_supported') }}
                </video>
              </div>
              <img v-else-if="fullImages.length > 0" :src="fullImages[currentImageIndex]!" :alt="t('projects.image_alt')" class="carousel-image" />
              <div v-else class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>{{ t('projects.image_alt') }}</p>
              </div>
            </div>
            <button v-if="fullImages.length > 1" @click="prevImage" class="carousel-btn prev">&lt;</button>
            <button v-if="fullImages.length > 1" @click="nextImage" class="carousel-btn next">&gt;</button>
            <div v-if="fullImages.length > 1" class="carousel-indicators">
              <span v-for="(img, index) in fullImages" :key="index" :class="['indicator', { active: index === currentImageIndex }]" @click="currentImageIndex = index"></span>
            </div>
          </div>

          <div class="description-section">
            <h2>{{ t('projects.description') }}</h2>
            <p>{{ t(project.longDescription) }}</p>
          </div>

          <div class="features-section">
            <h2>{{ t('projects.features') }}</h2>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature" class="reveal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ t(feature) }}
              </li>
            </ul>
          </div>
        </div>

        <aside class="sidebar reveal-right">
          <div class="info-card">
            <h3>{{ t('projects.technologies') }}</h3>
            <div class="tech-list">
              <span v-for="tech in project.tags" :key="tech" class="tech-icon" :title="tech">
                <img v-if="getTechIcon(tech)" :src="`${baseUrl}icone/${getTechIcon(tech)}`" :alt="tech" width="24" height="24" />
              </span>
            </div>
          </div>

          <div v-if="(project.links.demo && project.links.demo !== '#') || (project.links.github && project.links.github !== '#')" class="info-card">
            <h3>{{ t('projects.links') }}</h3>
            <div class="links">
              <a v-if="project.links.demo && project.links.demo !== '#'" :href="project.links.demo" class="btn btn-primary" target="_blank">
                {{ t('projects.view_demo') }}
              </a>
              <a v-if="project.links.github && project.links.github !== '#'" :href="project.links.github" class="btn btn-secondary" target="_blank">
                {{ t('projects.source_code') }}
              </a>
            </div>
          </div>

          <div class="info-card">
            <h3>{{ t('projects.stats.title') }}</h3>
            <div class="stats-list">
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <strong>{{ t('projects.stats.start_date') }} :</strong> {{ project.startDate ? t(project.startDate) : t('projects.stats.unspecified') }}
              </div>
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <strong>{{ t('projects.stats.end_date') }} :</strong> {{ project.isOngoing ? t('projects.stats.ongoing') : (project.endDate ? t(project.endDate) : t('projects.stats.unspecified')) }}
              </div>
              <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <strong>{{ t('projects.stats.status') }} :</strong> {{ project.isOngoing ? t('projects.stats.ongoing') : t('projects.stats.finished') }}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showCompetencies" class="modal-overlay" @click="showCompetencies = false">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h2>{{ t('competencies.title') }}</h2>
              <button class="close-btn" @click="showCompetencies = false">×</button>
            </div>

            <div class="modal-body">
              <p class="modal-intro">{{ t('competencies.modal_intro') }}</p>

              <div class="competencies-grid">
                <div
                  v-for="(comp, index) in project.competencies"
                  :key="index"
                  class="competency-card"
                  :style="{ borderTopColor: categoryColors[comp.category] || '#ccc' }"
                >
                  <div class="card-header" :style="{ backgroundColor: getBgColor(comp.category) }">
                    <span class="comp-category" :style="{ color: categoryColors[comp.category] || '#333' }">
                      {{ t('competencies.categories.' + categoryKeyMap[comp.category]) }}
                    </span>
                    <span class="comp-level">{{ t('competencies.levels.' + (comp.level === 'Niveau 1' ? 'n1' : comp.level === 'Niveau 2' ? 'n2' : 'n3')) }}</span>
                  </div>
                  <div class="card-body">
                    <ul class="ac-list">
                      <li v-for="item in comp.items" :key="item">
                        <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" :style="{ color: categoryColors[comp.category] }"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>{{ t(item) }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Barre de progression */
.progress-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1001;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  width: 0%;
  transition: width 0.1s ease-out;
}

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
  text-decoration: none;
}

.back-link:hover {
  transform: translateX(-5px);
}

.project-header {
  margin-bottom: 3rem;
  position: relative;
}

.but-badge-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  color: var(--color-heading);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  z-index: 10;
}

.but-badge-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.project-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-right: 150px;
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

.carousel-container { position: relative; margin-bottom: 2rem; }
.carousel { border-radius: 16px; overflow: hidden; background: var(--color-background-soft); box-shadow: var(--shadow-lg); }
.carousel-image { width: 100%; height: auto; display: block; }
.carousel-video { width: 100%; height: auto; display: flex; justify-content: center; align-items: center; }
.video-element { width: 100%; height: auto; max-height: 500px; object-fit: contain; }
.carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0, 0, 0, 0.5); color: white; border: none; padding: 0.5rem; cursor: pointer; font-size: 1.5rem; border-radius: 50%; transition: background 0.3s; }
.carousel-btn:hover { background: var(--primary); }
.carousel-btn.prev { left: 10px; }
.carousel-btn.next { right: 10px; }
.carousel-indicators { display: flex; justify-content: center; margin-top: 1rem; }
.indicator { width: 10px; height: 10px; border-radius: 50%; background: var(--color-border); margin: 0 5px; cursor: pointer; transition: all 0.3s; }
.indicator.active { background: var(--primary); transform: scale(1.2); }

.description-section h2, .features-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-heading); }
.description-section p { line-height: 1.8; color: var(--color-text); opacity: 0.8; }
.features-list { list-style: none; padding: 0; }
.features-list li { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); color: var(--color-text); }
.features-list li svg { color: var(--primary); flex-shrink: 0; }

.info-card { background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); }
.info-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-heading); }
.tech-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tech-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--color-background); border-radius: 8px; border: 1px solid var(--color-border); transition: all 0.3s ease; }
.tech-icon:hover { background: var(--primary); transform: translateY(-3px); }

.stats-list { display: grid; gap: 1rem; }
.stat-item { display: flex; align-items: center; gap: 0.75rem; color: var(--color-text); }
.stat-item svg { color: var(--primary); }

.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center; z-index: 2000;
}
.modal-content {
  background: var(--color-background); width: 90%; max-width: 900px; max-height: 90vh;
  border-radius: 20px; overflow: hidden; border: 1px solid var(--color-border);
}

@media (max-width: 1024px) {
  .project-content { grid-template-columns: 1fr; }
  .project-title { padding-right: 0; font-size: 2.2rem; }
}

@media (max-width: 768px) {
  .but-badge-btn { position: static; margin-bottom: 1rem; }
}
</style>
