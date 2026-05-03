<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects, type ProjectCategory } from '@/data/projects'
import {
  Calendar,
  ArrowRight,
  Tag,
  Filter,
  Code,
  Cpu,
  Gamepad2,
  Box,
  CheckCircle2,
  Clock
} from 'lucide-vue-next'

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL

const selectedCategory = ref<ProjectCategory | 'All'>('All')
const categories: (ProjectCategory | 'All')[] = ['All', 'Dev Web', 'IA', 'Jeux Vidéo', 'Logiciel']

const filteredProjects = computed(() => {
  let result = [...projects]

  if (selectedCategory.value !== 'All') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  return result.sort((a, b) => {
    const dateA = a.startDateStr || '0'
    const dateB = b.startDateStr || '0'
    return dateB.localeCompare(dateA)
  })
})

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Dev Web': return Code
    case 'IA': return Cpu
    case 'Jeux Vidéo': return Gamepad2
    case 'Logiciel': return Box
    default: return Code
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Dev Web': return 'var(--blue)'
    case 'IA': return 'var(--purple)'
    case 'Jeux Vidéo': return 'var(--orange)'
    case 'Logiciel': return 'var(--emerald)'
    default: return 'var(--primary)'
  }
}

const getProjectImage = (project: any) => {
  if (!project.images || project.images.length === 0) return ''
  let imageName = project.images[0]
  if (project.id === 'project-3' && imageName === 'live_capture.webp') {
    imageName = 'capital-wars.webp'
  }
  return `${baseUrl}projet/${project.folder}/${imageName}`
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const initObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el))
}

onMounted(() => {
  initObserver()
})
</script>

<template>
  <div class="timeline-container">
    <div class="max-w-6xl mx-auto px-8 py-16">
      <header class="header-section">
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
        </div>
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
  color: var(--color-text);
  overflow-x: hidden;
  width: 100%;
}

.header-section {
  text-align: center;
  margin-bottom: 6rem;
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

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent,
    var(--color-border) 10%,
    var(--color-border) 90%,
    transparent
  );
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
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
}

.timeline-item.reverse {
  flex-direction: row-reverse;
}

.timeline-content {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.timeline-item.reverse .timeline-content {
  justify-content: flex-start;
}

.timeline-spacer {
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
.project-card {
  background: var(--color-background-soft);
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
}

.project-desc {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

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
  gap: 0.5rem;
}

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
}
</style>
