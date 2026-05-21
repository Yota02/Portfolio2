<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectById, purposeMap, type ProjectPurpose, type ProjectMetric } from '@/data/projects'
import TechBadge from '@/components/TechBadge.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import ProjectEvolution from '@/components/ProjectEvolution.vue'
import { getLocalizedDuration } from '@/utils/dateUtils'

const { t, locale } = useI18n()
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
    category: 'Logiciel',
    purpose: 'Personnel' as ProjectPurpose,
    context: '',
    personalContribution: '',
    duration: '',
    newTech: [],
    logo: '',
    version: undefined,
    groupId: undefined,
    metrics: [] as ProjectMetric[]
  }
})

const calculatedDuration = computed(() => {
  if (!project.value || !project.value.startDate) return ''
  return getLocalizedDuration(
    project.value.startDate,
    project.value.endDate,
    project.value.isOngoing,
    locale.value,
    t
  )
})

// Logic for key metrics scroll animation
const metricsContainer = ref<HTMLElement | null>(null)
const animatedValues = ref<number[]>([])
const hasAnimated = ref(false)

const formatValue = (value: number) => {
  if (value % 1 === 0) {
    return value.toString()
  }
  return value.toFixed(1)
}

const startCountAnimation = () => {
  if (hasAnimated.value || !project.value.metrics) return
  hasAnimated.value = true

  animatedValues.value = project.value.metrics.map(() => 0)

  const duration = 1500 // 1.5s animation duration
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Smooth ease-out quad deceleration
    const ease = progress * (2 - progress)

    if (project.value.metrics) {
      project.value.metrics.forEach((metric, index) => {
        const targetValue = metric.value
        animatedValues.value[index] = Number((targetValue * ease).toFixed(1))
      })
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Ensure exact final values
      if (project.value.metrics) {
        animatedValues.value = project.value.metrics.map(m => m.value)
      }
    }
  }

  requestAnimationFrame(animate)
}

let observer: IntersectionObserver | null = null

