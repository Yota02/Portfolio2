<template>
  <div class="parcours-container">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- En-tête centré -->
      <header class="header-section">
        <h1 class="title">Mon Parcours</h1>
        <p class="subtitle">Diplômes, Expériences & Objectifs</p>
        <div class="title-underline"></div>
      </header>

      <div class="timeline-wrapper">
        <!-- Ligne verticale centrale -->
        <div class="timeline-line"></div>

        <!-- Items de la timeline -->
        <div class="timeline-items">
          <div
            v-for="(item, index) in sortedItems"
            :key="item.id"
            class="timeline-row"
            :class="index % 2 === 0 ? 'row-left' : 'row-right'"
          >
            <!-- Contenu de la carte (Bulle) -->
            <div class="timeline-content">
              <div class="timeline-card" :class="{ 'current-card': item.isCurrent }">
                <div class="card-header">
                  <div class="date-badge">
                    <Calendar class="w-3.5 h-3.5" />
                    <span>{{ item.year }}</span>
                  </div>
                  <span v-if="item.isCurrent" class="status-badge">En cours</span>
                </div>

                <div class="card-body">
                  <div v-if="item.logo" class="logo-container">
                    <img :src="baseUrl + item.logo" :alt="`Logo ${item.title}`" class="institution-logo" />
                  </div>
                  <div class="text-content">
                    <h3 class="item-title">{{ item.title }}</h3>
                    <p class="item-description">{{ item.description }}</p>
                  </div>
                </div>
                
                <div class="card-footer">
                  <span class="type-tag" :class="item.type">{{ getTypeLabel(item.type) }}</span>
                </div>
              </div>
            </div>

            <!-- Point central -->
            <div class="timeline-dot-wrapper">
              <div class="dot-ring" :class="{ 'ring-pulse': item.isCurrent }"></div>
              <div class="dot-inner" :class="[getTypeColor(item), { 'current-dot': item.isCurrent }]">
                <component :is="item.icon" class="dot-icon" />
              </div>
            </div>

            <!-- Espace vide pour l'équilibre -->
            <div class="timeline-spacer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GraduationCap, Briefcase, Target, Calendar } from 'lucide-vue-next'

const baseUrl = import.meta.env.BASE_URL

const items = [
  {
    id: 1,
    year: '2020-2023',
    type: 'diplome',
    title: 'Baccalauréat Math / NSI / SVT',
    description: 'Lycée Jean Jaurès',
    icon: GraduationCap,
    logo: 'icone/jeanJaurès.jpeg'
  },
  {
    id: 2,
    year: '2023-2026',
    type: 'diplome',
    title: 'BUT Informatique',
    description: "IUT de Montpellier",
    icon: GraduationCap,
    logo: 'icone/IUT-Montpellier.png'
  },
  {
    id: 4,
    year: 'Janvier 2025 - Avril 2025',
    type: 'experience',
    title: 'Stage au CSUM',
    description: 'Centre Spatial Universitaire de Montpellier - Développement logiciel embarqué',
    icon: Briefcase,
    logo: 'icone/csum.jpg'
  },
  {
    id: 5,
    year: '2025-2026',
    type: 'diplome',
    title: 'Licence 3 MTS eLearning',
    description: 'IAE de Montpellier',
    icon: GraduationCap,
    isCurrent: true,
    logo: 'icone/iae.png'
  },
  {
    id: 6,
    year: '2026-2028',
    type: 'diplome',
    title: 'Master en Bio informatique',
    description: 'IAE de Montpellier',
    icon: GraduationCap,
    logo: 'icone/fds.png'
  },
  {
    id: 9,
    year: 'Avril 2026 - Juillet 2026',
    type: 'experience',
    title: 'Stage au Centre Spatial',
    description: 'Stage au Centre Spatial Universitaire de Montpellier (Avril - Juillet 2026)',
    icon: Briefcase,
    logo: 'icone/csum.jpg'
  },
  {
    id: 7,
    year: '2028-2031',
    type: 'objectif',
    title: 'Thèse dans la Bio Informatique',
    description: 'Réalisation d\'une thèse doctorale sur l\'IA et son impact sociétal',
    icon: Target,
    logo: ''
  },
  {
    id: 8,
    year: '2031-...',
    type: 'objectif',
    title: 'Enseignant-chercheur international',
    description: 'Enseigner et mener des recherches dans des universités à travers le monde (Japon, Chine, Royaume-Uni, Allemagne, etc.)',
    icon: Target,
    logo: ''
  },
]

