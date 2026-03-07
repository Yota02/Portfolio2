<template>
  <div class="parcours-container">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <header class="header-section">
        <h1 class="title">Mes Participations</h1>
        <p class="subtitle">Événements et compétitions auxquels j'ai participé</p>
        <div class="title-underline"></div>
      </header>

      <div class="timeline-wrapper">
        <div class="timeline-line"></div>

        <div class="timeline-items">
          <div
            v-for="(participation, index) in participations"
            :key="participation.id"
            class="timeline-row"
            :class="index % 2 === 0 ? 'row-left' : 'row-right'"
          >
            <!-- Contenu de la carte -->
            <div class="timeline-content">
              <div class="timeline-card">
                <div class="card-header">
                  <div class="date-badge">
                    <Calendar class="w-3.5 h-3.5" />
                    <span>{{ participation.date }}</span>
                  </div>
                  <span v-if="participation.result" class="result-tag">
                    <Trophy class="w-3 h-3" />
                    {{ participation.result }}
                  </span>
                </div>

                <div class="card-body">
                  <div v-if="participation.logo" class="logo-container">
                    <img :src="baseUrl + participation.logo" :alt="`Logo ${participation.title}`" class="institution-logo" />
                  </div>
                  <div class="text-content">
                    <h3 class="item-title">{{ participation.title }}</h3>
                    <p class="item-description">{{ participation.description }}</p>
                  </div>
                </div>
                
                <div class="card-footer">
                  <div class="footer-actions">
                    <span class="type-tag" :class="participation.type">{{ participation.type }}</span>
                    <a
                      v-if="participation.link"
                      :href="participation.link"
                      target="_blank"
                      class="btn-link"
                    >
                      En savoir plus →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Point central avec icône -->
            <div class="timeline-dot-wrapper">
              <div class="dot-ring"></div>
              <div class="dot-inner" :class="getParticipationColor(participation.type)">
                <component :is="getParticipationIcon(participation.type)" class="dot-icon" />
              </div>
            </div>

            <div class="timeline-spacer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GraduationCap, Target, Calendar, Trophy, Users, Rocket } from 'lucide-vue-next'

const baseUrl = import.meta.env.BASE_URL

const participationsData = [
  {
    id: 1,
    date: '5 décembre 2024',
    type: 'concours',
    title: 'Nuit de l\'Info 2024',
    description: 'Participation à la Nuit de l\'Info, un marathon de développement de 24h pour créer une application web sur un thème donné.',
    result: 'Défi relevé',
    link: 'https://www.nuitdelinfo.com/',
    logo: 'icone/ndi.png'
  },
  {
    id: 2,
    date: '22-24 janvier 2026',
    type: 'hackathon',
    title: 'Code Game Jam 2026',
    description: 'Participation à une game jam de codage pour développer un jeu en équipe en moins de 48h.',
    result: '',
    link: 'https://codegamejam.extragames.fr/',
    logo: 'icone/codegamejam.png'
  },
  {
    id: 3,
    date: '30-31 janvier 2026',
    type: 'hackathon',
    title: 'Hackathon ActInSpace',
    description: 'Hackathon international organisé par le CNES et l\'ESA pour relever des défis basés sur des technologies spatiales.',
    result: '',
    link: 'https://www.connectbycnes.fr/actinspace',
    logo: 'icone/actinspace.png'
  },
  {
    id: 4,
    date: '4-5 décembre 2025',
    type: 'concours',
    title: 'Nuit de l\'Info 2025',
    description: 'Participation à la Nuit de l\'Info, un marathon de développement de 24h pour créer une application web innovante.',
    result: '',
    link: 'https://www.nuitdelinfo.com/',
    logo: 'icone/ndi.png'
  },
]

const parseDate = (dateStr: string): Date => {
  const monthMap: Record<string, number> = {
    'janvier': 1, 'fevrier': 2, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
    'juillet': 7, 'aout': 8, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'decembre': 12, 'décembre': 12
  }

  const s = dateStr.trim().toLowerCase()
  if (/^\d{4}$/.test(s)) return new Date(`${s}-01-01`)

  const rangeMatch = s.match(/^(\d{1,2})(?:-(\d{1,2}))?\s+([a-zàâäéèêëîïôöûüçæœ'-]+)\s+(\d{4})$/i)
  if (rangeMatch) {
    const dayStart = parseInt(rangeMatch[1]!, 10)
    const monthName = rangeMatch[3]!
    const year = parseInt(rangeMatch[4]!, 10)
    const month = monthMap[monthName] ?? 1
    return new Date(year, month - 1, dayStart)
  }

  const simpleMatch = s.match(/^(\d{1,2})\s+([a-zàâäéèêëîïôöûüçæœ'-]+)\s+(\d{4})$/i)
  if (simpleMatch) {
    const day = parseInt(simpleMatch[1]!, 10)
    const monthName = simpleMatch[2]!
    const year = parseInt(simpleMatch[3]!, 10)
    const month = monthMap[monthName] ?? 1
    return new Date(year, month - 1, day)
  }

  return new Date(dateStr)
}

const participations = computed(() => {
  return [...participationsData].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
})

const getParticipationIcon = (type: string) => {
  switch (type) {
    case 'concours': return Trophy
    case 'hackathon': return Users
    case 'formation': return GraduationCap
    case 'spatial': return Rocket
    default: return Target
  }
}

const getParticipationColor = (type: string) => {
  switch (type) {
    case 'concours': return 'bg-concours'
    case 'hackathon': return 'bg-hackathon'
    default: return 'bg-default'
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
  max-width: 450px;
  width: 100%;
}

.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
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

.result-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #059669;
  background: #ecfdf5;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
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

.footer-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.type-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.type-tag.concours { background: #fee2e2; color: #b91c1c; }
.type-tag.hackathon { background: #e0f2fe; color: #0369a1; }

.btn-link {
  font-size: 0.8rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Points */
.dot-ring {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
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

.bg-concours { background-color: #ef4444; }
.bg-hackathon { background-color: #0ea5e9; }
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
  .subtitle { color: #94a3b8; }
  .timeline-card { background: #1e293b; border-color: #334155; }
  .item-title { color: #f1f5f9; }
  .item-description { color: #cbd5e1; }
  .date-badge { background: #334155; color: #cbd5e1; }
  .logo-container { background: #334155; border-color: #475569; }
}
</style>