watch(() => project.value.id, () => {
  hasAnimated.value = false
  animatedValues.value = project.value.metrics ? project.value.metrics.map(() => 0) : []
  setTimeout(() => {
    if (metricsContainer.value && observer) {
      observer.unobserve(metricsContainer.value)
      observer.observe(metricsContainer.value)
    }
  }, 100)
})

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)

  // Initialize intersection observer for metrics
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCountAnimation()
      }
    })
  }, { threshold: 0.15 })

  if (metricsContainer.value) {
    observer.observe(metricsContainer.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="project-detail">
    <!-- Barre de progression -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <div class="container">
      <RouterLink to="/projects" class="back-link reveal">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>{{ t('projects.back_to_projects') }}</span>
      </RouterLink>

      <div :class="['project-header', 'reveal-up', purposeMap[project.purpose as ProjectPurpose]]">
        <div class="glow-orb"></div>
        
        <div class="header-main-content">
          <div class="title-wrapper">
            <h1 class="project-title">{{ project.name }}</h1>
            <span :class="['purpose-badge', purposeMap[project.purpose as ProjectPurpose]]">
              <svg v-if="project.purpose === 'Éducation'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              {{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose]) }}
            </span>
          </div>
          <p class="project-subtitle">{{ t(project.description) }}</p>
        </div>
      </div>

      <div class="project-content">
        <div class="main-section reveal-left">
          <ImageCarousel :images="project.images" :folder="project.folder" />

          <!-- Chiffres clés & Métriques -->
          <div
            v-if="project.metrics && project.metrics.length > 0"
            ref="metricsContainer"
            :class="['metrics-panel', 'glass-panel', 'reveal-up', purposeMap[project.purpose as ProjectPurpose]]"
          >
            <div class="metrics-panel-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h2-icon">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <h2>{{ t('projects.metrics.title') }}</h2>
            </div>
            
            <div class="metrics-grid">
              <div
                v-for="(metric, index) in project.metrics"
                :key="index"
                class="metric-card"
              >
                <div class="metric-visual">
                  <span class="metric-value gradient-text">
                    {{ animatedValues[index] !== undefined ? formatValue(animatedValues[index]) : 0 }}
                  </span>
                  <span class="metric-suffix">{{ metric.suffix }}</span>
                </div>
                <div class="metric-label">{{ t(metric.labelKey) }}</div>
              </div>
            </div>
          </div>

          <div class="description-section glass-panel">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h2-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              {{ t('projects.description') }}
            </h2>
            <p class="long-desc">{{ t(project.longDescription) }}</p>
          </div>

          <div v-if="project.context" class="description-section glass-panel">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h2-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              {{ t('projects.context') }}
            </h2>
            <p>{{ t(project.context) }}</p>
          </div>

          <div v-if="project.personalContribution" class="description-section glass-panel">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h2-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              {{ t('projects.personalContribution') }}
            </h2>
            <p>{{ t(project.personalContribution) }}</p>
          </div>

          <div class="features-section glass-panel">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h2-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              {{ t('projects.features') }}
            </h2>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature" class="reveal">
                <div class="bullet-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>{{ t(feature) }}</span>
              </li>
            </ul>
          </div>

          <ProjectEvolution
            v-if="project.groupId"
            :groupId="project.groupId"
            :currentProjectId="project.id"
          />
        </div>

        <aside class="sidebar reveal-right">
          <!-- Technologies Card -->
          <div class="info-card glass-card">
            <div class="card-title-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <h3>{{ t('projects.technologies') }}</h3>
            </div>
            <div class="tech-list">
              <TechBadge
                v-for="tech in project.tags"
                :key="tech"
                :tech="tech"
                :iconOnly="true"
              />
            </div>
          </div>

          <!-- Dynamic Duration Card -->
          <div v-if="project.duration || calculatedDuration" class="info-card glass-card duration-highlight-card">
            <div class="card-title-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon duration-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <h3>{{ t('projects.duration') }}</h3>
            </div>
            <div class="duration-display">
              <span class="duration-value" v-if="calculatedDuration">{{ calculatedDuration }}</span>
              <p class="duration-desc" v-if="project.duration && t(project.duration) !== project.duration">
                {{ t(project.duration) }}
              </p>
            </div>
          </div>

          <!-- Purpose Card -->
          <div class="info-card purpose-card glass-card" :class="purposeMap[project.purpose as ProjectPurpose]">
            <div class="card-icon">
              <svg v-if="project.purpose === 'Éducation'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="card-content">
              <h3>{{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose]) }}</h3>
              <p>{{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose] + '_desc') }}</p>
            </div>
          </div>

          <!-- Links Card -->
          <div v-if="(project.links.demo && project.links.demo !== '#') || (project.links.github && project.links.github !== '#')" class="info-card glass-card">
            <div class="card-title-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              <h3>{{ t('projects.links') }}</h3>
            </div>
            <div class="links">
              <a v-if="project.links.demo && project.links.demo !== '#'" :href="project.links.demo" class="btn btn-primary animate-btn" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>{{ t('projects.view_demo') }}</span>
              </a>
              <a v-if="project.links.github && project.links.github !== '#'" :href="project.links.github" class="btn btn-secondary animate-btn" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>{{ t('projects.source_code') }}</span>
              </a>
            </div>
          </div>

          <!-- Project Stats Card -->
          <div class="info-card glass-card stats-spec-card">
            <div class="card-title-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              <h3>{{ t('projects.stats.title') }}</h3>
            </div>
            <div class="stats-list">
              <div class="stat-item">
                <div class="stat-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-label">{{ t('projects.stats.start_date') }}</span>
                  <span class="stat-val">{{ project.startDate ? t(project.startDate) : t('projects.stats.unspecified') }}</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-label">{{ t('projects.stats.end_date') }}</span>
                  <span class="stat-val">{{ project.isOngoing ? t('projects.stats.ongoing') : (project.endDate ? t(project.endDate) : t('projects.stats.unspecified')) }}</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-label">{{ t('projects.stats.status') }}</span>
                  <span :class="['status-pill', project.isOngoing ? 'ongoing' : 'finished']">
                    {{ project.isOngoing ? t('projects.stats.ongoing') : t('projects.stats.finished') }}
                  </span>
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
  padding: 2.5rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 750;
  margin-bottom: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}

.back-link:hover {
  transform: translateX(-6px);
  color: var(--accent);
}

.back-icon {
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-2px);
}

