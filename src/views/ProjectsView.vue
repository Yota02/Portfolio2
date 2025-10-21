<script setup lang="ts">
// AJOUT: Importer 'computed' de Vue
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// --- (Vos interfaces ProjectCategory, ProjectPurpose, et Project sont inchangées) ---
type ProjectCategory = 'IA' | 'Dev Web' | 'Logiciel' | 'Jeux Vidéo'
type ProjectPurpose = 'Éducation' | 'Personnel'

interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  image: string
  category: ProjectCategory
  purpose: ProjectPurpose
}

const projects: Project[] = [
  { 
    id: 'project-1', 
    name: 'Mon Premier Projet',
    description: 'Application web moderne développée avec Vue.js et TypeScript',
    tags: ['Vue.js', 'TypeScript', 'Vite'],
    image: 'https://picsum.photos/seed/project1/600/400',
    category: 'Dev Web',
    purpose: 'Personnel'
  },
  { 
    id: 'project-2', 
    name: 'Mon Deuxième Projet',
    description: 'Site e-commerce avec gestion complète des produits',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    image: 'https://picsum.photos/seed/project2/600/400',
    category: 'Dev Web',
    purpose: 'Éducation'
  },
  { 
    id: 'project-3', 
    name: 'Mon Troisième Projet',
    description: 'Jeu vidéo interactif créé avec Unity et C#',
    tags: ['Unity', 'C#', 'Jeux'],
    image: 'https://picsum.photos/seed/project3/600/400',
    category: 'Jeux Vidéo',
    purpose: 'Éducation'
  },
  // CORRECTION: J'ai corrigé l'ID et le nom dupliqués pour éviter les erreurs
  { 
    id: 'project-4', 
    name: 'Mon Quatrième Projet',
    description: 'Agent IA pour un jeu de stratégie',
    tags: ['Python', 'IA', 'Reinforcement Learning'],
    image: 'https://picsum.photos/seed/project4/600/400',
    category: 'IA',
    purpose: 'Éducation'
  }
]

// AJOUT: Un tableau pour définir l'ordre d'affichage des catégories
const categoryOrder: ProjectCategory[] = ['Dev Web', 'IA', 'Jeux Vidéo', 'Logiciel']

// AJOUT: Une propriété calculée pour grouper les projets par catégorie
const groupedProjects = computed(() => {
  // On utilise 'reduce' pour transformer le tableau plat en objet groupé
  return projects.reduce((groups, project) => {
    const category = project.category
    
    // Si la clé pour cette catégorie n'existe pas, on la crée
    if (!groups[category]) {
      groups[category] = []
    }
    
    // On ajoute le projet au tableau de sa catégorie
    groups[category].push(project)
    
    return groups
  }, {} as Record<ProjectCategory, Project[]>) // On type l'objet résultant
})
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
                  :src="project.image" 
                  :alt="`Aperçu du projet ${project.name}`" 
                  class="card-image"
                  loading="lazy"
                />
              </div>
              
              <div class="card-info-badges">
                <span class="badge category-badge">{{ project.category }}</span>
                <span class="badge purpose-badge">{{ project.purpose }}</span>
              </div>
              
              <h2 class="card-title">{{ project.name }}</h2>
              <p class="card-description">{{ project.description }}</p>
              
              <div class="card-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
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
/* ... (Tous vos styles existants de .projects-page à .page-subtitle) ... */
.projects-page {
  min-height: 80vh;
  padding: 4rem 2rem;
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
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

/* --- NOUVEAUX STYLES POUR LES SECTIONS --- */

/* AJOUT: Conteneur pour une zone de catégorie (Titre + Grille) */
.category-section {
  margin-bottom: 4.5rem; /* Espace entre les différentes catégories */
}

/* AJOUT: Titre de la catégorie (ex: "Dev Web", "IA") */
.category-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--primary);
  display: inline-block; /* Pour que la bordure ne prenne pas toute la largeur */
}

/* --- FIN DES NOUVEAUX STYLES --- */


.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.6s ease-out backwards;
  overflow: hidden; 
}

/* ... (Le reste de vos styles .project-card:nth-child, .project-card:hover, etc. sont inchangés et restent valides) ... */
.project-card:nth-child(1) { animation-delay: 0.1s; }
.project-card:nth-child(2) { animation-delay: 0.2s; }
.project-card:nth-child(3) { animation-delay: 0.3s; }
.project-card:nth-child(4) { animation-delay: 0.4s; }

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary);
  background: var(--color-background-soft, var(--color-background));
}

.card-image-container {
  margin: -2rem -2rem 1.5rem -2rem; 
  width: calc(100% + 4rem);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 16px 16px 0 0; 
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.4s ease-out;
}

.project-card:hover .card-image {
  transform: scale(1.05);
}

.card-info-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem; 
}

.badge {
  padding: 0.25rem 0.65rem; 
  border-radius: 8px; 
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-badge {
  background: var(--primary);
  color: white; 
}

.purpose-badge {
  background: var(--color-background-soft);
  color: var(--color-text);
  opacity: 0.9;
  border: 1px solid var(--color-border);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  margin-bottom: 0.75rem; 
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-description {
  color: var(--color-text);
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.375rem 0.75rem;
  background: var(--color-background-soft);
  border-radius: 20px; 
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid var(--color-border);
}

.card-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.link-text {
  color: var(--primary);
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-card:hover .link-text {
  transform: translateX(5px);
  display: inline-block;
  color: var(--accent);
}

@media (max-width: 768px) {
  .projects-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }
  
  /* AJOUT: Responsive pour le titre de catégorie */
  .category-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
 
  .project-card {
    padding: 1.5rem;
  }
  .card-image-container {
    width: calc(100% + 3rem);
    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  }
}
</style>