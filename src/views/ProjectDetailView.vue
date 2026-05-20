<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectById, purposeMap, type ProjectPurpose } from '@/data/projects'
import { categoryColors, categoryKeyMap, getBgColor, parseAC } from '@/utils/competencies'
import TechBadge from '@/components/TechBadge.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import BaseModal from '@/components/BaseModal.vue'
import ProjectEvolution from '@/components/ProjectEvolution.vue'

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
    competencies: [],
    category: 'Logiciel',
    purpose: 'Personnel' as ProjectPurpose,
    context: '',
    personalContribution: '',
    duration: '',
    newTech: [],
    logo: ''
  }
})

const showCompetencies = ref(false)

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
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
        <div class="title-wrapper">
          <h1 class="project-title">{{ project.name }}</h1>
          <span :class="['purpose-badge', purposeMap[project.purpose as ProjectPurpose]]">
            <svg v-if="project.purpose === 'Éducation'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose]) }}
          </span>
        </div>
        <p class="project-subtitle">{{ t(project.description) }}</p>
      </div>

      <div class="project-content">
        <div class="main-section reveal-left">
          <ImageCarousel :images="project.images" :folder="project.folder" />

          <div class="description-section">
            <h2>{{ t('projects.description') }}</h2>
            <p>{{ t(project.longDescription) }}</p>
          </div>

          <div v-if="project.context" class="description-section">
            <h2>{{ t('projects.context') }}</h2>
            <p>{{ t(project.context) }}</p>
          </div>

          <div v-if="project.personalContribution" class="description-section">
            <h2>{{ t('projects.personalContribution') }}</h2>
            <p>{{ t(project.personalContribution) }}</p>
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

          <ProjectEvolution
            v-if="project.groupId"
            :groupId="project.groupId"
            :currentProjectId="project.id"
          />
        </div>

        <aside class="sidebar reveal-right">
          <div class="info-card">
            <h3>{{ t('projects.technologies') }}</h3>
            <div class="tech-list">
              <TechBadge
                v-for="tech in project.tags"
                :key="tech"
                :tech="tech"
                :iconOnly="true"
              />
            </div>
          </div>

          <div v-if="project.duration" class="info-card">
            <h3>{{ t('projects.duration') }}</h3>
            <p>{{ t(project.duration) }}</p>
          </div>

          <div class="info-card purpose-card" :class="purposeMap[project.purpose as ProjectPurpose]">
            <div class="card-icon">
              <svg v-if="project.purpose === 'Éducation'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="card-content">
              <h3>{{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose]) }}</h3>
              <p>{{ t('projects.purposes.' + purposeMap[project.purpose as ProjectPurpose] + '_desc') }}</p>
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

    <BaseModal :isOpen="showCompetencies" @close="showCompetencies = false">
      <template #header>
        <h2>{{ t('competencies.title') }}</h2>
      </template>
      <template #body>
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
                  <div class="ac-content">
                    <span v-if="parseAC(t(item)).id" class="ac-id-badge" :style="{ backgroundColor: getBgColor(comp.category), color: categoryColors[comp.category] }">
                      {{ parseAC(t(item)).id }}
                    </span>
                    <span class="ac-label">{{ parseAC(t(item)).name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
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
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.purpose-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.purpose-badge.education {
  background-color: var(--color-background);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.purpose-badge.personnel {
  background-color: var(--color-background);
  color: #10b981;
  border: 1px solid #10b981;
}

.purpose-badge.professionnel {
  background-color: var(--color-background);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
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

.description-section h2, .features-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-heading); }
.description-section p { line-height: 1.8; color: var(--color-text); opacity: 0.8; }
.features-list { list-style: none; padding: 0; }
.features-list li { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); color: var(--color-text); }
.features-list li svg { color: var(--primary); flex-shrink: 0; }

.info-card { background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); }
.info-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-heading); }
.tech-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.purpose-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.purpose-card .card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.purpose-card.education .card-icon {
  background-color: var(--color-background);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.purpose-card.personnel .card-icon {
  background-color: var(--color-background);
  color: #10b981;
  border: 1px solid #10b981;
}

.purpose-card.professionnel .card-icon {
  background-color: var(--color-background);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.purpose-card h3 {
  margin-bottom: 0.25rem;
}

.purpose-card p {
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.8;
}

.purpose-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.purpose-card.education:hover {
  border-color: #3b82f6;
}

.purpose-card.personnel:hover {
  border-color: #10b981;
}

.purpose-card.professionnel:hover {
  border-color: #8b5cf6;
}

.stats-list { display: grid; gap: 1rem; }
.stat-item { display: flex; align-items: center; gap: 0.75rem; color: var(--color-text); }
.stat-item svg { color: var(--primary); }

.modal-intro { margin-bottom: 2rem; color: var(--color-text); opacity: 0.8; font-size: 1.1rem; }

.competencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.competency-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--primary);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.card-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comp-category { font-weight: 700; font-size: 0.95rem; line-height: 1.2; flex: 1; padding-right: 1rem; }
.comp-level { font-size: 0.8rem; font-weight: 600; opacity: 0.7; white-space: nowrap; }

.card-body { padding: 1.5rem; }

.ac-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }

.ac-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
}

.check-icon { margin-top: 0.2rem; flex-shrink: 0; }

.ac-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ac-id-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  width: fit-content;
  letter-spacing: 0.05em;
}

.ac-label {
  font-weight: 500;
  color: var(--color-text);
}

@media (max-width: 1024px) {
  .project-content { grid-template-columns: 1fr; }
  .project-title { padding-right: 0; font-size: 2.2rem; }
}

@media (max-width: 768px) {
  .but-badge-btn { position: static; margin-bottom: 1rem; }
}
</style>
