<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-900 mb-3">Mes Participations</h1>
        <p class="text-blue-600 text-lg">Événements et compétitions auxquels j'ai participé</p>
      </div>

      <div class="relative">
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300"></div>

        <div class="space-y-12">
          <div
            v-for="(participation, index) in participations"
            :key="participation.id"
            :class="`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`"
          >
            <div :class="`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`">
              <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                
                <div :class="`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`">
                  <Calendar class="w-4 h-4 text-blue-700" /> 
                  <span class="text-blue-900 font-bold text-lg flex items-center gap-1">
                    {{ participation.date }}
                  </span>
                </div>

                <div :class="`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`">
                  <img v-if="participation.logo" :src="participation.logo" alt="Logo de l'événement" class="w-6 h-6 rounded-full" /> 
                  <h3 class="text-2xl font-bold text-blue-900">{{ participation.title }}</h3>
                </div>

                <p class="text-blue-800 font-semibold mb-3">{{ participation.description }}</p>
                <p class="text-sm text-gray-600 mb-4">Type : {{ participation.type }}{{ participation.result ? ' | Résultat : ' + participation.result : '' }}</p>
                
                <a
                  v-if="participation.link"
                  :href="participation.link"
                  target="_blank"
                  class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  En savoir plus →
                </a>
              </div>
            </div>

            <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div class="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10"> 
                <component :is="getParticipationIcon(participation.type)" class="w-6 h-6 text-white" /> 
              </div>
            </div>

            <div class="w-5/12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GraduationCap, Briefcase, Target, Calendar, Trophy, Users } from 'lucide-vue-next'

const participationsData = ref([
  {
    id: 1,
    date: '5 décembre 2024',
    type: 'concours',
    title: 'Nuit de l\'Info 2024',
    description: 'Participation à la Nuit de l\'Info, un marathon de développement de 24h pour créer une application web sur un thème donné.',
    result: '',
    link: 'https://www.nuitdelinfo.com/',
    logo: '/Portfolio2/icone/ndi.png'
  },
  {
    id: 2,
    date: '22-24 janvier 2026',
    type: 'hackathon',
    title: 'Code Game Jam 2026',
    description: 'Participation à une game jam de codage pour développer un jeu en équipe.',
    result: '',
    link: 'https://codegamejam.extragames.fr/',
    logo: '/Portfolio2/icone/codegamejam.png' 
  },
  {
    id: 3,
    date: '30-31 janvier 2026',
    type: 'hackathon',
    title: 'Hackathon ActInSpace',
    description: 'Hackathon organisé par ActInSpace pour innover dans le domaine spatial.',
    result: '',
    link: 'https://www.connectbycnes.fr/actinspace',
    logo: '/Portfolio2/icone/actinspace.png' 
  },
  {
    id: 4,
    date: '4-5 décembre 2025',
    type: 'concours',
    title: 'Nuit de l\'Info 2025',
    description: 'Participation à la Nuit de l\'Info, un marathon de développement de 24h pour créer une application web sur un thème donné.',
    result: '',
    link: 'https://www.nuitdelinfo.com/',
    logo: '/Portfolio2/icone/ndi.png' 
  },
])

// Fonction pour analyser les dates
const parseDate = (dateStr: string): Date => {
  if (dateStr.includes('décembre')) {
    const parts = dateStr.split(' ')
    const year = parts[2]
    return new Date(`${year}-12-05`)
  } else if (dateStr.includes('janvier')) {
    const parts = dateStr.split(' ')
    const year = parts[2]
    return new Date(`${year}-01-30`)
  } else if (/^\d{4}$/.test(dateStr)) {
    return new Date(`${dateStr}-01-01`)
  }
  return new Date(dateStr) // fallback
}

// Propriété calculée pour trier par date
const participations = computed(() => {
  return [...participationsData.value].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
})

// Fonction pour choisir une icône basée sur le type
const getParticipationIcon = (type: string) => {
  switch (type) {
    case 'concours': return Trophy
    case 'hackathon': return Users
    case 'formation': return GraduationCap
    default: return Target
  }
}
</script>

<style scoped>
/* Styles CSS pour simuler Tailwind si nécessaire, conservés depuis votre code original */

.min-h-screen { min-height: 100vh; }
.bg-gradient-to-br { background: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
.from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
.via-white { --tw-gradient-center: #ffffff; }
.to-blue-50 { --tw-gradient-to: #eff6ff; }
.p-8 { padding: 2rem; }
.max-w-5xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
.mb-12 { margin-bottom: 3rem; }
.text-4xl { font-size: 2.25rem; }
.font-bold { font-weight: 700; }
.text-blue-900 { color: #1e3a8a; }
.mb-3 { margin-bottom: 0.75rem; }
.text-blue-600 { color: #2563eb; }
.text-lg { font-size: 1.125rem; }
.relative { position: relative; }
.absolute { position: absolute; }
.left-1\/2 { left: 50%; }
.transform { transform: translateX(-50%); }
.w-1 { width: 0.25rem; }
.h-full { height: 100%; }
.bg-gradient-to-b { background: linear-gradient(to bottom, var(--tw-gradient-stops)); }
.from-blue-300 { --tw-gradient-from: #93c5fd; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(147, 197, 253, 0)); }
.via-blue-400 { --tw-gradient-center: #60a5fa; }
.to-blue-300 { --tw-gradient-to: #93c5fd; }
.space-y-12 > :not(template) ~ :not(template) { margin-top: 3rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.flex-row-reverse { flex-direction: row-reverse; }
.w-5\/12 { width: 41.666667%; }
.text-right { text-align: right; }
.pr-8 { padding-right: 2rem; }
.text-left { text-align: left; }
.pl-8 { padding-left: 2rem; }
.bg-white { background-color: #ffffff; }
.rounded-lg { border-radius: 0.5rem; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.p-6 { padding: 1.5rem; }
.border-l-4 { border-left-width: 4px; }
.border-blue-500 { border-color: #3b82f6; }
.hover\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
.transition-shadow { transition-property: box-shadow; }
.duration-300 { transition-duration: 300ms; }
.gap-2 { gap: 0.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.text-xs { font-size: 0.75rem; }
.font-semibold { font-weight: 600; }
.text-white { color: #ffffff; }
.flex-row { flex-direction: row; }
.justify-center { justify-content: center; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.rounded-full { border-radius: 9999px; }
.border-4 { border-width: 4px; }
.border-white { border-color: #ffffff; }
.z-10 { z-index: 10; }
.mt-16 { margin-top: 4rem; }
.border-t-4 { border-top-width: 4px; }
.text-xl { font-size: 1.25rem; }
.mb-4 { margin-bottom: 1rem; }
.gap-8 { gap: 2rem; }
.flex-wrap { flex-wrap: wrap; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.bg-blue-400 { background-color: #60a5fa; }
.bg-blue-600 { background-color: #2563eb; }
.bg-blue-100 { background-color: #dbeafe; }
.text-blue-800 { color: #1e40af; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.text-sm { font-size: 0.875rem; }
.inline-block { display: inline-block; }
.bg-blue-500 { background-color: #3b82f6; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.rounded { border-radius: 0.25rem; }
.hover\:bg-blue-600:hover { background-color: #2563eb; }
.transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.text-gray-600 { color: #4b5563; }
</style>