/* Project Header Glass Panel Banner */
.project-header {
  margin-bottom: 3rem;
  position: relative;
  padding: 3.5rem 3rem;
  border-radius: 24px;
  background: rgba(var(--primary-rgb), 0.03);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  backdrop-filter: blur(16px);
  overflow: hidden;
  box-shadow: 
    var(--shadow-lg), 
    inset 0 0 20px rgba(255, 255, 255, 0.02);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode adjustments for header */
:root.dark .project-header {
  background: rgba(20, 20, 30, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
@media (prefers-color-scheme: dark) {
  :root:not(.light) .project-header {
    background: rgba(20, 20, 30, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}

/* Dynamic header purpose coloring */
.project-header.education {
  --theme-color: #3b82f6;
  --theme-color-rgb: 59, 130, 246;
  border-color: rgba(59, 130, 246, 0.15);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(139, 92, 246, 0.02) 100%);
}

.project-header.personnel {
  --theme-color: #10b981;
  --theme-color-rgb: 16, 185, 129;
  border-color: rgba(16, 185, 129, 0.15);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(59, 130, 246, 0.02) 100%);
}

.project-header.professionnel {
  --theme-color: #8b5cf6;
  --theme-color-rgb: 139, 92, 246;
  border-color: rgba(139, 92, 246, 0.15);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(236, 72, 153, 0.02) 100%);
}

/* Glow orb in header */
.glow-orb {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(var(--theme-color-rgb, var(--primary-rgb)), 0.3) 0%, rgba(var(--accent-rgb), 0.12) 60%, transparent 100%);
  filter: blur(45px);
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  animation: pulseGlow 8s infinite alternate ease-in-out;
}

@keyframes pulseGlow {
  0% { transform: scale(1) translate(0, 0); opacity: 0.8; }
  100% { transform: scale(1.35) translate(-25px, 25px); opacity: 1; }
}









.header-main-content {
  position: relative;
  z-index: 1;
}

.project-title {
  font-size: 3.2rem;
  font-weight: 850;
  line-height: 1.1;
  margin-bottom: 0.2rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--theme-color, var(--primary)) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  z-index: 1;
  position: relative;
}

.purpose-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.purpose-badge.education {
  background-color: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.purpose-badge.personnel {
  background-color: rgba(16, 185, 129, 0.08);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.purpose-badge.professionnel {
  background-color: rgba(139, 92, 246, 0.08);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.purpose-badge:hover {
  transform: scale(1.05);
}

.project-subtitle {
  font-size: 1.25rem;
  font-weight: 550;
  color: var(--color-text);
  opacity: 0.8;
  max-width: 800px;
  line-height: 1.5;
  z-index: 1;
  position: relative;
}

/* Grid Layout & Main content */
.project-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.description-section h2, 
.features-section h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: var(--color-heading);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.01em;
}

.h2-icon {
  color: var(--primary);
  opacity: 0.9;
}

.description-section p {
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.9;
  font-size: 1.05rem;
}

.long-desc {
  white-space: pre-line;
}

/* Features Grid List */
.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .features-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem;
  background: rgba(var(--primary-rgb), 0.02);
  border: 1px solid rgba(var(--primary-rgb), 0.05);
  border-radius: 12px;
  color: var(--color-text);
  transition: all 0.25s ease;
}

.features-list li:hover {
  background: rgba(var(--primary-rgb), 0.05);
  transform: translateX(4px);
  border-color: rgba(var(--primary-rgb), 0.15);
}

.bullet-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  flex-shrink: 0;
}

.features-list li span {
  font-size: 0.95rem;
  font-weight: 550;
  line-height: 1.4;
}

/* High-end glass containers */
.glass-panel {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.015),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.glass-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.035);
  border-color: rgba(var(--primary-rgb), 0.2);
}

:root.dark .glass-panel {
  background: rgba(28, 28, 40, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.18);
}
:root.dark .glass-panel:hover {
  border-color: rgba(var(--primary-rgb), 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}
@media (prefers-color-scheme: dark) {
  :root:not(.light) .glass-panel {
    background: rgba(28, 28, 40, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.18);
  }
  :root:not(.light) .glass-panel:hover {
    border-color: rgba(var(--primary-rgb), 0.3);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  }
}

/* Sidebar and Cards */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: sticky;
  top: calc(80px + 1.75rem);
}

.glass-card {
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.015),
    inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.035);
  border-color: rgba(var(--primary-rgb), 0.15);
}

