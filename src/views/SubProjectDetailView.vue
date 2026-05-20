<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectById } from '@/data/projects'
import ImageCarousel from '@/components/ImageCarousel.vue'

const { t } = useI18n()
const route = useRoute()
const projectId = route.params.projectId as string
const subId = route.params.subId as string

const project = computed(() => getProjectById(projectId))
const subProject = computed(() => project.value?.subProjects?.find(sub => sub.id === subId))
</script>

<template>
  <div class="sub-project-detail">
    <div class="container">
      <RouterLink to="/projects" class="back-link">{{ t('projects.back_to_projects') }}</RouterLink>

      <div v-if="subProject" class="sub-project-header">
        <h1 class="sub-project-title">{{ subProject.name }}</h1>
        <p class="sub-project-subtitle">{{ t(subProject.description) }}</p>
      </div>

      <div v-if="subProject" class="sub-project-content">
        <div class="main-section">
          <!-- Carrousel d'images -->
          <ImageCarousel :images="subProject.images" :folder="project?.folder || ''" />

          <!-- Fonctionnalités -->
          <div class="features-section">
            <h2>{{ t('projects.features') }}</h2>
            <ul class="features-list">
              <li v-for="feature in subProject.features" :key="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ t(feature) }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="error">
        <p>{{ t('projects.subproject_not_found') }}</p>
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
  text-decoration: none;
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

.features-section {
  margin-top: 2rem;
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

.features-list li svg {
  color: var(--primary);
  flex-shrink: 0;
}

.features-list li:last-child {
  border-bottom: none;
}

.error {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text);
  opacity: 0.7;
}
</style>
