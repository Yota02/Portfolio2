<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProjectById, categoryMap, type ProjectCategory } from '@/data/projects'
import TechBadge from '@/components/TechBadge.vue'

const { t } = useI18n()
const router = useRouter()
const baseUrl = import.meta.env.BASE_URL

// Victoria is the central project; the others orbit around it
const CORE_ID = 'project-7'
const satelliteIds = [
  'project-13',            // Loom — infrastructure
  'project-6',             // Img Classifier — AI building block (vision)
  'project-1779285718375', // Yomu — application
]

function getLogoSrc(project: any) {
  const logo = project.logo_recadrer || project.logo
  return logo.startsWith('http') ? logo : `${baseUrl}projet/${project.folder}/${logo}`
}

const goToProject = (id: string) => router.push({ name: 'project-detail', params: { id } })

const catColor = (cat: string) => (cat === 'IA' ? 'var(--accent)' : 'var(--primary)')

// ----------------------------------------------------
// STATIC LAYOUT — sober hub & branches diagram
// ----------------------------------------------------
const core = { x: 210, y: 300, r: 74 }

const coreProject = getProjectById(CORE_ID)!

const nodes = computed(() => {
  const list = satelliteIds.map(id => getProjectById(id)).filter((p): p is any => !!p)
  const n = list.length
  const top = 130
  const bottom = 470
  return list.map((project, i) => ({
    id: project.id,
    project,
    logo: getLogoSrc(project),
    x: 590,
    y: n <= 1 ? 300 : top + (bottom - top) * (i / (n - 1)),
    r: 52,
  }))
})

// ----------------------------------------------------
// INTERACTION
// ----------------------------------------------------
const hoveredId = ref<string | null>(null)
const selectedId = ref<string | null>(null)

const activeId = computed(() => hoveredId.value || selectedId.value || 'core')
const isCoreActive = computed(() => activeId.value === 'core')

const selectNode = (id: string) => {
  selectedId.value = selectedId.value === id ? null : id
}

const isDimmed = (id: string) => activeId.value !== 'core' && activeId.value !== id

// ----------------------------------------------------
// CONNECTORS (gentle static S-curves)
// ----------------------------------------------------
const getPathD = (node: { x: number; y: number; r: number }) => {
  const x1 = core.x + core.r
  const y1 = core.y
  const x2 = node.x - node.r
  const y2 = node.y
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
}

const getMid = (node: { x: number; y: number; r: number }) => {
  const x1 = core.x + core.r
  const x2 = node.x - node.r
  return { x: (x1 + x2) / 2, y: (core.y + node.y) / 2 }
}

// ----------------------------------------------------
// ACTIVE ENTITY (for the side panel)
// ----------------------------------------------------
const activeProject = computed(() => {
  if (isCoreActive.value) return coreProject
  return nodes.value.find(n => n.id === activeId.value)?.project ?? coreProject
})

const activeRoleTag = computed(() =>
  isCoreActive.value ? t('ecosystem.core_tag') : t(`ecosystem.roles.${activeId.value}.tag`)
)
const activeRoleDesc = computed(() =>
  isCoreActive.value ? t('ecosystem.core_desc') : t(`ecosystem.roles.${activeId.value}.desc`)
)
const activeDesc = computed(() =>
  isCoreActive.value ? t('common.ecosystem_desc') : t(activeProject.value.description)
)
const activeCategory = computed(() =>
  t(`projects.categories.${categoryMap[activeProject.value.category as ProjectCategory] || 'ia'}`)
)

const roleTag = (id: string) => t(`ecosystem.roles.${id}.tag`)
</script>

