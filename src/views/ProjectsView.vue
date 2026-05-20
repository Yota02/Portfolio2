<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects, categoryOrder, getProjectsByCategory, type ProjectCategory, type Project, categoryMap } from '@/data/projects'
import TechBadge from '@/components/TechBadge.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const { t } = useI18n()

const groupedProjects = computed(() => {
  const allProjects = getProjectsByCategory()
  if (selectedTechs.value.length === 0) {
    return allProjects
  }
  const filtered: Record<ProjectCategory, Project[]> = {} as Record<ProjectCategory, Project[]>
  for (const category of categoryOrder) {
    filtered[category] = allProjects[category].filter(project =>
      selectedTechs.value.every(tech => project.tags.includes(tech))
    )
  }
  return filtered
})

// Calculer les technologies uniques à partir des projets affichés
const uniqueTechnologies = computed(() => {
  const filteredProjects = selectedTechs.value.length === 0
    ? projects
    : projects.filter(project => selectedTechs.value.every(tech => project.tags.includes(tech)))
  const allTags = filteredProjects.flatMap(project => project.tags)
  return [...new Set(allTags)]
})

// État pour le repli de la sidebar
const isCollapsed = ref(false)

// État pour les technologies sélectionnées
const selectedTechs = ref<string[]>([])

// Nouvelle propriété calculée pour le nombre total de projets
const totalProjects = computed(() => projects.length)

// Fonction pour basculer la sélection d'une technologie
const toggleTech = (tech: string) => {
  const index = selectedTechs.value.indexOf(tech)
  if (index > -1) {
    selectedTechs.value.splice(index, 1)
  } else {
    selectedTechs.value.push(tech)
  }
}
</script>

<template>
  <div class="projects-page">
    <div class="layout-container">
      <aside class="tech-sidebar" :class="{ collapsed: isCollapsed }">
        <div class="sidebar-header">
          <h3 v-if="!isCollapsed" class="sidebar-title">{{ t('projects.technologies') }}</h3>
          <button @click="isCollapsed = !isCollapsed" class="collapse-btn">
            <svg class="arrow" :class="{ rotated: isCollapsed }" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div v-if="!isCollapsed" class="tech-icons">
          <TechBadge
            v-for="tech in uniqueTechnologies"
            :key="tech"
            :tech="tech"
            :iconOnly="true"
            :active="selectedTechs.includes(tech)"
            @click="toggleTech(tech)"
          />
        </div>
      </aside>

      <main class="main-content">
        <div class="container">
          <div class="header">
            <h1 class="page-title">{{ t('projects.title') }} ({{ totalProjects }})</h1>
            <RouterLink to="/competencies" class="competencies-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              {{ t('projects.view_competencies') }}
            </RouterLink>
          </div>

          <div
            v-for="category in categoryOrder"
            :key="category"
            class="category-section"
          >
            <template v-if="groupedProjects[category] && groupedProjects[category].length > 0">
              <h2 class="category-title">{{ t('projects.categories.' + categoryMap[category]) }} ({{ groupedProjects[category].length }})</h2>

              <div class="projects-grid">
                <ProjectCard
                  v-for="project in groupedProjects[category]"
                  :key="project.id"
                  :project="project"
                />
              </div>
            </template>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 80vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, transparent 0%, var(--color-background-mute) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  position: relative;
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
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

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(var(--primary-rgb), 0.2);
}

.competencies-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
  margin-top: 0;
  z-index: 10;
}

.competencies-btn:hover {
  transform: translateY(calc(-50% - 2px));
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.competencies-btn svg {
  transition: transform 0.3s ease;
}

.competencies-btn:hover svg {
  transform: scale(1.1);
}

.category-section {
  margin-bottom: 5rem;
  animation: fadeInUp 0.8s ease-out backwards;
}

.category-section:nth-child(1) { animation-delay: 0.1s; }
.category-section:nth-child(2) { animation-delay: 0.2s; }
.category-section:nth-child(3) { animation-delay: 0.3s; }

.category-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2.5rem;
  padding-bottom: 0.75rem;
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: 2px;
}

.category-title::before {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--primary) 100%);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.category-section:hover .category-title::before {
  width: 100%;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.layout-container {
  display: flex;
  min-height: 80vh;
}

.tech-sidebar {
  width: 250px;
  background: var(--color-background);
  border-right: 1px solid var(--color-border);
  padding: 2rem 1rem;
  position: sticky;
  margin-top: 10rem;
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  animation: fadeInLeft 0.6s ease-out;
  border-radius: 15px;
  margin-right: 1rem;
  transition: width 0.3s ease, padding 0.3s ease;
}

.tech-sidebar.collapsed {
  width: 60px;
  padding: 1rem 0.5rem;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.collapse-btn:hover {
  color: var(--primary);
}

.arrow {
  transition: transform 0.3s ease;
  color: var(--color-text);
}

.arrow.rotated {
  transform: rotate(180deg);
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  justify-items: center;
  transition: opacity 0.3s ease;
}

.tech-sidebar.collapsed .tech-icons {
  opacity: 0;
  pointer-events: none;
}

.main-content {
  flex: 1;
  padding-left: 2rem;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .header {
    flex-direction: column;
    justify-content: center;
  }

  .competencies-btn {
    position: static;
    transform: none;
    margin-top: 1.5rem;
    width: auto;
    font-size: 0.8rem;
    padding: 0.6rem 1.2rem;
  }

  .competencies-btn:hover {
    transform: translateY(-2px);
  }

  .category-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .tech-sidebar {
    padding: 1rem 1.5rem;
    border-radius: 10px;
    border-bottom: 1px solid var(--color-border);
    border-right: none;
    position: static;
    height: auto;
    width: 100%;
  }

  .tech-sidebar.collapsed {
    margin-bottom: 2rem;
  }

  .main-content {
    padding-left: 0;
    padding-top: 2rem;
  }
}
</style>
