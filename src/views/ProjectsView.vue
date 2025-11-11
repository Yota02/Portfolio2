<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, categoryOrder, getProjectsByCategory, type ProjectCategory } from '@/data/projects'

const groupedProjects = computed(() => getProjectsByCategory())

// Fonction pour limiter les tags affichés
const getDisplayedTags = (tags: string[], maxTags: number = 3) => {
  const displayed = tags.slice(0, maxTags)
  const remaining = tags.length - maxTags
  return { displayed, remaining }
}
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <div class="header">
        <h1 class="page-title">Mes Projets</h1>
      </div>

      <div 
        v-for="category in categoryOrder" 
        :key="category" 
        class="category-section"
      >
        <template v-if="groupedProjects[category] && groupedProjects[category].length > 0">
          <h2 class="category-title">{{ category }}</h2>
          
          <div class="projects-grid">
            <RouterLink 
              v-for="project in groupedProjects[category]" :key="project.id"
              :to="{ name: 'project-detail', params: { id: project.id } }"
              class="project-card"
            >
              <div class="card-image-container">
                <img
                  :src="project.logo.startsWith('http') ? project.logo : `/Portfolio2/projet/${project.folder}/${project.logo}`"
                  :alt="`Logo du projet ${project.name}`"
                  class="card-image"
                  loading="lazy"
                />
              </div>
              
              <div class="card-info-badges">
                <span class="badge purpose-badge">{{ project.purpose }}</span>
              </div>
              
              <h2 class="card-title">{{ project.name }}</h2>
              
              <div class="card-tags">
                <span 
                  v-for="tag in getDisplayedTags(project.tags).displayed" 
                  :key="tag" 
                  class="tag"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="getDisplayedTags(project.tags).remaining > 0" 
                  class="tag tag-more"
                >
                  +{{ getDisplayedTags(project.tags).remaining }}
                </span>
              </div>
              
              <div class="card-footer">
                <span class="link-text">Voir le projet →</span>
              </div>
            </RouterLink>
          </div>
        </template>
      </div>
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
  text-align: center;
  margin-bottom: 4rem;
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

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

/* --- NOUVEAUX STYLES POUR LES SECTIONS --- */

/* AJOUT: Conteneur pour une zone de catégorie (Titre + Grille) */
.category-section {
  margin-bottom: 5rem;
  animation: fadeInUp 0.8s ease-out backwards;
}

.category-section:nth-child(1) { animation-delay: 0.1s; }
.category-section:nth-child(2) { animation-delay: 0.2s; }
.category-section:nth-child(3) { animation-delay: 0.3s; }

/* AJOUT: Titre de la catégorie (ex: "Dev Web", "IA") */
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

.project-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.6s ease-out backwards;
  overflow: hidden;
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  border-radius: 20px;
}

.project-card > * {
  position: relative;
  z-index: 1;
}

.project-card:nth-child(1) { animation-delay: 0.1s; }
.project-card:nth-child(2) { animation-delay: 0.15s; }
.project-card:nth-child(3) { animation-delay: 0.2s; }
.project-card:nth-child(4) { animation-delay: 0.25s; }
.project-card:nth-child(5) { animation-delay: 0.3s; }
.project-card:nth-child(6) { animation-delay: 0.35s; }

.project-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: transparent;
}

.project-card:hover::before {
  opacity: 0.03;
}

.card-image-container {
  margin: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
  position: relative;
}

.card-image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .card-image-container::after {
  opacity: 1;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.project-card:hover .card-image {
  transform: scale(1.08);
}

.card-info-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: 0;
  z-index: 2;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.category-badge {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);
}

.project-card:hover .category-badge {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.4);
}

.purpose-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 1rem 2rem 0.75rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.project-card:hover .card-title {
  transform: translateX(5px);
}

.card-description {
  color: var(--color-text);
  opacity: 0.7;
  line-height: 1.7;
  margin: 0 2rem 1.5rem 2rem;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 2rem 1.5rem 2rem;
}

.tag {
  padding: 0.4rem 0.85rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.project-card:hover .tag {
  transform: translateY(-2px);
  border-color: var(--primary);
}

.tag-more {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  border: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);
}

.card-footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  background: var(--color-background-soft);
  transition: background 0.3s ease;
}

.project-card:hover .card-footer {
  background: transparent;
}

.link-text {
  color: var(--primary);
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.link-text::after {
  content: '→';
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .link-text {
  color: var(--accent);
}

.project-card:hover .link-text::after {
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .projects-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }
  
  .category-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
 
  .project-card {
    border-radius: 16px;
  }
  
  .card-image-container {
    border-radius: 16px 16px 0 0;
  }
  
  .card-info-badges {
    top: 0.75rem;
    right: 0.75rem;
  }
  
  .purpose-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
  
  .card-title,
  .card-description,
  .card-tags {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  
  .card-footer {
    padding: 1rem 1.5rem;
  }
}
</style>