<template>
  <div class="ecosystem-page">
    <div class="container">
      <header class="header">
        <RouterLink to="/projects" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('common.back') }}</span>
        </RouterLink>
        <div class="header-text">
          <h1 class="page-title">{{ t('common.ecosystem_title') }}</h1>
          <p class="page-subtitle">{{ t('common.ecosystem_intro') }}</p>
        </div>
      </header>

      <div class="ecosystem-layout">
        <!-- Diagram -->
        <div class="graph-column">
          <div class="graph-legend">
            <div class="legend-item">
              <span class="legend-dot core-dot"></span>
              <span>{{ t('common.ecosystem_core') }}</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" :style="{ background: 'var(--accent)' }"></span>
              <span>{{ t('common.ecosystem_zone_ia') }}</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" :style="{ background: 'var(--primary)' }"></span>
              <span>{{ t('common.ecosystem_zone_software') }}</span>
            </div>
          </div>

          <div class="graph-wrapper">
            <svg viewBox="0 0 800 600" class="ecosystem-graph" preserveAspectRatio="xMidYMid meet">
              <!-- Connectors + relation labels -->
              <g class="connections-layer">
                <g v-for="node in nodes" :key="'conn-' + node.id"
                   :style="{ '--cat': catColor(node.project.category) }">
                  <path :d="getPathD(node)" class="connector"
                        :class="{ 'is-active': activeId === node.id, 'is-dimmed': isDimmed(node.id) }" />
                  <g class="relation-tag"
                     :class="{ 'is-active': activeId === node.id, 'is-dimmed': isDimmed(node.id) }"
                     :transform="`translate(${getMid(node).x}, ${getMid(node).y})`">
                    <rect x="-58" y="-13" width="116" height="26" rx="13" class="relation-bg" />
                    <text text-anchor="middle" dominant-baseline="middle" class="relation-text">
                      {{ roleTag(node.id) }}
                    </text>
                  </g>
                </g>
              </g>

              <!-- Core node (Victoria) -->
              <g class="node core-node" :class="{ 'is-active': isCoreActive }"
                 @mouseenter="hoveredId = 'core'"
                 @mouseleave="hoveredId = null"
                 @click="selectedId = null">
                <defs>
                  <clipPath id="clip-core">
                    <circle :cx="core.x" :cy="core.y" :r="core.r - 8" />
                  </clipPath>
                </defs>
                <circle :cx="core.x" :cy="core.y" :r="core.r + 8" class="core-halo" />
                <circle :cx="core.x" :cy="core.y" :r="core.r" class="core-ring" />
                <circle :cx="core.x" :cy="core.y" :r="core.r - 8" class="core-fill" />
                <image :href="getLogoSrc(coreProject)"
                       :x="core.x - (core.r - 8)" :y="core.y - (core.r - 8)"
                       :width="(core.r - 8) * 2" :height="(core.r - 8) * 2"
                       clip-path="url(#clip-core)" class="node-logo" />
                <rect :x="core.x - 64" :y="core.y + core.r + 10" width="128" height="28" rx="14" class="core-label-bg" />
                <text :x="core.x" :y="core.y + core.r + 25" text-anchor="middle" class="core-label">Victoria</text>
              </g>

              <!-- Satellite nodes -->
              <g v-for="node in nodes" :key="node.id"
                 class="node satellite-node"
                 :class="{ 'is-active': activeId === node.id, 'is-dimmed': isDimmed(node.id) }"
                 :style="{ '--cat': catColor(node.project.category) }"
                 @mouseenter="hoveredId = node.id"
                 @mouseleave="hoveredId = null"
                 @click="selectNode(node.id)">
                <defs>
                  <clipPath :id="'clip-' + node.id">
                    <circle :cx="node.x" :cy="node.y" :r="node.r - 6" />
                  </clipPath>
                </defs>
                <circle :cx="node.x" :cy="node.y" :r="node.r" class="node-ring" />
                <circle :cx="node.x" :cy="node.y" :r="node.r - 6" class="node-fill" />
                <image :href="node.logo"
                       :x="node.x - (node.r - 6)" :y="node.y - (node.r - 6)"
                       :width="(node.r - 6) * 2" :height="(node.r - 6) * 2"
                       :clip-path="'url(#clip-' + node.id + ')'" class="node-logo" />
                <rect :x="node.x - 62" :y="node.y + node.r + 8" width="124" height="26" rx="13" class="node-label-bg" />
                <text :x="node.x" :y="node.y + node.r + 21" text-anchor="middle" class="node-label">
                  {{ node.project.name }}
                </text>
              </g>
            </svg>
          </div>

          <p class="graph-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ t('common.ecosystem_hint') }}</span>
          </p>
        </div>

        <!-- Details panel -->
        <div class="info-column">
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeId" class="info-card">
              <div class="info-top">
                <span class="role-pill" :style="{ '--cat': catColor(activeProject.category) }">{{ activeRoleTag }}</span>
                <span class="info-category">{{ activeCategory }}</span>
              </div>

              <div class="info-header">
                <div class="info-logo-wrapper">
                  <img :src="getLogoSrc(activeProject)" :alt="activeProject.name" class="info-logo" />
                </div>
                <div class="info-title-group">
                  <h2 class="info-title">{{ activeProject.name }}</h2>
                  <span v-if="activeProject.version" class="info-version">v{{ activeProject.version }}</span>
                </div>
              </div>

              <!-- The "logic" / relationship to the ecosystem -->
              <p class="role-desc">{{ activeRoleDesc }}</p>

              <div class="info-divider"></div>

              <p class="info-desc">{{ activeDesc }}</p>

              <div v-if="activeProject.features && activeProject.features.length" class="info-section">
                <h4 class="section-subtitle">{{ t('projects.features') }}</h4>
                <ul class="features-list">
                  <li v-for="(feat, idx) in activeProject.features.slice(0, 3)" :key="idx" class="feature-item">
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ t(feat) }}</span>
                  </li>
                </ul>
              </div>

              <div class="info-section">
                <h4 class="section-subtitle">Technologies</h4>
                <div class="techs-badges-grid">
                  <TechBadge v-for="tech in activeProject.tags" :key="tech" :tech="tech" :show-icon="true" />
                </div>
              </div>

              <div class="info-action">
                <button class="action-btn" @click="goToProject(activeProject.id)">
                  <span>{{ t('projects.view_project_link') }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ecosystem-page {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--color-background);
  color: var(--color-text);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.back-btn:hover {
  border-color: var(--primary);
  transform: translateX(-4px);
}

.page-title {
  font-size: 2.6rem;
  font-weight: 850;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-soft);
  max-width: 720px;
}