:root.dark .glass-card {
  background: rgba(24, 24, 35, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
:root.dark .glass-card:hover {
  border-color: rgba(var(--primary-rgb), 0.25);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
}
@media (prefers-color-scheme: dark) {
  :root:not(.light) .glass-card {
    background: rgba(24, 24, 35, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  :root:not(.light) .glass-card:hover {
    border-color: rgba(var(--primary-rgb), 0.25);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  }
}

.glass-card h3 {
  font-size: 1.15rem;
  font-weight: 750;
  color: var(--color-heading);
  letter-spacing: -0.01em;
}

.card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(var(--primary-rgb), 0.08);
  padding-bottom: 0.75rem;
}

.title-icon {
  color: var(--primary);
  opacity: 0.85;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

/* Duration Highlight Card */
.duration-highlight-card {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.06) 0%, rgba(var(--accent-rgb), 0.03) 100%);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  box-shadow: 
    0 4px 20px rgba(var(--primary-rgb), 0.03),
    inset 0 0 15px rgba(var(--primary-rgb), 0.02);
}

.duration-icon {
  color: var(--primary);
  animation: rotateSlow 20s infinite linear;
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.duration-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.duration-value {
  font-size: 1.8rem;
  font-weight: 850;
  letter-spacing: -0.03em;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.duration-desc {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.85;
  font-weight: 550;
  margin-top: 0.15rem;
}

/* Purpose Card */
.purpose-card {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1.5rem;
}

.purpose-card .card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.purpose-card.education .card-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.purpose-card.personnel .card-icon {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.purpose-card.professionnel .card-icon {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.purpose-card h3 {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
  font-weight: 750;
}

.purpose-card p {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-text);
  opacity: 0.8;
}

.purpose-card:hover .card-icon {
  transform: scale(1.1) rotate(-5deg);
}

.purpose-card.education:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);
}

.purpose-card.personnel:hover {
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.1);
}

.purpose-card.professionnel:hover {
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.1);
}

/* Links card */
.links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  box-shadow: var(--shadow-sm);
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.45);
}

.btn-secondary {
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  color: var(--color-heading);
}

.btn-secondary:hover {
  background: rgba(var(--primary-rgb), 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.1);
}

.animate-btn svg {
  transition: transform 0.3s ease;
}

.animate-btn:hover svg {
  transform: scale(1.1) translateX(2px);
}

/* Stats Spec Card */
.stats-spec-card {
  background: rgba(255, 255, 255, 0.45);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem;
  border-radius: 12px;
  background: rgba(var(--primary-rgb), 0.02);
  border: 1px solid rgba(var(--primary-rgb), 0.04);
  transition: all 0.25s ease;
}

.stat-item:hover {
  background: rgba(var(--primary-rgb), 0.05);
  border-color: rgba(var(--primary-rgb), 0.1);
  transform: translateX(3px);
}

.stat-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon-box {
  background: var(--primary);
  color: white;
  transform: scale(1.05);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-grow: 1;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 750;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.65;
  letter-spacing: 0.05em;
}

.stat-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-heading);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}

.status-pill.ongoing {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.25);
}

.status-pill.finished {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

/* Modal Competencies & Cards */










:root.dark 
@media (prefers-color-scheme: dark) {
  :root:not(.light) 
}





:root.dark 
@media (prefers-color-scheme: dark) {
  :root:not(.light) 
}















/* Metrics section style */
.metrics-panel {
  padding: 2.2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 20px;
  background: rgba(var(--primary-rgb), 0.02);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

:root.dark .metrics-panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

.metrics-panel.education {
  --theme-color: #3b82f6;
  --theme-color-rgb: 59, 130, 246;
}

.metrics-panel.personnel {
  --theme-color: #10b981;
  --theme-color-rgb: 16, 185, 129;
}

.metrics-panel.professionnel {
  --theme-color: #8b5cf6;
  --theme-color-rgb: 139, 92, 246;
}

.metrics-panel::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(var(--theme-color-rgb, var(--primary-rgb)), 0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.metrics-panel-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.8rem;
  position: relative;
  z-index: 1;
}

.metrics-panel-title h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.metrics-panel-title svg {
  color: var(--theme-color, var(--primary));
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: rgba(var(--primary-rgb), 0.03);
  border: 1px solid rgba(var(--primary-rgb), 0.08);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

:root.dark .metric-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.metric-card:hover {
  transform: translateY(-5px);
  background: rgba(var(--primary-rgb), 0.06);
  border-color: rgba(var(--theme-color-rgb, var(--primary-rgb)), 0.25);
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.1);
}

:root.dark .metric-card:hover {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3);
}

.metric-visual {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--color-heading) 30%, rgba(var(--theme-color-rgb, var(--primary-rgb)), 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metric-suffix {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--theme-color, var(--primary));
  margin-left: 0.15rem;
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted, #8e8e93);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .metrics-panel {
    padding: 1.5rem;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .metric-value {
    font-size: 2.2rem;
  }
  
  .metric-suffix {
    font-size: 1.1rem;
  }
}

/* Responsiveness adjustments */
@media (max-width: 1024px) {
  .project-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .project-detail {
    padding: 1.5rem 1rem;
  }
  
  .project-header {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
  
  
  
  .project-title {
    font-size: 2.3rem;
  }
  
  .project-subtitle {
    font-size: 1.1rem;
  }
}
</style>