const getSortKey = (item: any) => {
  const yearStr: string = item.year || ''
  const monthNames: Record<string, number> = {
    'janvier': 1, 'février': 2, 'fevrier': 2, 'mars': 3, 'avril': 4, 'mai': 5,
    'juin': 6, 'juillet': 7, 'août': 8, 'aout': 8, 'septembre': 9, 'octobre': 10,
    'novembre': 11, 'décembre': 12, 'decembre': 12
  }

  const monthMatch = yearStr.match(/(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+(\d{4})/i)
  if (monthMatch) {
    const monthName = monthMatch[1]!.toLowerCase()
    const year = parseInt(monthMatch[2]!, 10)
    return year * 100 + (monthNames[monthName] || 1)
  }

  const yearMatch = yearStr.match(/(\d{4})/)
  if (yearMatch) {
    const year = parseInt(yearMatch[1]!, 10)
    const defaultMonth = item.type === 'diplome' ? 9 : 1
    return year * 100 + defaultMonth
  }

  return 0
}

const sortedItems = computed(() => {
  return [...items].sort((a, b) => getSortKey(a) - getSortKey(b))
})

const getTypeColor = (item: any) => {
  if (item.isCurrent) return 'bg-current'
  switch (item.type) {
    case 'diplome': return 'bg-diplome'
    case 'experience': return 'bg-experience'
    case 'objectif': return 'bg-objectif'
    default: return 'bg-default'
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
.parcours-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
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
  background: rgba(59, 130, 246, 0.2);
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-row {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.timeline-content {
  width: 50%;
  padding: 0 2.5rem;
  display: flex;
}

.timeline-spacer {
  width: 50%;
}

/* Alternance */
.row-left {
  flex-direction: row;
}

.row-left .timeline-content {
  justify-content: flex-end;
}

.row-right {
  flex-direction: row-reverse;
}

.row-right .timeline-content {
  justify-content: flex-start;
}

.timeline-dot-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

/* Bulles plus petites */
.timeline-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.8);
  max-width: 380px;
  width: 100%;
}

.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.current-card {
  border: 2px solid #22c55e;
  background: linear-gradient(to bottom right, #ffffff, #f0fdf4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #f1f5f9;
  color: #475569;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
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
  gap: 1rem;
  align-items: center;
}

.logo-container {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}

.institution-logo {
  width: 85%;
  height: 80%;
  object-fit: contain;
}

.text-content {
  flex: 1;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 0.2rem;
  line-height: 1.2;
}

.item-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
}

.card-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.type-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.type-tag.diplome { background: #dbeafe; color: #1e40af; }
.type-tag.experience { background: #fef3c7; color: #92400e; }
.type-tag.objectif { background: #f3e8ff; color: #6b21a8; }

/* Points */
.dot-ring {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
}

.ring-pulse {
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

.dot-inner {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dot-icon {
  width: 1rem;
  height: 1rem;
  color: white;
}

.bg-diplome { background-color: #3b82f6; }
.bg-experience { background-color: #f59e0b; }
.bg-objectif { background-color: #8b5cf6; }
.bg-current { background-color: #22c55e; }
.bg-default { background-color: #94a3b8; }

/* Responsive */
@media (max-width: 768px) {
  .timeline-line { left: 20px; }
  .timeline-row { flex-direction: row !important; padding-left: 45px; }
  .timeline-content { width: 100% !important; justify-content: flex-start !important; padding: 0 !important; }
  .timeline-spacer { display: none; }
  .timeline-dot-wrapper { left: 20px; }
  .timeline-card { max-width: none; }
}

@media (prefers-color-scheme: dark) {
  .parcours-container { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f1f5f9; }
  .title { color: #f1f5f9; }
  .timeline-card { background: #1e293b; border-color: #334155; }
  .item-title { color: #f1f5f9; }
  .item-description { color: #cbd5e1; }
  .date-badge { background: #334155; color: #cbd5e1; }
  .logo-container { background: #334155; border-color: #475569; }
}
</style>
