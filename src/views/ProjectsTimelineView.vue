<template>
  <div class="timeline-page">
    <div class="max-w-5xl mx-auto p-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-900 mb-3">Timeline des Projets</h1>
        <p class="text-blue-600 text-lg">Évolution de mes projets et technologies déployées</p>
      </div>

      <div class="relative">
        <!-- Ligne verticale centrale -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300"></div>

        <!-- Items de la timeline -->
        <div class="space-y-12">
          <div
            v-for="(project, index) in sortedProjects"
            :key="project.id"
            :class="`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`"
          >
            <!-- Contenu -->
            <div :class="`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`">
              <div :class="`${project.isOngoing ? 'bg-green-50' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 ${project.isOngoing ? 'border-green-500' : 'border-blue-500'} hover:shadow-xl transition-shadow duration-300`">
                <div :class="`flex gap-4 mb-3 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`">
                    <img
                        v-if="project.logo"
                        :src="project.logo.startsWith('http') ? project.logo : `Portfolio2/projet/${project.folder}/${project.logo}`"
                        :alt="`Logo de ${project.name}`"
                        :class="`w-16 h-16 rounded-lg shadow-md border border-gray-200 object-cover flex-shrink-0 project-logo ${index % 2 === 0 ? 'ml-4' : 'mr-4'}`"
                    />
                    
                    <div :class="`flex-grow ${index % 2 === 0 ? 'text-right' : 'text-left'}`">
                        <h3 class="text-2xl font-bold text-blue-900 mb-1">{{ project.name }}</h3>
                        
                        <div :class="`flex items-center gap-1.5 ${index % 2 === 0 ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`">
                            <span class="text-blue-900 font-semibold text-sm flex items-center gap-1"> <Calendar class="w-4 h-4" />
                                {{ project.startDate || 'Date inconnue' }}{{ project.endDate ? ` - ${project.endDate}` : '' }}
                            </span>
                        </div>
                    </div>
                </div>
                <p class="text-blue-800 font-semibold mb-3">{{ project.description }}</p>
                <p class="text-sm text-gray-600 mb-4">Catégorie : {{ project.category }} | {{ project.isOngoing ? 'En cours' : 'Terminé' }}</p>
                
                <!-- Toutes les technologies utilisées -->
                <p class="text-sm text-gray-600 mb-2">Toutes les technologies utilisées :</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tech in project.tags"
                    :key="tech"
                    class="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    <img
                      v-if="techIconMap[tech]"
                      :src="`/icone/${techIconMap[tech]}.png`"
                      :alt="tech"
                      class="w-4 h-4"
                    />
                    {{ tech }}
                  </span>
                </div>
                
                <!-- Lien vers les détails -->
                <RouterLink
                  :to="{ name: 'project-detail', params: { id: project.id } }"
                  class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Voir le projet →
                </RouterLink>
              </div>
            </div>

            <!-- Point central avec icône -->
            <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div :class="`${project.isOngoing ? 'bg-green-500' : 'bg-blue-500'} w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10`">
                <component :is="getProjectIcon(project.category)" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Espace de l'autre côté : nouvelles technologies -->
            <div v-if="project.newTech && project.newTech.length > 0" class="absolute" :style="index % 2 === 0 ? 'right: calc(50% + 4rem);' : 'left: calc(50% + 4rem);'">
              <div class="bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                <h4 class="text-lg font-bold text-blue-900 mb-2 text-center">Nouvelles Technologies Apprises</h4>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span
                    v-for="tech in project.newTech"
                    :key="tech"
                    class="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    <img
                      v-if="techIconMap[tech]"
                      :src="`/icone/${techIconMap[tech]}.png`"
                      :alt="tech"
                      class="w-4 h-4"
                    />
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, techIconMap } from '@/data/projects'
import { GraduationCap, Briefcase, Target, Calendar, Code, Gamepad2, Cpu } from 'lucide-vue-next'

// Mapping des mois français vers des numéros pour le tri
const monthMap: Record<string, number> = {
  'Janvier': 1, 'Février': 2, 'Mars': 3, 'Avril': 4, 'Mai': 5, 'Juin': 6,
  'Juillet': 7, 'Août': 8, 'Septembre': 9, 'Octobre': 10, 'Novembre': 11, 'Décembre': 12
}

// Fonction pour extraire une clé de tri basée sur mois et année
const getSortKey = (date: string | undefined) => {
  if (!date) return 0
  const parts = date.split(' ')
  if (parts.length !== 2) return 0
  const monthKey = parts[0] as keyof typeof monthMap
  const month = monthMap[monthKey]
  const year = parseInt(parts[1]!)
  if (!month || isNaN(year)) return 0
  return year * 100 + month  // Exemple : 202403 pour Mars 2024, 202409 pour Septembre 2024
}

