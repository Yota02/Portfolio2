<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-900 mb-3">Mon Parcours</h1>
        <p class="text-blue-600 text-lg">Diplômes, Expériences & Objectifs</p>
      </div>

      <div class="relative">
        <!-- Ligne verticale centrale -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300"></div>

        <!-- Items de la timeline -->
        <div class="space-y-12">
          <div
            v-for="(item, index) in items"
            :key="item.id"
            :class="`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`"
          >
            <!-- Contenu -->
            <div :class="`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`">
              <div :class="`${item.isCurrent ? 'bg-green-50' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 ${item.isCurrent ? 'border-green-500' : 'border-blue-500'} hover:shadow-xl transition-shadow duration-300`">
                <div :class="`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`">
                  <span class="text-blue-900 font-bold text-lg flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {{ item.year }}
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-blue-900 mb-2">{{ item.title }}</h3>
                <p class="text-blue-800 font-semibold">{{ item.description }}</p>
              </div>
            </div>

            <!-- Point central avec icône -->
            <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div :class="`${getTypeColor(item)} w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10`">
                <component :is="item.icon" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Espace vide de l'autre côté -->
            <div class="w-5/12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCap, Briefcase, Target, Calendar, ArrowLeft } from 'lucide-vue-next'

const items = ref([
  {
    id: 1,
    year: '2020-2023',
    type: 'diplome',
    title: 'Baccalauréat',
    description: 'Lycée Jean Jaurès',
    icon: GraduationCap
  },
  {
    id: 2,
    year: '2023-2026',
    type: 'diplome',
    title: 'BUT Informatique',
    description: "IUT de Montpellier",
    icon: GraduationCap
  },
  {
    id: 3,
    year: 'Juillet 2025',
    type: 'diplome',
    title: 'DUT Informatique',
    description: 'IUT de Montpellier',
    icon: GraduationCap
  },
    {
    id: 4,
    year: 'Janvier 2025 - Avril 2025',
    type: 'experience',
    title: 'Stage au CSUM',
    description: 'Centre Spatial Universitaire de Montpellier',
    icon: Briefcase
  },
  {
    id: 5,
    year: '2025-2026',
    type: 'diplome',
    title: 'Licence 3 MTS eLearning',
    description: 'IAE de Montpellier',
    icon: GraduationCap,
    isCurrent: true
  },
  {
    id: 6,
    year: '2026-2028',
    type: 'diplome',
    title: 'Master en IA',
    description: 'IAE de Montpellier',
    icon: Target
  },
  {
    id: 7,
    year: '2028-2031',
    type: 'objectif',
    title: 'Thèse sur l\'Intelligence Artificielle et la sociologie',
    description: 'Réalisation d\'une thèse doctorale sur l\'IA et son impact sociétal',
    icon: Target
  },
  {
    id: 8,
    year: '2031-...',
    type: 'objectif',
    title: 'Travaillé dans plusieurs universités internationales ',
    description: 'être enseignant-chercheur et enseigner dans des universités à travers le monde (Japon, Chine, Royaume-Uni, Allemagne, etc...)',
    icon: Target
  }, 

])

// Fonction pour extraire l'année de début
const getSortKey = (year: string) => {
  const match = year.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
}

// Trier les items par année croissante (chronologique)
items.value.sort((a, b) => getSortKey(a.year) - getSortKey(b.year))

const getTypeColor = (item: any) => {
  if (item.isCurrent) return 'bg-green-500'
  switch (item.type) {
    case 'diplome': return 'bg-blue-500'
    case 'experience': return 'bg-blue-500'
    case 'objectif': return 'bg-blue-500'
    default: return 'bg-blue-500'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'diplome': return 'Diplôme'
    case 'experience': return 'Expérience'
    case 'objectif': return 'Objectif'
    default: return ''
  }
}
</script>

<style scoped>

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
</style>