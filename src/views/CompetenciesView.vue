<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects, type Competency, type Project } from '@/data/projects'
import { categoryColors, categoryKeyMap, getBgColor, parseAC } from '@/utils/competencies'
import { useSafeIntersectionObserver } from '@/composables/useSafeIntersectionObserver'

const { t } = useI18n()

interface CompetencyWithProjects extends Competency {
  projects: Project[]
}

const competenciesByCategory = computed(() => {
  const grouped: Record<string, CompetencyWithProjects[]> = {}

  projects.forEach(project => {
    if (!project.competencies) return

    project.competencies.forEach(comp => {
      grouped[comp.category] = grouped[comp.category] || []
      let existingComp = grouped[comp.category]!.find(c => c.level === comp.level)

      if (!existingComp) {
        existingComp = {
          category: comp.category,
          level: comp.level,
          items: [...comp.items],
          projects: [project]
        }
        grouped[comp.category]!.push(existingComp)
      } else {
        comp.items.forEach(item => {
          if (!existingComp!.items.includes(item)) {
            existingComp!.items.push(item)
          }
        })
        if (!existingComp.projects.find(p => p.id === project.id)) {
          existingComp.projects.push(project)
        }
      }
    })
  })

  Object.keys(grouped).forEach(cat => {
    if (grouped[cat]) {
      grouped[cat]!.sort((a, b) => a.level.localeCompare(b.level))
    }
  })

  return grouped
})

const isLevelValidated = (category: string, level: string) => {
  return competenciesByCategory.value[category]?.some(c => c.level === level)
}

const categoryOrder = ['Réaliser', 'Optimiser', 'Administrer', 'Gérer', 'Conduire', 'Collaborer']

const baseUrl = import.meta.env.BASE_URL;

const getProjectLogo = (project: Project) => {
  const logo = project.logo_recadrer || project.logo
  return logo.startsWith('http') ? logo : `${baseUrl}projet/${project.folder}/${logo}`
}

const activeCategory = ref(categoryOrder[0])

const scrollToCategory = (category: string) => {
  const element = document.getElementById(`category-${categoryKeyMap[category]}`)
  if (element) {
    const offset = 100
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const { observe } = useSafeIntersectionObserver()

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }

  const elements: Element[] = []
  categoryOrder.forEach(category => {
    const el = document.getElementById(`category-${categoryKeyMap[category]}`)
    if (el) elements.push(el)
  })

  if (elements.length > 0) {
    observe(elements, (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const catKey = entry.target.id.replace('category-', '')
          const cat = Object.keys(categoryKeyMap).find(key => categoryKeyMap[key] === catKey)
          if (cat) activeCategory.value = cat
        }
      })
    }, observerOptions)
  }
})
</script>

<template>
  <div class="competencies-page">
    <!-- Background Decor -->
    <div class="bg-decor">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="container">
      <AppPageHeader 
        :title="t('competencies.title')"
        :subtitle="t('competencies.subtitle')"
        centered
      />

      <!-- Quick Navigator -->
      <div class="category-nav-wrapper reveal-up">
        <nav class="category-nav">
          <button 
            v-for="category in categoryOrder" 
            :key="category"
            v-show="competenciesByCategory[category] && competenciesByCategory[category].length > 0"
            class="nav-item"
            :class="{ active: activeCategory === category }"
            @click="scrollToCategory(category)"
            :style="activeCategory === category ? { color: categoryColors[category] } : {}"
          >
            <span class="nav-dot" :style="{ backgroundColor: categoryColors[category] }"></span>
            {{ category.split(' ')[0] }}
          </button>
        </nav>
      </div>

      <div class="dashboard-grid reveal-up">
        <div 
          v-for="category in categoryOrder" 
          :key="category" 
          v-show="competenciesByCategory[category] && competenciesByCategory[category].length > 0"
          class="stat-card" 
          @click="scrollToCategory(category)"
        >
          <div class="stat-icon-wrapper" :style="{ backgroundColor: getBgColor(category), color: categoryColors[category] }">
            <svg v-if="category === 'Réaliser'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <svg v-else-if="category === 'Optimiser'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <svg v-else-if="category === 'Administrer'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line></svg>
            <svg v-else-if="category === 'Gérer'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            <svg v-else-if="category === 'Conduire'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            <svg v-else-if="category === 'Collaborer'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="stat-details">
            <h3 class="stat-name">{{ category }}</h3>
            <div class="stat-progress-dots">
              <div 
                v-for="level in (['Réaliser', 'Conduire', 'Collaborer'].includes(category) ? ['Niveau 1', 'Niveau 2', 'Niveau 3'] : ['Niveau 1', 'Niveau 2'])" 
                :key="level"
                class="prog-dot"
                :class="{ filled: isLevelValidated(category, level) }"
                :style="isLevelValidated(category, level) ? { backgroundColor: categoryColors[category], boxShadow: `0 0 12px ${categoryColors[category]}40` } : {}"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Detail -->
      <div class="categories-flow">
        <div
          v-for="category in categoryOrder"
          :key="category"
          v-show="competenciesByCategory[category] && competenciesByCategory[category].length > 0"
          :id="`category-${categoryKeyMap[category]}`"
          class="category-block reveal-up"
        >
          <div class="block-header">
            <div class="header-main">
              <div class="category-badge" :style="{ backgroundColor: categoryColors[category] }">
                {{ category }}
              </div>
              <h2 class="block-title">{{ t('competencies.categories.' + categoryKeyMap[category]) }}</h2>
            </div>
            <div class="header-line" :style="{ background: `linear-gradient(90deg, ${categoryColors[category]}, transparent)` }"></div>
          </div>

          <div class="competencies-grid">
            <div
              v-for="(comp, index) in competenciesByCategory[category]"
              :key="index"
              class="competency-glass-card"
            >
              <div class="card-top">
                <div class="level-tag" :style="{ color: categoryColors[category], backgroundColor: getBgColor(category) }">
                  {{ t('competencies.levels.' + (comp.level === 'Niveau 1' ? 'n1' : comp.level === 'Niveau 2' ? 'n2' : 'n3')) }}
                </div>
                <div class="status-badge">
                  <span class="pulse-dot"></span>
                  Validé
                </div>
              </div>

              <div class="card-content">
                <div class="ac-list-modern">
                  <div v-for="item in comp.items" :key="item" class="ac-item-modern">
                    <div class="ac-header-modern">
                      <span class="ac-id-modern" :style="{ borderLeftColor: categoryColors[category] }">
                        {{ parseAC(t(item)).code }}
                      </span>
                      <p class="ac-title-modern">{{ parseAC(t(item)).title }}</p>
                    </div>
                    <div v-if="parseAC(t(item)).context" class="ac-context-modern">
                      <div class="context-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        MISE EN ŒUVRE
                      </div>
                      <p>{{ parseAC(t(item)).context }}</p>
                    </div>
                  </div>
                </div>

                <div class="associated-projects-modern">
                  <h4 class="footer-label">{{ t('competencies.associated_projects') }}</h4>
                  <div class="mini-project-list">
                    <RouterLink
                      v-for="project in comp.projects"
                      :key="project.id"
                      :to="{ name: 'project-detail', params: { id: project.id } }"
                      class="mini-project-link"
                    >
                      <img :src="getProjectLogo(project)" :alt="project.name" class="mini-logo" />
                      <span class="mini-name">{{ project.name }}</span>
                      <svg class="mini-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-actions reveal-up">
        <RouterLink to="/projects" class="btn-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
          {{ t('competencies.back_to_projects') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.competencies-page {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

/* Background Decor */
.bg-decor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--primary-rgb) 0%, transparent 70%);
  filter: blur(80px);
  opacity: 0.05;
  border-radius: 50%;
}