// Fonction pour obtenir la clé de tri d'un projet (utilise endDate si terminé et existe, sinon startDate)
const getSortKeyForProject = (project: typeof projects[0]) => {
  const date = (!project.isOngoing && project.endDate) ? project.endDate : project.startDate
  return getSortKey(date)
}

// Trier les projets par date appropriée (chronologique)
const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => getSortKeyForProject(b) - getSortKeyForProject(a))
})

// Fonction pour choisir une icône basée sur la catégorie
const getProjectIcon = (category: string) => {
  switch (category) {
    case 'Dev Web': return Code
    case 'IA': return Cpu
    case 'Jeux Vidéo': return Gamepad2
    case 'Logiciel': return Briefcase
    default: return Target
  }
}
</script>

<style scoped>
/* Styles similaires à ObjectivesView, adaptés pour les projets */
.timeline-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eff6ff, #ffffff, #eff6ff);
}

.bg-blue-600 {
  background-color: #2563eb;
}

.text-blue-900 {
  color: #1e3a8a;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.border-green-500 {
  border-color: #22c55e;
}

.bg-green-500 {
  background-color: #22c55e;
}

.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0));
}

.via-white {
  --tw-gradient-center: #ffffff;
}

.to-blue-50 {
  --tw-gradient-to: #eff6ff;
}

.p-8 {
  padding: 2rem;
}

.max-w-5xl {
  max-width: 80rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-center {
  text-align: center;
}

.mb-12 {
  margin-bottom: 3rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.text-blue-900 {
  color: #1e3a8a;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.text-blue-600 {
  color: #2563eb;
}

.text-lg {
  font-size: 1.125rem;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.left-1\/2 {
  left: 50%;
}

.transform {
  transform: translateX(-50%);
}

.w-1 {
  width: 0.25rem;
}

.h-full {
  height: 100%;
}

.bg-gradient-to-b {
  background: linear-gradient(to bottom, var(--tw-gradient-stops));
}

.from-blue-300 {
  --tw-gradient-from: #93c5fd;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(147, 197, 253, 0));
}

.via-blue-400 {
  --tw-gradient-center: #60a5fa;
}

.to-blue-300 {
  --tw-gradient-to: #93c5fd;
}

.space-y-12 > :not(template) ~ :not(template) {
  margin-top: 3rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

.w-5\/12 {
  width: 41.666667%;
}

.text-right {
  text-align: right;
}

.pr-8 {
  padding-right: 2rem;
}

.text-left {
  text-align: left;
}

.pl-8 {
  padding-left: 2rem;
}

.bg-white {
  background-color: #ffffff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.p-6 {
  padding: 1.5rem;
}

.border-l-4 {
  border-left-width: 4px;
}

.border-blue-500 {
  border-color: #3b82f6;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.transition-shadow {
  transition-property: box-shadow;
}

.duration-300 {
  transition-duration: 300ms;
}

.gap-2 {
  gap: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-xs {
  font-size: 0.75rem;
}

.font-semibold {
  font-weight: 600;
}

.text-white {
  color: #ffffff;
}

.flex-row {
  flex-direction: row;
}

.absolute {
  position: absolute;
}

.left-1\/2 {
  left: 50%;
}

.transform {
  transform: translateX(-50%);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.w-16 {
  width: 4rem;
}

.h-16 {
  height: 4rem;
}

.rounded-full {
  border-radius: 9999px;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.border-4 {
  border-width: 4px;
}

.border-white {
  border-color: #ffffff;
}

.z-10 {
  z-index: 10;
}

.mt-16 {
  margin-top: 4rem;
}

.bg-white {
  background-color: #ffffff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.p-6 {
  padding: 1.5rem;
}

.border-t-4 {
  border-top-width: 4px;
}

.text-xl {
  font-size: 1.25rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.gap-8 {
  gap: 2rem;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.w-4 {
  width: 1rem;
}

.h-4 {
  height: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-blue-400 {
  background-color: #60a5fa;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.text-blue-900 {
  color: #1e3a8a;
}

/* Ajouts pour les technologies */
.bg-blue-100 {
  background-color: #dbeafe;
}

.text-blue-800 {
  color: #1e40af;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.text-sm {
  font-size: 0.875rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.inline-block {
  display: inline-block;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.text-white {
  color: #ffffff;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.hover\:bg-blue-600:hover {
  background-color: #2563eb;
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.text-gray-600 {
  color: #4b5563;
}

/* Ajout pour la marge gauche du logo */
.project-logo {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
