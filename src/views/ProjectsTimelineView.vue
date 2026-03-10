<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'

const { t, locale } = useI18n()

// Localized month mapping for sorting
const monthMap: Record<string, Record<string, number>> = {
  fr: {
    'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
    'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
  },
  en: {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  },
  es: {
    'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
    'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
  },
  de: {
    'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
    'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
  },
  it: {
    'Gennaio': 0, 'Febbraio': 1, 'Marzo': 2, 'Aprile': 3, 'Maggio': 4, 'Giugno': 5,
    'Luglio': 6, 'Agosto': 7, 'Settembre': 8, 'Ottobre': 9, 'Novembre': 10, 'Dicembre': 11
  },
  ru: {
    'Январь': 0, 'Февраль': 1, 'Март': 2, 'Апрель': 3, 'Май': 4, 'Июнь': 5,
    'Июль': 6, 'Август': 7, 'Сентябрь': 8, 'Октябрь': 9, 'Ноябрь': 10, 'Декабрь': 11
  }
}

// Special case for Chinese and Japanese (YYYY年M月)
const parseAsianDate = (dateStr: string) => {
  const match = dateStr.match(/(\d+)年(\d+)月/)
  if (match && match[1] && match[2]) {
    return new Date(parseInt(match[1]), parseInt(match[2]) - 1)
  }
  return new Date(0)
}

const parseDate = (dateKey: string | undefined) => {
  if (!dateKey) return new Date(0)
  
  const translatedDate = t(dateKey)
  const currentLocale = locale.value as string

  if (currentLocale === 'zh' || currentLocale === 'jp') {
    return parseAsianDate(translatedDate)
  }

  const parts = translatedDate.split(' ')
  if (parts.length === 2 && parts[1] && parts[0]) {
    const monthName = parts[0]
    const year = parseInt(parts[1])
    const monthMapForLocale = monthMap[currentLocale]
    const month = monthMapForLocale ? (monthMapForLocale[monthName] ?? 0) : 0
    return new Date(year, month)
  }
  
  return new Date(0)
}

const sortedProjects = [...projects].sort((a, b) => {
  const dateA = parseDate(a.startDate)
  const dateB = parseDate(b.startDate)
  return dateB.getTime() - dateA.getTime()
})
</script>

<template>
  <div class="timeline-container">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <header class="header-section">
        <h1 class="title">{{ t('nav.timeline') }}</h1>
        <p class="subtitle">{{ t('projects.subtitle') }}</p>
      </header>

      <div class="timeline">
        <div v-for="(project, index) in sortedProjects" :key="project.id" 
             class="timeline-item" :class="{ 'reverse': index % 2 !== 0 }">
          <div class="timeline-content">
            <div class="project-card">
              <div class="project-date">
                {{ project.startDate ? t(project.startDate) : '' }}
                <template v-if="project.endDate"> - {{ t(project.endDate) }}</template>
                <template v-else-if="project.isOngoing"> - {{ t('projects.stats.ongoing') }}</template>
              </div>
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-desc">{{ t(project.description) }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <router-link :to="`/project/${project.id}`" class="view-link">
                {{ t('projects.view_project_link') }}
              </router-link>
            </div>
          </div>
          <div class="timeline-dot-wrapper">
            <div class="timeline-dot"></div>
          </div>
          <div class="timeline-spacer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  min-height: 100vh;
  background: var(--color-background);
}

.header-section {
  text-align: center;
  margin-bottom: 5rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  margin-bottom: 4rem;
  align-items: center;
}

.timeline-item.reverse {
  flex-direction: row-reverse;
}

.timeline-content {
  width: 45%;
}

.timeline-spacer {
  width: 45%;
}

.timeline-dot-wrapper {
  width: 10%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  border: 4px solid var(--color-background);
  box-shadow: 0 0 0 2px var(--primary);
}

.project-card {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.project-date {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.project-name {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.project-desc {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  background: var(--color-background-mute);
  border-radius: 999px;
  color: var(--color-text);
}

.view-link {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .timeline::before { left: 20px; }
  .timeline-item { flex-direction: row !important; }
  .timeline-content { width: 100%; padding: 0 0 0 4rem; }
  .timeline-spacer { display: none; }
  .timeline-dot-wrapper { left: 20px; transform: translateX(-50%); }
  .project-card { max-width: 100%; }
}
</style>