.blob-1 { top: -100px; right: -100px; }
.blob-2 { bottom: -100px; left: -100px; opacity: 0.03; }

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-heading) 30%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Navigation */
.category-nav-wrapper {
  position: sticky;
  top: 80px;
  z-index: 100;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
}

.category-nav {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(var(--color-background-soft), 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  box-shadow: var(--shadow-lg);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background: transparent;
  color: var(--color-text);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(var(--primary-rgb), 0.1);
}

.nav-item.active {
  background: var(--color-background);
  box-shadow: var(--shadow-sm);
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.nav-item.active .nav-dot {
  opacity: 1;
  transform: scale(1.5);
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-bottom: 6rem;
}

.stat-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary);
  background: var(--color-background);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.4rem;
  background: var(--color-background-mute);
  transition: all 0.4s ease;
}

.stat-card:hover .stat-icon-wrapper {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.stat-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.stat-progress-dots {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
}

.prog-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.prog-dot.filled {
  transform: scale(1.2);
}

/* Category Blocks */
.category-block {
  margin-bottom: 8rem;
}

.block-header {
  margin-bottom: 3rem;
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-badge {
  align-self: flex-start;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: var(--shadow-sm);
}

.block-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-heading);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.header-line {
  height: 3px;
  width: 100%;
  border-radius: 3px;
}

/* Competency Grid */
.competencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
}

.competency-glass-card {
  background: rgba(var(--color-background-soft), 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  border-radius: 32px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.4s ease;
}

.competency-glass-card:hover {
  background: var(--color-background-soft);
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-tag {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* AC Modern List */
.ac-list-modern {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.ac-item-modern {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ac-header-modern {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.ac-id-modern {
  font-size: 0.7rem;
  font-weight: 900;
  padding: 0.2rem 0.5rem;
  border-left: 3px solid;
  color: var(--color-heading);
  background: var(--color-background-mute);
  white-space: nowrap;
}

.ac-title-modern {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.4;
}

.ac-context-modern {
  margin-left: 1rem;
  padding-left: 1.5rem;
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.context-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.7;
}

.ac-context-modern p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

/* Projects Footer */
.associated-projects-modern {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px dashed var(--color-border);
}

.footer-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  letter-spacing: 0.05em;
}

.mini-project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.mini-project-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mini-project-link:hover {
  border-color: var(--primary);
  background: var(--color-background-soft);
  transform: scale(1.02);
}

.mini-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
}

.mini-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-heading);
}

.mini-arrow {
  margin-left: auto;
  opacity: 0;
  color: var(--primary);
  transition: all 0.3s ease;
}

.mini-project-link:hover .mini-arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* Footer Actions */
.footer-actions {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: var(--color-heading);
  color: var(--color-background);
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  filter: brightness(1.2);
}

/* Responsive */
@media (max-width: 1024px) {
  .competencies-grid { grid-template-columns: 1fr; }
  .category-nav-wrapper { top: 70px; }
  .nav-item span:not(.nav-dot) { display: none; }
  .nav-item { padding: 0.6rem; }
}

@media (max-width: 768px) {
  .competencies-page { padding-top: 6rem; }
  .block-title { font-size: 1.8rem; }
  .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .category-nav { gap: 0.2rem; }
}

/* Reveal Animations */
.reveal-up {
  animation: reveal-up 1s cubic-bezier(0.23, 1, 0.32, 1) backwards;
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
