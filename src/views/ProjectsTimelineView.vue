<script setup lang="ts">
<<<<<<< HEAD
import { ref, computed, onMounted } from 'vue'
=======
import { computed, ref } from 'vue'
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
import { useI18n } from 'vue-i18n'
import { projects, categoryMap, purposeMap, type ProjectCategory } from '@/data/projects'
import { parseDate } from '@/utils/dateUtils'
import TechBadge from '@/components/TechBadge.vue'

const { t, locale } = useI18n()
const baseUrl = import.meta.env.BASE_URL

// Reactive filters state
const searchQuery = ref('')
const activeCategory = ref<string>('all')
const sortOrder = ref<'desc' | 'asc'>('desc')
const hoveredProjectId = ref<string | null>(null)

// All categories list
const categories: ProjectCategory[] = ["Dev Web", "IA", "Logiciel", "Jeux Vidéo"]

// Category visual configuration mapping
const categoryStyleMap: Record<ProjectCategory, { class: string; icon: string; color: string; rgb: string }> = {
  "Dev Web": {
    class: "cat-web",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    color: "#3b82f6",
    rgb: "59, 130, 246"
  },
  "IA": {
    class: "cat-ia",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Z"/></svg>`,
    color: "#10b981",
    rgb: "16, 185, 129"
  },
  "Logiciel": {
    class: "cat-software",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    color: "#8b5cf6",
    rgb: "139, 92, 246"
  },
  "Jeux Vidéo": {
    class: "cat-games",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`,
    color: "#f97316",
    rgb: "249, 115, 22"
  }
}

// Dynamically compute project counts
const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: projects.length }
  projects.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })
  return counts
})

// Dynamic localized search placeholder
const searchPlaceholder = computed(() => {
  const lang = locale.value
  switch(lang) {
    case 'fr': return 'Rechercher un projet, une technologie...'
    case 'en': return 'Search a project, technology...'
    case 'es': return 'Buscar un proyecto, tecnología...'
    case 'de': return 'Projekt, Technologie suchen...'
    case 'it': return 'Cerca un progetto, tecnologia...'
    case 'jp': return 'プロジェクトや技術を検索...'
    case 'zh': return '搜索项目、技术...'
    case 'ru': return 'Поиск проекта, технологии...'
    default: return 'Search project...'
  }
})

// Dynamic localized sort label
const sortLabel = computed(() => {
  const lang = locale.value
  if (sortOrder.value === 'desc') {
    switch(lang) {
      case 'fr': return 'Plus récent'
      case 'en': return 'Newest first'
      case 'es': return 'Más reciente'
      case 'de': return 'Neueste zuerst'
      case 'it': return 'Più recenti'
      case 'jp': return '新しい順'
      case 'zh': return '最新优先'
      case 'ru': return 'Сначала новые'
      default: return 'Newest'
    }
  } else {
    switch(lang) {
      case 'fr': return 'Plus ancien'
      case 'en': return 'Oldest first'
      case 'es': return 'Más antiguo'
      case 'de': return 'Älteste zuerst'
      case 'it': return 'Più vecchi'
      case 'jp': return '古い順'
      case 'zh': return '最早优先'
      case 'ru': return 'Сначала старые'
      default: return 'Oldest'
    }
  }
})

// Dynamic filter & search logic
const filteredAndSortedProjects = computed(() => {
  let list = [...projects]
  
  // Category Filter
  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category === activeCategory.value)
  }
  
  // Text Search Filter
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(q)
      const descMatch = t(p.description).toLowerCase().includes(q)
      const tagMatch = p.tags.some(tag => tag.toLowerCase().includes(q))
      return nameMatch || descMatch || tagMatch
    })
  }
  
  // Sort Logic
  list.sort((a, b) => {
    const dateA = parseDate(a.startDate, locale.value, t)
    const dateB = parseDate(b.startDate, locale.value, t)
    
    if (sortOrder.value === 'desc') {
      return dateB.getTime() - dateA.getTime()
    } else {
      return dateA.getTime() - dateB.getTime()
    }
  })
  
  return list
})

// Image assets resolvers
const getBannerSrc = (project: any) => {
  const image = project.images && project.images[0]
  if (!image) return ''
  return image.startsWith('http') ? image : `${baseUrl}projet/${project.folder}/${image}`
}

const getLogoSrc = (project: any) => {
  const logo = project.logo_recadrer || project.logo
  if (!logo) return ''
  return logo.startsWith('http') ? logo : `${baseUrl}projet/${project.folder}/${logo}`
}
</script>

<template>
  <div class="timeline-container">
<<<<<<< HEAD
    <div class="max-w-6xl mx-auto px-8 py-16">
      <header class="header-section">
=======
    <div class="max-w-6xl mx-auto px-4 py-16">
      
      <!-- Premium Header Section -->
      <header class="header-section reveal-up">
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
        <h1 class="title">{{ t('nav.timeline') }}</h1>


        <!-- Filters -->
        <div class="filter-wrapper">
          <div class="filter-label">
            <Filter :size="18" />
            <span>{{ t('blog.all_categories') }}</span>
          </div>
          <div class="filter-chips">
            <button
              v-for="cat in categories"
              :key="cat"
              class="filter-chip"
              :class="{ 'active': selectedCategory === cat }"
              @click="selectedCategory = cat"
            >
              {{ cat === 'All' ? t('blog.all_categories') : t(`projects.categories.${cat === 'Dev Web' ? 'web' : cat === 'IA' ? 'ia' : cat === 'Jeux Vidéo' ? 'games' : 'software'}`) }}
            </button>
          </div>
        </div>
      </header>

<<<<<<< HEAD
      <div class="timeline">
        <div v-for="(project, index) in filteredProjects" :key="project.id"
             class="timeline-item" :class="{ 'reverse': index % 2 !== 0 }">

          <!-- Content Side -->
          <div class="timeline-content">
            <div class="project-card">
              <div class="card-header">
                <div class="project-info">
                  <div class="category-badge" :style="{ backgroundColor: getCategoryColor(project.category) }">
                    <component :is="getCategoryIcon(project.category)" :size="14" />
                    <span>{{ t(`projects.categories.${project.category === 'Dev Web' ? 'web' : project.category === 'IA' ? 'ia' : project.category === 'Jeux Vidéo' ? 'games' : 'software'}`) }}</span>
                  </div>
                  <h3 class="project-name">{{ project.name }}</h3>
                </div>
                <div class="project-status" :class="{ 'ongoing': project.isOngoing }">
                  <Clock v-if="project.isOngoing" :size="14" />
                  <CheckCircle2 v-else :size="14" />
                  <span>{{ project.isOngoing ? t('projects.stats.ongoing') : t('projects.stats.finished') }}</span>
                </div>
              </div>

              <div class="card-body">
                <p class="project-desc">{{ t(project.description) }}</p>
                <div class="project-preview" v-if="project.images && project.images.length > 0">
                  <img :src="getProjectImage(project)" :alt="project.name" loading="lazy">
                </div>
                <div class="project-tags">
                  <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="tag">
                    <Tag :size="10" />
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="card-footer">
                <div class="project-date">
                  <Calendar :size="14" />
                  <span>
                    {{ project.startDate ? t(project.startDate) : '' }}
                    <template v-if="project.endDate"> - {{ t(project.endDate) }}</template>
                  </span>
                </div>
                <router-link :to="`/project/${project.id}`" class="view-link">
                  <span>{{ t('projects.view_project_link') }}</span>
                  <ArrowRight :size="16" />
                </router-link>
              </div>
            </div>
          </div>

          <!-- Center Dot -->
          <div class="timeline-dot-wrapper">
            <div class="timeline-dot">
              <img :src="`${baseUrl}projet/${project.folder}/${project.logo_recadrer || project.logo}`" :alt="project.name">
            </div>
          </div>

          <!-- Spacer Side -->
          <div class="timeline-spacer">
            <div class="date-floating" :class="index % 2 === 0 ? 'right' : 'left'">
               {{ project.startDate ? t(project.startDate) : '' }}
            </div>
          </div>
=======
      <!-- Advanced Interactive Filter Bar -->
      <div class="filter-bar reveal-up">
        <div class="filter-row">
          
          <!-- Category Tabs -->
          <div class="categories-tabs">
            <button 
              @click="activeCategory = 'all'" 
              class="tab-btn" 
              :class="{ 'active': activeCategory === 'all' }"
            >
              {{ t('all_categories') }}
              <span class="count-badge">{{ categoryCounts.all }}</span>
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat" 
              @click="activeCategory = cat" 
              class="tab-btn"
              :class="[categoryStyleMap[cat].class, { 'active': activeCategory === cat }]"
            >
              <span class="tab-icon" v-html="categoryStyleMap[cat].icon"></span>
              <span class="tab-text">{{ t('projects.categories.' + categoryMap[cat]) }}</span>
              <span class="count-badge">{{ categoryCounts[cat] || 0 }}</span>
            </button>
          </div>

          <!-- Text Search Box -->
          <div class="search-box">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="searchPlaceholder" 
              class="search-input"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
              &times;
            </button>
          </div>

          <!-- Sort Toggle Button -->
          <button 
            @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'" 
            class="sort-toggle-btn"
            :title="sortLabel"
          >
            <svg 
              class="sort-icon" 
              :class="{ 'rotated': sortOrder === 'asc' }" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
            <span class="sort-text">{{ sortLabel }}</span>
          </button>
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
        </div>
      </div>

      <!-- Empty State handling -->
      <div v-if="filteredAndSortedProjects.length === 0" class="empty-state reveal-up">
        <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <h3>Aucun projet trouvé</h3>
        <p>Essayez de modifier vos filtres ou d'élargir votre recherche.</p>
        <button @click="activeCategory = 'all'; searchQuery = ''" class="reset-btn">
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Gorgeous Animated Timeline Grid -->
      <div v-else class="timeline-wrapper">
        <TransitionGroup name="timeline-list" tag="div" class="timeline">
          
          <div 
            v-for="(project, index) in filteredAndSortedProjects" 
            :key="project.id" 
            class="timeline-item" 
            :class="{ 
              'reverse': index % 2 !== 0, 
              'is-hovered': hoveredProjectId === project.id 
            }"
            @mouseenter="hoveredProjectId = project.id"
            @mouseleave="hoveredProjectId = null"
          >
            <!-- Timeline card content container (Left or Right depending on reverse) -->
            <div class="timeline-content">
              <router-link :to="`/project/${project.id}`" class="project-card-link">
                <div class="project-card" :class="categoryStyleMap[project.category].class">
                  
                  <!-- Card Visual Banner & Overlay Logo -->
                  <div class="card-banner-wrapper">
                    <img 
                      v-if="getBannerSrc(project)" 
                      :src="getBannerSrc(project)" 
                      :alt="project.name" 
                      class="card-banner" 
                      loading="lazy" 
                    />
                    <div v-else class="card-banner-fallback">
                      <div class="fallback-glow"></div>
                    </div>
                    
                    <!-- Floating Overlay Badges -->
                    <div class="card-badges">
                      <!-- Status Indicator Badge -->
                      <span v-if="project.isOngoing" class="status-badge ongoing">
                        <span class="pulse-dot"></span>
                        {{ t('projects.stats.ongoing') }}
                      </span>
                      <span v-else class="status-badge finished">
                        {{ t('projects.stats.finished') }}
                      </span>

                      <!-- Purpose Badge -->
                      <span class="purpose-badge" :class="purposeMap[project.purpose]">
                        {{ t('projects.purposes.' + purposeMap[project.purpose]) }}
                      </span>
                    </div>

                    <!-- Overlay Project Logo -->
                    <div class="card-logo-container">
                      <img :src="getLogoSrc(project)" :alt="project.name" class="card-logo" />
                    </div>
                  </div>

                  <!-- Card Text Contents -->
                  <div class="card-body">
                    
                    <!-- Chronology Dates -->
                    <div class="project-date">
                      <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>
                        {{ project.startDate ? t(project.startDate) : '' }}
                        <template v-if="project.endDate"> - {{ t(project.endDate) }}</template>
                        <template v-else-if="project.isOngoing"> - {{ t('projects.stats.ongoing') }}</template>
                      </span>
                    </div>

                    <!-- Title & Version -->
                    <div class="title-row">
                      <h3 class="project-name">{{ project.name }}</h3>
                      <span v-if="project.version" class="version-badge">{{ project.version }}</span>
                    </div>

                    <!-- Description -->
                    <p class="project-desc">{{ t(project.description) }}</p>
                    
                    <!-- Quick KPI Metrics if available -->
                    <div v-if="project.metrics && project.metrics.length > 0" class="project-mini-metrics">
                      <div 
                        v-for="metric in project.metrics.slice(0, 2)" 
                        :key="metric.labelKey" 
                        class="mini-metric"
                      >
                        <span class="metric-value">{{ metric.value }}{{ metric.suffix }}</span>
                        <span class="metric-label">{{ t(metric.labelKey) }}</span>
                      </div>
                    </div>

                    <!-- Technology badges tags -->
                    <div class="project-tags">
                      <TechBadge 
                        v-for="tag in project.tags.slice(0, 3)" 
                        :key="tag" 
                        :tech="tag" 
                        :showIcon="true"
                        class="timeline-tech-badge"
                      />
                      <span v-if="project.tags.length > 3" class="tag-more-indicator">
                        +{{ project.tags.length - 3 }}
                      </span>
                    </div>

                    <!-- Read more link button -->
                    <div class="card-footer">
                      <span class="view-link">
                        {{ t('projects.view_project_link') }}
                      </span>
                    </div>

                  </div>
                </div>
              </router-link>
            </div>

            <!-- Central Timeline Node / Dot -->
            <div class="timeline-dot-wrapper">
              <div 
                class="timeline-dot-outer" 
                :class="[categoryStyleMap[project.category].class, { 'active-glow': hoveredProjectId === project.id }]"
              >
                <div class="timeline-dot-inner" v-html="categoryStyleMap[project.category].icon"></div>
              </div>
            </div>

            <!-- Empty space to align timeline structure -->
            <div class="timeline-spacer"></div>

          </div>
        </TransitionGroup>
      </div>

    </div>
  </div>
</template>

<style scoped>
.mx-auto { margin-left: auto; margin-right: auto; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.max-w-6xl { max-width: 1152px; }

.timeline-container {
  min-height: 100vh;
  background: var(--color-background);
<<<<<<< HEAD
  color: var(--color-text);
  overflow-x: hidden;
  width: 100%;
=======
  transition: background 0.5s ease;
  overflow-x: hidden;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}

/* Header styling */
.header-section {
  text-align: center;
<<<<<<< HEAD
  margin-bottom: 6rem;
=======
  margin-bottom: 4rem;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}

.title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
<<<<<<< HEAD
=======
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.7;
  max-width: 600px;
  margin: 0 auto;
}

/* Premium Filter Bar Design */
.filter-bar {
  background: rgba(var(--primary-rgb), 0.02);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 1rem;
  margin-bottom: 5rem;
  box-shadow: var(--shadow-sm);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.categories-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* Dynamic Active Category Color Themes */
.tab-btn.active {
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb), 0.3);
}

.tab-btn.active:not(.cat-web):not(.cat-ia):not(.cat-software):not(.cat-games) {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
}

.tab-btn.cat-web.active {
  background: #3b82f6;
  box-shadow: 0 8px 16px -4px rgba(59, 130, 246, 0.4);
}

.tab-btn.cat-ia.active {
  background: #10b981;
  box-shadow: 0 8px 16px -4px rgba(16, 185, 129, 0.4);
}

.tab-btn.cat-software.active {
  background: #8b5cf6;
  box-shadow: 0 8px 16px -4px rgba(139, 92, 246, 0.4);
}

.tab-btn.cat-games.active {
  background: #f97316;
  box-shadow: 0 8px 16px -4px rgba(249, 115, 22, 0.4);
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.tab-btn.active .tab-icon {
  opacity: 1;
}

.count-badge {
  background: rgba(0, 0, 0, 0.08);
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  transition: background 0.3s ease;
}

.dark .count-badge {
  background: rgba(255, 255, 255, 0.1);
}

.tab-btn.active .count-badge {
  background: rgba(255, 255, 255, 0.2);
}

/* Search bar styling */
.search-box {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.65rem 1rem 0.65rem 2.8rem;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 550;
  border-radius: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary);
  background: var(--color-background);
  box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text);
  opacity: 0.5;
  pointer-events: none;
}

.clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: var(--color-text);
  font-size: 1.25rem;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.clear-btn:hover {
  opacity: 0.9;
}

/* Sort toggle button */
.sort-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-toggle-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.sort-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sort-icon.rotated {
  transform: rotate(180deg);
}

/* Empty state page */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-background-soft);
  border: 1px dashed var(--color-border);
  border-radius: 24px;
  margin-top: 2rem;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--color-text);
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.empty-state p {
  opacity: 0.6;
  margin-bottom: 1.5rem;
}

.reset-btn {
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.3);
}

/* Timeline Layout */
.timeline-wrapper {
  position: relative;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.7;
  max-width: 600px;
  margin: 0 auto 3rem;
}

/* Filters */
.filter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.6;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.filter-chip {
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-chip:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.filter-chip.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

/* Timeline */
.timeline {
  position: relative;
  padding: 2rem 0;
  width: 100%;
}

/* Core central timeline line */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
<<<<<<< HEAD
  width: 2px;
  background: linear-gradient(to bottom,
    transparent,
    var(--color-border) 10%,
    var(--color-border) 90%,
    transparent
=======
  width: 3px;
  background: linear-gradient(
    to bottom, 
    rgba(var(--primary-rgb), 0.1) 0%, 
    rgba(var(--primary-rgb), 0.8) 15%, 
    rgba(var(--accent-rgb), 0.8) 85%, 
    rgba(var(--accent-rgb), 0.1) 100%
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
  );
  transform: translateX(-50%);
  border-radius: 99px;
}

/* Timeline row items */
.timeline-item {
  display: flex;
<<<<<<< HEAD
  margin-bottom: 8rem;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 100%;
}

.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
=======
  width: 100%;
  margin-bottom: 6rem;
  align-items: center;
  position: relative;
  transition: all 0.5s ease;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}

.timeline-item.reverse {
  flex-direction: row-reverse;
}

.timeline-content {
<<<<<<< HEAD
  flex: 1;
  position: relative;
=======
  flex: 0 0 50%;
  min-width: 0;
  padding-right: 3.5rem;
  box-sizing: border-box;
  perspective: 1000px;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
  display: flex;
  justify-content: flex-end;
}

.timeline-item.reverse .timeline-content {
<<<<<<< HEAD
=======
  padding-right: 0;
  padding-left: 3.5rem;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
  justify-content: flex-start;
}

.timeline-spacer {
<<<<<<< HEAD
  flex: 1;
  display: flex;
  align-items: center;
}

.date-floating {
  font-size: 1.5rem;
  font-weight: 800;
  opacity: 0.15;
  white-space: nowrap;
  user-select: none;
}

.date-floating.right { margin-left: 3rem; }
.date-floating.left { margin-right: 3rem; text-align: right; width: 100%; }

.timeline-dot-wrapper {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.timeline-dot {
  width: 50px;
  height: 50px;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  background-color: var(--color-background);
}

.timeline-dot img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.1) rotate(5deg);
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.2);
}

/* Project Card */
=======
  flex: 0 0 50%;
}

.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  max-width: 480px;
}

/* Premium glassmorphic card design */
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
.project-card {
  background: rgba(var(--vt-c-white-soft), 0.7);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.05);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  backdrop-filter: blur(12px);
  position: relative;
}

.dark .project-card {
  background: rgba(var(--vt-c-black-soft), 0.65);
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

/* Hover effects with dynamic category colors */
.timeline-item.is-hovered .project-card {
  transform: translateY(-10px) scale(1.015);
}

/* Dynamic Card Hover Shadow and Borders */
.timeline-item.is-hovered .project-card.cat-web {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 20px 40px -15px rgba(59, 130, 246, 0.2);
}

.timeline-item.is-hovered .project-card.cat-ia {
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 20px 40px -15px rgba(16, 185, 129, 0.2);
}

.timeline-item.is-hovered .project-card.cat-software {
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 20px 40px -15px rgba(139, 92, 246, 0.2);
}

.timeline-item.is-hovered .project-card.cat-games {
  border-color: rgba(249, 115, 22, 0.4);
  box-shadow: 0 20px 40px -15px rgba(249, 115, 22, 0.2);
}

/* Banner Layout styling */
.card-banner-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: var(--color-background-soft);
<<<<<<< HEAD
  padding: 0;
  border-radius: 24px;
  border: 1px solid var(--color-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  max-width: 480px;
  width: 100%;
}

.timeline-item:not(.reverse) .project-card {
  margin-right: 2rem;
}

.timeline-item.reverse .project-card {
  margin-left: 2rem;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: var(--primary);
  box-shadow: var(--shadow-xl);
}

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.project-name {
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1.2;
}

.project-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  background: var(--color-background-mute);
  border-radius: 100px;
  opacity: 0.8;
}

.project-status.ongoing {
  color: var(--orange);
  background: rgba(249, 115, 22, 0.1);
}

.card-body {
  padding: 0 1.5rem 1.5rem;
=======
}

.card-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.timeline-item.is-hovered .card-banner {
  transform: scale(1.08) rotate(0.5deg);
}

.card-banner-fallback {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Visual identity fallback gradient themes */
.project-card.cat-web .card-banner-fallback {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}

.project-card.cat-ia .card-banner-fallback {
  background: linear-gradient(135deg, #064e3b 0%, #10b981 100%);
}

.project-card.cat-software .card-banner-fallback {
  background: linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%);
}

.project-card.cat-games .card-banner-fallback {
  background: linear-gradient(135deg, #7c2d12 0%, #f97316 100%);
}

.fallback-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
}

/* Badges styling overlay */
.card-badges {
  position: absolute;
  top: 1rem;
  left: 1.2rem;
  right: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.status-badge.ongoing {
  background: rgba(16, 185, 129, 0.85);
  color: white;
}

.status-badge.finished {
  background: rgba(0, 0, 0, 0.45);
  color: #e2e8f0;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background-color: #34d399;
  border-radius: 50%;
  animation: blinker 1.8s infinite;
}

@keyframes blinker {
  0%, 100% { opacity: 0.2; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.15); }
}

.purpose-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .purpose-badge {
  background: rgba(15, 23, 42, 0.85);
  color: #f1f5f9;
}

.purpose-badge.education {
  border-left: 3px solid #3b82f6;
}

.purpose-badge.personnel {
  border-left: 3px solid #10b981;
}

.purpose-badge.professionnel {
  border-left: 3px solid #8b5cf6;
}

/* Floating overlay logo */
.card-logo-container {
  position: absolute;
  bottom: -24px;
  left: 24px;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: var(--color-background);
  border: 3px solid var(--color-background);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
  transition: all 0.3s ease;
}

.timeline-item.is-hovered .card-logo-container {
  transform: translateY(-3px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.card-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--color-background-soft);
}

/* Card content body */
.card-body {
  padding: 2.2rem 1.8rem 1.8rem;
}

.project-date {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0.9;
  margin-bottom: 0.8rem;
}

.date-icon {
  width: 14px;
  height: 14px;
}

.project-card.cat-web .project-date { color: #3b82f6; }
.project-card.cat-ia .project-date { color: #10b981; }
.project-card.cat-software .project-date { color: #8b5cf6; }
.project-card.cat-games .project-date { color: #f97316; }

.title-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}

.project-name {
  font-size: 1.45rem;
  font-weight: 850;
  color: var(--color-heading);
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.25;
  transition: color 0.3s ease;
}

<<<<<<< HEAD
.project-preview {
  width: 100%;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border);
}

.project-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-preview img {
  transform: scale(1.05);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
=======
.timeline-item.is-hovered .project-name {
  color: var(--primary);
}

.version-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
}

.project-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.78;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Micro KPIs inside timeline card */
.project-mini-metrics {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.dark .project-mini-metrics {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.02);
}

.mini-metric {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 1.05rem;
  font-weight: 850;
  color: var(--color-heading);
  line-height: 1.1;
}

.metric-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.5;
  letter-spacing: 0.3px;
  margin-top: 0.15rem;
}

/* Technologies tag badges */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
  gap: 0.5rem;
}

<<<<<<< HEAD
.tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  background: var(--color-background-mute);
  border-radius: 6px;
  color: var(--color-text);
  font-weight: 600;
}

.card-footer {
  padding: 1.2rem 1.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.6;
}

.view-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 800;
  text-decoration: none;
  font-size: 0.9rem;
  transition: gap 0.2s ease;
}

.view-link:hover {
  gap: 0.8rem;
}

/* Dark mode adjustments */
[data-theme='dark'] .card-footer {
  background: rgba(255, 255, 255, 0.02);
}

/* Responsive */
@media (max-width: 1024px) {
  .date-floating { display: none; }
}

@media (max-width: 768px) {
  .timeline::before { left: 30px; }
  .timeline-item { flex-direction: row !important; margin-bottom: 4rem; }
  .timeline-content {
    width: 100%;
    padding: 0 0 0 4rem;
    justify-content: flex-start !important;
  }
  .timeline-spacer { display: none; }
  .timeline-dot-wrapper {
    position: absolute;
    left: 30px;
    top: 0;
    transform: translateX(-50%);
    height: 100%;
    width: 60px;
  }
  .timeline-dot {
    width: 40px;
    height: 40px;
  }
  .project-card {
    margin: 0 !important;
    max-width: 100%;
  }
  .title { font-size: 2.5rem; }
=======
.timeline-tech-badge {
  transform: none !important;
  font-size: 0.75rem !important;
  padding: 0.35rem 0.75rem !important;
}

.tag-more-indicator {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.35rem 0.6rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  opacity: 0.6;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  padding-top: 1rem;
  margin-top: 1rem;
}

.dark .card-footer {
  border-color: rgba(255, 255, 255, 0.03);
}

.view-link {
  font-size: 0.825rem;
  font-weight: 750;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.timeline-item.is-hovered .view-link {
  transform: translateX(4px);
}

/* Timeline dot wrapper */
.timeline-dot-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Category themed dots design */
.timeline-dot-outer {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-background);
  border: 3px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: var(--color-text);
  opacity: 0.85;
}

/* Scale up and pulse outer dot when item is hovered */
.timeline-dot-outer.active-glow {
  transform: scale(1.18);
  opacity: 1;
  border-color: transparent !important;
  color: white !important;
}

/* Dot category colors mapping */
.timeline-dot-outer.cat-web.active-glow {
  background: #3b82f6;
  box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.25), 0 0 15px rgba(59, 130, 246, 0.4);
}

.timeline-dot-outer.cat-ia.active-glow {
  background: #10b981;
  box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.25), 0 0 15px rgba(16, 185, 129, 0.4);
}

.timeline-dot-outer.cat-software.active-glow {
  background: #8b5cf6;
  box-shadow: 0 0 0 5px rgba(139, 92, 246, 0.25), 0 0 15px rgba(139, 92, 246, 0.4);
}

.timeline-dot-outer.cat-games.active-glow {
  background: #f97316;
  box-shadow: 0 0 0 5px rgba(249, 115, 22, 0.25), 0 0 15px rgba(249, 115, 22, 0.4);
}

.timeline-dot-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Vue filtering animations */
.timeline-list-enter-active,
.timeline-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-list-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.timeline-list-leave-to {
  opacity: 0;
  transform: scale(0.92);
  position: absolute;
  width: 100%;
}

.timeline-list-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive queries */
@media (max-width: 1024px) {
  .timeline-content {
    padding-right: 2rem;
  }
  
  .timeline-item.reverse .timeline-content {
    padding-left: 2rem;
  }
}

@media (max-width: 768px) {
  .header-section {
    margin-bottom: 2.5rem;
  }
  
  .filter-bar {
    padding: 0.8rem;
    border-radius: 20px;
    margin-bottom: 3rem;
  }
  
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .categories-tabs {
    justify-content: flex-start;
  }
  
  .search-box {
    max-width: 100%;
  }

  /* Reposition timeline guide tracks on mobile to the left */
  .timeline::before { 
    left: 20px; 
    transform: translateX(-50%);
  }
  
  .timeline-item { 
    flex-direction: row !important; 
    margin-bottom: 4rem;
  }
  
  .timeline-content { 
    width: 100%; 
    padding: 0 0 0 3.5rem !important; 
    justify-content: flex-start;
  }
  
  .project-card-link {
    max-width: 100%;
  }
  
  .timeline-spacer { 
    display: none; 
  }
  
  .timeline-dot-wrapper { 
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    z-index: 10;
  }
  
  .timeline-dot-outer {
    width: 40px;
    height: 40px;
  }
  
  .project-card { 
    max-width: 100%; 
  }
>>>>>>> 4c9c256 (feat: implement project metrics feature with localized labels and data integration)
}
</style>
