<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, type Competency, type Project } from '@/data/projects'

const categoryColors: Record<string, string> = {
  'Réaliser': '#3b82f6',
  'Optimiser': '#8b5cf6',
  'Administrer': '#10b981',
  'Gérer': '#f59e0b',
  'Conduire': '#ef4444',
  'Collaborer': '#ec4899'
}

interface CompetencyWithProjects extends Competency {
  projects: Project[]
}

// Regrouper toutes les compétences par catégorie
const competenciesByCategory = computed(() => {
  const grouped: Record<string, CompetencyWithProjects[]> = {}

  // Parcourir tous les projets
  projects.forEach(project => {
    if (!project.competencies) return

    project.competencies.forEach(comp => {
      grouped[comp.category] = grouped[comp.category] || []

      // Chercher si cette compétence existe déjà
      let existingComp = grouped[comp.category]!.find(
        c => c.level === comp.level && JSON.stringify(c.items) === JSON.stringify(comp.items)
      )

      if (!existingComp) {
        existingComp = {
          ...comp,
          projects: []
        }
        grouped[comp.category]!.push(existingComp)
      }

      // Ajouter le projet si pas déjà présent
      if (!existingComp.projects.find(p => p.id === project.id)) {
        existingComp.projects.push(project)
      }
    })
  })

  return grouped
})

const categoryOrder = ['Réaliser', 'Optimiser', 'Administrer', 'Gérer', 'Conduire', 'Collaborer']

const getBgColor = (category: string) => {
  const color = categoryColors[category] || '#ccc'
  return `${color}15`
}

const getProjectLogo = (project: Project) => {
  const logo = project.logo_recadrer || project.logo
  return logo.startsWith('http') ? logo : `/Portfolio2/projet/${project.folder}/${logo}`
}
</script>

<template>
  <div class="competencies-page">
    <div class="container">
      <div class="header">
        <h1 class="page-title">Compétences du BUT Informatique</h1>
        <p class="page-subtitle">
          Découvrez toutes les compétences développées à travers mes projets
        </p>
      </div>

      <div class="categories-container">
        <div
          v-for="category in categoryOrder"
          :key="category"
          v-show="competenciesByCategory[category] && competenciesByCategory[category].length > 0"
          class="category-section"
        >
          <div class="category-header" :style="{ borderLeftColor: categoryColors[category] }">
            <h2 class="category-title" :style="{ color: categoryColors[category] }">
              {{ category }}
            </h2>
            <span class="competency-count">
              {{ competenciesByCategory[category]?.length || 0 }} compétence(s)
            </span>
          </div>

          <div class="competencies-grid">
            <div
              v-for="(comp, index) in (competenciesByCategory[category] || [])"
              :key="index"
              class="competency-card"
              :style="{ borderTopColor: categoryColors[category] }"
            >
              <div class="card-header" :style="{ backgroundColor: getBgColor(category) }">
                <span class="comp-level" :style="{ color: categoryColors[category] }">
                  {{ comp.level }}
                </span>
                <span class="projects-badge">
                  {{ comp.projects.length }} projet(s)
                </span>
              </div>

              <div class="card-body">
                <ul class="ac-list">
                  <li v-for="item in comp.items" :key="item">
                    <svg
                      class="check-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      :style="{ color: categoryColors[category] }"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>

                <div class="projects-section">
                  <h4 class="projects-title">Projets associés :</h4>
                  <div class="projects-list">
                    <RouterLink
                      v-for="project in comp.projects"
                      :key="project.id"
                      :to="{ name: 'project-detail', params: { id: project.id } }"
                      class="project-chip"
                      :title="project.name"
                    >
                      <img
                        :src="getProjectLogo(project)"
                        :alt="project.name"
                        class="project-logo"
                      />
                      <span>{{ project.name }}</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/projects" class="back-to-projects-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        Projets
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.competencies-page {
  min-height: 80vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, transparent 0%, var(--color-background-mute) 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease-out;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.category-section {
  animation: fadeInUp 0.8s ease-out backwards;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: var(--color-background);
  border-left: 4px solid;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.category-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.competency-count {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.competencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.competency-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-top-width: 4px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.competency-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.card-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.comp-level {
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.projects-badge {
  font-size: 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.card-body {
  padding: 1.5rem;
}

.ac-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.ac-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text);
}

.ac-list li:last-child {
  margin-bottom: 0;
}

.check-icon {
  margin-top: 3px;
  flex-shrink: 0;
}

.projects-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.projects-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
}

.projects-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-chip:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.project-logo {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
}

.back-to-projects-btn {
  position: fixed;
  top: 6rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-projects-btn:hover {
  background: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
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
  .competencies-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.5rem;
  }

  .competencies-grid {
    grid-template-columns: 1fr;
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