/* Layout */
.ecosystem-layout {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.graph-column {
  width: 100%;
}

/* Legend */
.graph-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 1rem;
  padding: 0.7rem 1.1rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 650;
  color: var(--color-text-soft);
}

.legend-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-dot.core-dot {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
}

/* Diagram surface */
.graph-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
}

.ecosystem-graph {
  width: 100%;
  height: 100%;
}

/* Connectors */
.connector {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 2;
  opacity: 0.9;
  transition: stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease;
}

.connector.is-active {
  stroke: var(--cat);
  stroke-width: 2.5;
}

.connector.is-dimmed {
  opacity: 0.3;
}

/* Relation labels */
.relation-tag {
  transition: opacity 0.3s ease;
}

.relation-tag.is-dimmed {
  opacity: 0.35;
}

.relation-bg {
  fill: var(--color-background);
  stroke: var(--color-border);
  stroke-width: 1;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.relation-text {
  fill: var(--color-text-soft);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2px;
  transition: fill 0.3s ease;
}

.relation-tag.is-active .relation-bg {
  fill: var(--cat);
  stroke: var(--cat);
}

.relation-tag.is-active .relation-text {
  fill: #fff;
}

/* Nodes */
.node {
  cursor: pointer;
}

.node.is-dimmed {
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.node-ring {
  fill: none;
  stroke: var(--cat);
  stroke-width: 2;
  opacity: 0.4;
  transition: opacity 0.3s ease, stroke-width 0.3s ease;
  transform-box: fill-box;
  transform-origin: center;
}

.satellite-node:hover .node-ring,
.satellite-node.is-active .node-ring {
  opacity: 1;
  stroke-width: 3;
}

.node-fill {
  fill: var(--color-background);
  stroke: var(--color-border);
  stroke-width: 1.5;
  transition: stroke 0.3s ease;
}

.satellite-node:hover .node-fill,
.satellite-node.is-active .node-fill {
  stroke: var(--cat);
}

.node-logo {
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.satellite-node:hover .node-logo {
  transform: scale(1.06);
}

.node-label {
  fill: var(--color-text);
  font-weight: 700;
  font-size: 14px;
  pointer-events: none;
}

.node-label-bg {
  fill: var(--color-background-soft);
  stroke: var(--color-border);
  stroke-width: 1;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.satellite-node:hover .node-label-bg,
.satellite-node.is-active .node-label-bg {
  stroke: var(--cat);
}

/* Core node */
.core-node {
  cursor: pointer;
}

.core-halo {
  fill: rgba(var(--primary-rgb), 0.06);
}

.core-ring {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2.5;
  opacity: 0.55;
}

.core-fill {
  fill: var(--color-background);
  stroke: var(--primary);
  stroke-width: 2;
}

.core-label-bg {
  fill: var(--primary);
}

.core-label {
  fill: #fff;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.5px;
  pointer-events: none;
}

/* Info panel */
.info-column {
  width: 100%;
}

.info-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.info-top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.role-pill {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  background: var(--cat);
  color: #fff;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.info-category {
  font-size: 0.8rem;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-soft);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-logo-wrapper {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.info-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-title-group {
  display: flex;
  flex-direction: column;
}

.info-title {
  font-size: 1.7rem;
  font-weight: 850;
  letter-spacing: -0.3px;
  color: var(--color-heading);
}

.info-version {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  font-weight: 600;
}

.role-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  padding: 0.9rem 1.1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--primary);
  border-radius: 10px;
}

.info-divider {
  height: 1px;
  background: var(--color-border);
  width: 100%;
}

.info-desc {
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--color-text-soft);
}

.section-subtitle {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.7rem;
  color: var(--color-text-soft);
}

.features-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  line-height: 1.4;
}

.check-icon {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.techs-badges-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.info-action {
  margin-top: 0.4rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.85rem 1.6rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 18px rgba(var(--primary-rgb), 0.25);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(var(--primary-rgb), 0.35);
}

/* Interaction hint */
.graph-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-soft);
}

.graph-hint svg {
  flex-shrink: 0;
  color: var(--primary);
}

/* Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Responsive */
@media (max-width: 992px) {
  .ecosystem-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .ecosystem-page {
    padding: 2rem 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .page-title {
    font-size: 2.1rem;
  }

  .page-subtitle {
    font-size: 0.95rem;
  }

  .graph-legend {
    gap: 1rem;
    font-size: 0.8rem;
  }

  .info-card {
    padding: 1.5rem;
  }
}
</style>
