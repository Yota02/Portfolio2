<template>
  <div class="parcours-container">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <header class="text-center mb-16">
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
            class="timeline-item"
            :class="{ 
              'flex-row-reverse': index % 2 === 0,
              'flex-row': index % 2 !== 0
            }"
          >
            <!-- Contenu de la carte -->
            <div class="timeline-content-wrapper" :class="index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'">
              <div class="timeline-card">
                <div class="card-header" :class="index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'">
                  <div class="date-badge">
                    <Calendar class="w-4 h-4" />
                    <span>{{ participation.date }}</span>
                  </div>
                </div>

                <div class="card-body" :class="index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'">
                  <div v-if="participation.logo" class="logo-container">
                    <img :src="baseUrl + participation.logo" :alt="`Logo ${participation.title}`" class="institution-logo" />
                  </div>
                  <div class="text-content">
                    <h3 class="item-title">{{ participation.title }}</h3>
                    <p class="item-description">{{ participation.description }}</p>
                    <div class="item-meta" :class="index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'">
                      <span v-if="participation.result" class="result-tag">
                        <Trophy class="w-3 h-3" />
                        {{ participation.result }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="card-footer" :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
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
  color: var(--color-text);
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 1.5rem auto 0;
  border-radius: 2px;
}

.timeline-wrapper {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(59, 130, 246, 0) 0%, 
    rgba(59, 130, 246, 0.4) 10%, 
    rgba(59, 130, 246, 0.4) 90%, 
    rgba(59, 130, 246, 0) 100%
  );
  border-radius: 2px;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.timeline-content-wrapper {
  width: 45%;
  z-index: 10;
}

.timeline-spacer {
  width: 45%;
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

.dot-ring {
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
}

.dot-inner {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.dot-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.timeline-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.timeline-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  color: #475569;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.card-body {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.logo-container {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}

.institution-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.text-content {
  flex: 1;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.item-description {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.item-meta {
  display: flex;
  gap: 0.5rem;
}

.result-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #059669;
  background: #ecfdf5;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
}

.card-footer {
  margin-top: 1.25rem;
  display: flex;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.type-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.type-tag.concours { background: #fee2e2; color: #b91c1c; }
.type-tag.hackathon { background: #e0f2fe; color: #0369a1; }

.btn-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* Couleurs des points */
.bg-concours { background-color: #ef4444; }
.bg-hackathon { background-color: #0ea5e9; }
.bg-default { background-color: #94a3b8; }

/* Responsive */
@media (max-width: 768px) {
  .timeline-line {
    left: 2rem;
  }

  .timeline-item {
    flex-direction: row !important;
    padding-left: 4rem;
  }

  .timeline-content-wrapper {
    width: 100%;
    text-align: left !important;
    padding: 0 !important;
  }

  .timeline-spacer {
    display: none;
  }

  .timeline-dot-wrapper {
    left: 2rem;
  }

  .card-header, .card-body, .item-meta {
    flex-direction: row !important;
  }

  .title {
    font-size: 2.25rem;
  }
}

@media (prefers-color-scheme: dark) {
  .parcours-container {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
  
  .title { color: #f1f5f9; }
  .subtitle { color: #94a3b8; }
  
  .timeline-card {
    background: #1e293b;
    border-color: #334155;
  }
  
  .item-title { color: #f1f5f9; }
  .item-description { color: #cbd5e1; }
  
  .date-badge {
    background: #334155;
    color: #cbd5e1;
  }
  
  .logo-container {
    background: #334155;
    border-color: #475569;
  }
  
  .result-tag {
    background: #064e3b;
    color: #6ee7b7;
  }
}
</style>
