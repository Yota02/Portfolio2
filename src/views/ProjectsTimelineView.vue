<template>
  <div class="timeline-container">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <header class="header-section">
        <h1 class="title">Timeline des Projets</h1>
        <p class="subtitle">Évolution de mes projets et technologies déployées</p>
        <div class="title-underline"></div>
      </header>

      <div class="timeline-wrapper">
        <!-- Ligne verticale centrale -->
        <div class="timeline-line"></div>

        <!-- Items de la timeline -->
        <div class="timeline-items">
          <div
            v-for="(project, index) in sortedProjects"
            :key="project.id"
            class="timeline-row"
            :class="index % 2 === 0 ? 'row-left' : 'row-right'"
          >
            <!-- Contenu de la carte -->
            <div class="timeline-content">
              <div class="project-card" :class="{ 'ongoing-card': project.isOngoing }">
                <!-- En-tête de la carte -->
                <div class="card-header">
                  <div class="date-badge">
                    <Calendar class="w-3.5 h-3.5" />
                    <span>{{ project.startDate || 'Date inconnue' }}{{ project.endDate ? ` - ${project.endDate}` : '' }}</span>
                  </div>
                  <span v-if="project.isOngoing" class="status-badge">En cours</span>
                </div>

                <!-- Corps de la carte -->
                <div class="card-body">
                  <div class="logo-wrapper">
                    <img
                      v-if="project.logo"
                      :src="project.logo.startsWith('http') ? project.logo : `${baseUrl}projet/${project.folder}/${project.logo}`"
                      :alt="`Logo de ${project.name}`"
                      class="project-logo"
                    />
                  </div>
                  <div class="text-wrapper">
                    <h3 class="project-name">{{ project.name }}</h3>
                    <p class="project-category">{{ project.category }}</p>
                    <p class="project-description">{{ project.description }}</p>
                  </div>
                </div>

                <!-- Technologies Apprises (Points forts) -->
                <div v-if="project.newTech && project.newTech.length > 0" class="new-tech-section">
                  <h4 class="section-label">Nouveautés :</h4>
                  <div class="tech-tags">
                    <span
                      v-for="tech in project.newTech"
                      :key="tech"
                      class="tech-tag new-tech"
                    >
                      <img
                        v-if="techIconMap[tech]"
                        :src="`${baseUrl}icone/${techIconMap[tech]}.png`"
                        :alt="tech"
                        class="tech-icon"
                      />
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Toutes les technos -->
                <div class="all-tech-section">
                  <div class="tech-tags">
                    <span
                      v-for="tech in project.tags.filter(t => !project.newTech.includes(t))"
                      :key="tech"
                      class="tech-tag"
                    >
                      <img
                        v-if="techIconMap[tech]"
                        :src="`${baseUrl}icone/${techIconMap[tech]}.png`"
                        :alt="tech"
                        class="tech-icon"
                      />
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Pied de carte -->
                <div class="card-footer">
                  <RouterLink
                    :to="{ name: 'project-detail', params: { id: project.id } }"
                    class="details-link"
                  >
                    Voir les détails <span>→</span>
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- Point central (Icône de catégorie) -->
            <div class="timeline-dot-wrapper">
              <div class="dot-ring" :class="{ 'ring-pulse': project.isOngoing }"></div>
              <div class="dot-inner" :class="[getCategoryClass(project.category), { 'ongoing-dot': project.isOngoing }]">
                <component :is="getProjectIcon(project.category)" class="dot-icon" />
              </div>
            </div>

            <!-- Espace vide pour l'équilibre desktop -->
            <div class="timeline-spacer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects, techIconMap } from '@/data/projects'
import { GraduationCap, Briefcase, Target, Calendar, Code, Gamepad2, Cpu } from 'lucide-vue-next'

const { t } = useI18n()

const baseUrl = import.meta.env.BASE_URL

// Mapping des mois français pour le tri
const monthMap: Record<string, number> = {
  'Janvier': 1, 'Février': 2, 'Mars': 3, 'Avril': 4, 'Mai': 5, 'Juin': 6,
  'Juillet': 7, 'Août': 8, 'Septembre': 9, 'Octobre': 10, 'Novembre': 11, 'Décembre': 12
}

const getSortKey = (date: string | undefined) => {
  if (!date) return 0
  const parts = date.split(' ')
  if (parts.length !== 2) return 0
  const monthKey = parts[0] as keyof typeof monthMap
  const month = monthMap[monthKey]
  const year = parseInt(parts[1]!)
  if (!month || isNaN(year)) return 0
  return year * 100 + month
}

const getSortKeyForProject = (project: any) => {
  const date = (!project.isOngoing && project.endDate) ? project.endDate : project.startDate
  return getSortKey(date)
}

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => getSortKeyForProject(b) - getSortKeyForProject(a))
})

const getProjectIcon = (category: string) => {
  switch (category) {
    case 'Dev Web': return Code
    case 'IA': return Cpu
    case 'Jeux Vidéo': return Gamepad2
    case 'Logiciel': return Briefcase
    default: return Target
  }
}

const getCategoryClass = (category: string) => {
  switch (category) {
    case 'Dev Web': return 'cat-web'
    case 'IA': return 'cat-ia'
    case 'Jeux Vidéo': return 'cat-game'
    case 'Logiciel': return 'cat-software'
    default: return 'cat-default'
  }
}
</script>

<style scoped>
.timeline-container {
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text);
  transition: background 0.5s ease, color 0.5s ease;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.7;
  font-weight: 500;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  margin: 1.25rem auto 0;
  border-radius: 999px;
}

/* Timeline Layout */
.timeline-wrapper {
  position: relative;
  padding: 1rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: 3px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #3b82f6);
  opacity: 0.3;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.timeline-row {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.timeline-content {
  width: 50%;
  padding: 0 3rem;
  display: flex;
}

.timeline-spacer {
  width: 50%;
}

/* Alternance */
.row-left { flex-direction: row; }
.row-left .timeline-content { justify-content: flex-end; }
.row-right { flex-direction: row-reverse; }
.row-right .timeline-content { justify-content: flex-start; }

.timeline-dot-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

/* Cartes */
.project-card {
  background: var(--color-background-soft);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border);
  max-width: 500px;
  width: 100%;
}

.project-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.ongoing-card {
  border: 2px solid #22c55e;
  background: linear-gradient(to bottom right, var(--color-background-soft), rgba(34, 197, 94, 0.05));
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #eff6ff;
  color: #1e40af;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-badge {
  background: #22c55e;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
}

.card-body {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.logo-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.project-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-wrapper { flex: 1; }

.project-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 0.1rem;
  line-height: 1.2;
}

.project-category {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.project-description {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Sections Tech */
.new-tech-section {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0.75rem;
  border-left: 3px solid #3b82f6;
}

.all-tech-section { margin-top: 1rem; }

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

.new-tech {
  background: #dbeafe;
  color: #1e40af;
  border-color: #bfdbfe;
}

.tech-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
}

.details-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.details-link span { transition: transform 0.2s; }
.details-link:hover { color: #2563eb; }
.details-link:hover span { transform: translateX(4px); }

/* Points */
.dot-ring {
  position: absolute;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
}

.ring-pulse { animation: pulse-ring 2s infinite; }

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

.dot-inner {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--color-background);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: white;
  z-index: 2;
}
</style>
