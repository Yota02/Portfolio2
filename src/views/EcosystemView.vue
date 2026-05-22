<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProjectById, categoryMap, type ProjectCategory } from '@/data/projects'
import TechBadge from '@/components/TechBadge.vue'

const { t, locale } = useI18n()
const router = useRouter()
const baseUrl = import.meta.env.BASE_URL

const ecosystemProjectIds = [
  'project-1779285718375', // Yomu
  'project-7',              // Victoria
  'project-13',             // Loom (KyoLoom)
  'project-6'               // Img Classifier
]

const ecosystemProjects = computed(() => {
  return ecosystemProjectIds.map(id => getProjectById(id)).filter((p): p is any => p !== undefined)
})

function getLogoSrc(project: any) {
  const logo = project.logo_recadrer || project.logo
  return logo.startsWith('http') ? logo : `${baseUrl}projet/${project.folder}/${logo}`
}

const goToProject = (id: string) => {
  router.push({ name: 'project-detail', params: { id } })
}

// ----------------------------------------------------
// STATE & INTERACTION
// ----------------------------------------------------
const hoveredNodeId = ref<string | null>(null)
const selectedNodeId = ref<string | null>(null)

const toggleSelectNode = (id: string) => {
  if (selectedNodeId.value === id) {
    selectedNodeId.value = null
  } else {
    selectedNodeId.value = id
  }
}

// ----------------------------------------------------
// PHYSICS SIMULATION SETUP
// ----------------------------------------------------
const center = { x: 400, y: 300 }
const radius = 210

// Nodes layout list with physical properties
const nodesRef = ref(
  ecosystemProjects.value.map((project, index) => {
    // Distribute nodes circularly
    const angle = (index / ecosystemProjects.value.length) * 2 * Math.PI - Math.PI / 2
    const bx = center.x + radius * Math.cos(angle)
    const by = center.y + radius * Math.sin(angle)
    return {
      id: project.id,
      name: project.name,
      projectId: project.id,
      logo: getLogoSrc(project),
      angle: angle,
      bx: bx,
      by: by,
      x: bx,
      y: by,
      vx: 0,
      vy: 0,
      seedX: Math.random() * 100,
      seedY: Math.random() * 100,
      project: project
    }
  })
)

// Spores floating in background
interface Spore {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  seed: number
}
const spores = ref<Spore[]>([])

const initSpores = () => {
  spores.value = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 800,
    y: Math.random() * 600,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.35 + 0.1,
    seed: Math.random() * 100
  }))
}

// Mouse tracking inside SVG
const mouseX = ref(-9999)
const mouseY = ref(-9999)
const isMouseInside = ref(false)

const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect()
  mouseX.value = ((event.clientX - rect.left) / rect.width) * 800
  mouseY.value = ((event.clientY - rect.top) / rect.height) * 600
  isMouseInside.value = true
}

const handleMouseLeave = () => {
  isMouseInside.value = false
  mouseX.value = -9999
  mouseY.value = -9999
}

// ----------------------------------------------------
// SIMULATION FRAME LOOP
// ----------------------------------------------------
let animationFrameId: number | null = null

const updatePhysics = (time: number) => {
  // Update node positions
  nodesRef.value.forEach(node => {
    // Target base circular coordinates
    const targetBaseX = center.x + radius * Math.cos(node.angle)
    const targetBaseY = center.y + radius * Math.sin(node.angle)

    // Gentle float (Brownian noise simulation)
    const floatX = Math.sin(time * 0.0013 + node.seedX) * 14 + Math.cos(time * 0.0028 + node.seedY) * 5
    const floatY = Math.cos(time * 0.0011 + node.seedY) * 14 + Math.sin(time * 0.0022 + node.seedX) * 5

    const targetX = targetBaseX + floatX
    const targetY = targetBaseY + floatY

    let ax = 0
    let ay = 0

    // Repulsion and attraction from mouse cursor
    if (isMouseInside.value) {
      const dx = node.x - mouseX.value
      const dy = node.y - mouseY.value
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (hoveredNodeId.value === node.id || selectedNodeId.value === node.id) {
        // Gently pull the hovered/selected node toward the mouse so it stays right under it and is very easy to click
        if (dist > 5) {
          const attractionForce = 0.08
          ax -= (dx / dist) * attractionForce
          ay -= (dy / dist) * attractionForce
        }
      } else {
        // Repel other nodes so the network deforms organically around the cursor
        const repelRadius = 120 // reduced from 170
        if (dist < repelRadius && dist > 1) {
          const force = (1 - dist / repelRadius) * 3.5 // reduced from 6.5
          ax += (dx / dist) * force
          ay += (dy / dist) * force
        }
      }
    }

    // Spring mechanics returning nodes to anchor
    const spring = 0.03
    const damping = 0.85

    ax += (targetX - node.x) * spring
    ay += (targetY - node.y) * spring

    node.vx = (node.vx + ax) * damping
    node.vy = (node.vy + ay) * damping

    node.x += node.vx
    node.y += node.vy
  })

  // Update spores
  spores.value.forEach(s => {
    s.x += s.vx + Math.sin(time * 0.0008 + s.seed) * 0.06
    s.y += s.vy + Math.cos(time * 0.0008 + s.seed) * 0.06

    // Soft cursor push for spores
    if (isMouseInside.value) {
      const dx = s.x - mouseX.value
      const dy = s.y - mouseY.value
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100 && dist > 1) {
        const force = (1 - dist / 100) * 0.6
        s.x += (dx / dist) * force
        s.y += (dy / dist) * force
      }
    }

    // Wrap around coordinates
    if (s.x < 0) s.x = 800
    if (s.x > 800) s.x = 0
    if (s.y < 0) s.y = 600
    if (s.y > 600) s.y = 0
  })

  animationFrameId = requestAnimationFrame(updatePhysics)
}

// ----------------------------------------------------
// CURVED BEZIER CONNECTION PATHS
// ----------------------------------------------------
const getPathD = (node: any) => {
  const x1 = center.x
  const y1 = center.y
  const x2 = node.x
  const y2 = node.y
  const dx = x2 - x1
  const dy = y2 - y1
  const angle = node.angle

  // Curved paths bending outwards in a gorgeous flower layout
  const bendStrength = 36
  const px = Math.cos(angle + Math.PI / 2) * bendStrength
  const py = Math.sin(angle + Math.PI / 2) * bendStrength

  const cx1 = x1 + dx * 0.35 + px
  const cy1 = y1 + dy * 0.35 + py
  const cx2 = x1 + dx * 0.7 + px * 0.6
  const cy2 = y1 + dy * 0.7 + py * 0.6

  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
}

// ----------------------------------------------------
// DETAILS PANEL LOGIC (GLASSMORPHISM)
// ----------------------------------------------------
const coreProject = computed(() => {
  const isFr = locale.value === 'fr'
  return {
    id: 'core',
    name: isFr ? 'Victoria Écosystème' : 'Victoria Ecosystem',
    category: 'IA',
    description: t('common.ecosystem_desc'),
    features: isFr ? [
      'Architecture ultra-modulaire par plugins à chaud',
      'Traitement de langage naturel local avec Ollama',
      'Mémoire augmentée via base de données vectorielle ChromaDB'
    ] : [
      'Ultra-modular hot-swapping plugin architecture',
      'Local NLP processing powered by Ollama',
      'Augmented memory via ChromaDB vector database'
    ],
    tags: ['Python', 'Ollama', 'ChromaDB', 'CustomTkinter', 'Watchdog'],
    isCore: true
  }
})

const activeNode = computed(() => {
  if (hoveredNodeId.value) {
    const node = nodesRef.value.find(n => n.id === hoveredNodeId.value)
    if (node) return node.project
  }
  if (selectedNodeId.value) {
    const node = nodesRef.value.find(n => n.id === selectedNodeId.value)
    if (node) return node.project
  }
  return coreProject.value
})

// ----------------------------------------------------
// DYNAMIC CATEGORY DIVISION (CHAMBERS)
// ----------------------------------------------------
const getNodeCategoryColor = (category: string) => {
  return category === 'IA' ? 'var(--accent)' : 'var(--primary)'
}

const getNodeCategoryRgb = (category: string) => {
  return category === 'IA' ? '139, 92, 246' : '59, 130, 246'
}

const categoriesDb = computed(() => {
  const isFr = locale.value === 'fr'
  interface GroupData { x: number, y: number, count: number, name: string, color: string, rgb: string }
  const groups: Record<string, GroupData> = {
    'IA': { x: 0, y: 0, count: 0, name: isFr ? 'ZONE IA / AUTOMATISATION' : 'AI & AUTOMATION ZONE', color: 'var(--accent)', rgb: '139, 92, 246' },
    'Logiciel': { x: 0, y: 0, count: 0, name: isFr ? 'ZONE LOGICIELS & OUTILS' : 'SOFTWARE & TOOLS ZONE', color: 'var(--primary)', rgb: '59, 130, 246' }
  }
  
  // Accumulate node positions to calculate center of mass in real-time
  nodesRef.value.forEach(node => {
    const cat = node.project.category
    const g = groups[cat]
    if (g) {
      g.x += node.x
      g.y += node.y
      g.count++
    }
  })
  
  // Average coordinates
  return Object.entries(groups).map(([id, g]) => {
    if (g.count > 0) {
      g.x /= g.count
      g.y /= g.count
    } else {
      g.x = center.x
      g.y = center.y
    }
    return {
      id,
      name: g.name,
      x: g.x,
      y: g.y,
      color: g.color,
      rgb: g.rgb,
      count: g.count
    }
  })
})

// ----------------------------------------------------
// LIFECYCLE
// ----------------------------------------------------
onMounted(() => {
  initSpores()
  animationFrameId = requestAnimationFrame(updatePhysics)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="ecosystem-page">
    <div class="bg-vignette"></div>
    <div class="container">
      <header class="header">
        <RouterLink to="/projects" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('common.back') }}</span>
        </RouterLink>
        <h1 class="page-title">{{ t('common.ecosystem_title') }}</h1>
      </header>

      <div class="ecosystem-layout">
        <!-- Interactive network visualization -->
        <div class="graph-column">
          <div class="graph-wrapper"
               @mousemove="handleMouseMove"
               @mouseleave="handleMouseLeave">
            <div class="background-glow"></div>
            
            <svg viewBox="0 0 800 600" class="ecosystem-graph" preserveAspectRatio="xMidYMid meet">
              <!-- Background spores (Deep biological dust) -->
              <g class="spores-layer">
                <circle v-for="spore in spores" :key="'spore-' + spore.id"
                        :cx="spore.x" :cy="spore.y" :r="spore.size"
                        fill="var(--primary)" :opacity="spore.opacity"
                        class="spore-circle" />
              </g>

              <!-- Dynamic background category chambers (Cell dividers) -->
              <g class="chambers-layer">
                <g v-for="chamber in categoriesDb" :key="chamber.id" class="chamber-group">
                  <!-- Soft blurred glowing capsule behind nodes -->
                  <circle :cx="chamber.x" :cy="chamber.y" :r="chamber.id === 'IA' ? 180 : 125"
                          :fill="`rgba(${chamber.rgb}, 0.035)`"
                          class="chamber-blur" />
                  <!-- Breathing dotted outer boundaries -->
                  <circle :cx="chamber.x" :cy="chamber.y" :r="chamber.id === 'IA' ? 180 : 125"
                          :stroke="chamber.color"
                          stroke-width="1.5"
                          stroke-dasharray="5 7"
                          fill="none"
                          class="chamber-ring" />
                  <!-- Dynamic category pill label -->
                  <rect :x="chamber.x - 90" :y="chamber.y - (chamber.id === 'IA' ? 192 : 137)" width="180" height="20" rx="10" 
                        fill="var(--color-background-soft)" stroke="var(--color-border)" stroke-width="1" class="chamber-label-bg" />
                  <text :x="chamber.x" :y="chamber.y - (chamber.id === 'IA' ? 178 : 123)" 
                        text-anchor="middle" class="chamber-label" :fill="chamber.color">
                    {{ chamber.name }}
                  </text>
                </g>
              </g>

              <!-- Core concentric pulsing energy waves -->
              <g class="ripples-layer">
                <circle :cx="center.x" :cy="center.y" r="85" class="center-pulse-ring ring-1" />
                <circle :cx="center.x" :cy="center.y" r="85" class="center-pulse-ring ring-2" />
                <circle :cx="center.x" :cy="center.y" r="85" class="center-pulse-ring ring-3" />
              </g>

              <!-- Dynamic Bezier connections -->
              <g class="connections-layer">
                <template v-for="node in nodesRef" :key="'conn-' + node.id">
                  <!-- Ambient glowing path -->
                  <path :d="getPathD(node)" class="connection-glow" 
                        :style="{ stroke: getNodeCategoryColor(node.project.category) }"
                        :class="{ 'is-active': hoveredNodeId === node.id || selectedNodeId === node.id, 'is-dimmed': hoveredNodeId && hoveredNodeId !== node.id }" />
                  
                  <!-- Thin dashed structure path -->
                  <path :d="getPathD(node)" class="connection-line" 
                        :style="{ stroke: getNodeCategoryColor(node.project.category) }"
                        :class="{ 'is-active': hoveredNodeId === node.id || selectedNodeId === node.id, 'is-dimmed': hoveredNodeId && hoveredNodeId !== node.id }" />
                  
                  <!-- Flowing energy wave pulses -->
                  <path :d="getPathD(node)" class="connection-pulse" 
                        :style="{ stroke: getNodeCategoryColor(node.project.category) }"
                        :class="{ 'is-active': hoveredNodeId === node.id || selectedNodeId === node.id, 'is-dimmed': hoveredNodeId && hoveredNodeId !== node.id }" />
                </template>
              </g>

              <!-- Center Core (Victoria) -->
              <g class="node center-node" @click="selectedNodeId = null">
                <!-- Rotating dashed orbital ring -->
                <circle :cx="center.x" :cy="center.y" r="94" class="node-circle-outer center" />
                <!-- Beating solid core circle -->
                <circle :cx="center.x" :cy="center.y" r="78" class="node-circle center" />
                <text :x="center.x" :y="center.y" text-anchor="middle" dominant-baseline="middle" class="node-label center">
                  <tspan :x="center.x" dy="-0.5em">Victoria</tspan>
                  <tspan :x="center.x" dy="1.2em">Project</tspan>
                </text>
              </g>

              <!-- Peripheral Project Nodes -->
              <g v-for="node in nodesRef" :key="node.id" 
                 class="node peripheral-node" 
                 :class="{ 'is-dimmed': hoveredNodeId && hoveredNodeId !== node.id, 'is-active': hoveredNodeId === node.id || selectedNodeId === node.id }"
                 @mouseenter="hoveredNodeId = node.id"
                 @mouseleave="hoveredNodeId = null"
                 @click="toggleSelectNode(node.id)">
                <defs>
                  <clipPath :id="'clip-' + node.id">
                    <circle :cx="node.x" :cy="node.y" r="38" />
                  </clipPath>
                </defs>
                
                <!-- Glowing node ring with dynamic category color -->
                <circle :cx="node.x" :cy="node.y" r="48" class="node-circle-outer" 
                        :style="{ stroke: getNodeCategoryColor(node.project.category), filter: (hoveredNodeId === node.id || selectedNodeId === node.id) ? `drop-shadow(0 0 10px ${getNodeCategoryColor(node.project.category)})` : 'none' }" />
                
                <!-- Solid node filled container -->
                <circle :cx="node.x" :cy="node.y" r="42" class="node-circle" 
                        :style="{ '--active-stroke': getNodeCategoryColor(node.project.category) }" />
                
                <!-- Cropped project logo -->
                <image :href="node.logo" 
                       :x="node.x - 38" :y="node.y - 38" 
                       width="76" height="76" 
                       :clip-path="'url(#clip-' + node.id + ')'"
                       class="node-logo" />
                
                <!-- Node name badge below with dynamic hover state color -->
                <rect :x="node.x - 55" :y="node.y + 50" width="110" height="24" rx="12" class="label-bg" 
                      :style="{ fill: (hoveredNodeId === node.id || selectedNodeId === node.id) ? getNodeCategoryColor(node.project.category) : 'var(--color-background-soft)', stroke: (hoveredNodeId === node.id || selectedNodeId === node.id) ? getNodeCategoryColor(node.project.category) : 'var(--color-border)' }" />
                <text :x="node.x" :y="node.y + 66" text-anchor="middle" class="node-label">{{ node.name }}</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Premium Glassmorphic details panel -->
        <div class="info-column">
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeNode.id" class="info-card glass-panel">
              <!-- Category badge -->
              <span class="info-category">
                {{ activeNode.isCore ? (locale === 'fr' ? 'Écosystème' : 'Ecosystem') : t(`projects.categories.${categoryMap[activeNode.category as ProjectCategory] || 'ia'}`) }}
              </span>
              
              <!-- Title group -->
              <div class="info-header">
                <div v-if="!activeNode.isCore" class="info-logo-wrapper">
                  <img :src="getLogoSrc(activeNode)" :alt="activeNode.name" class="info-logo" />
                </div>
                <div v-else class="info-logo-wrapper core-logo">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="info-title-group">
                  <h2 class="info-title">{{ activeNode.name }}</h2>
                  <span v-if="activeNode.version" class="info-version">v{{ activeNode.version }}</span>
                </div>
              </div>
              
              <div class="info-divider"></div>
              
              <!-- Project description -->
              <p class="info-desc">
                {{ activeNode.isCore ? activeNode.description : t(activeNode.description) }}
              </p>

              <!-- Main project features list -->
              <div v-if="activeNode.features && activeNode.features.length" class="info-features-section">
                <h4 class="section-subtitle">{{ t('projects.features') }}</h4>
                <ul class="features-list">
                  <li v-for="(feat, idx) in activeNode.features.slice(0, 3)" :key="idx" class="feature-item">
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ activeNode.isCore ? feat : t(feat) }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech Badges -->
              <div class="info-techs-section">
                <h4 class="section-subtitle">Technologies</h4>
                <div class="techs-badges-grid">
                  <TechBadge v-for="tech in activeNode.tags" :key="tech" :tech="tech" :show-icon="true" />
                </div>
              </div>

              <!-- Call to Action button -->
              <div class="info-action">
                <button v-if="!activeNode.isCore" class="action-btn" @click="goToProject(activeNode.id)">
                  <span>{{ t('projects.view_project_link') }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <RouterLink v-else to="/projects" class="action-btn core-btn">
                  <span>{{ t('home.view_projects') }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </RouterLink>
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
  background: radial-gradient(circle at center, var(--color-background-soft) 0%, var(--color-background) 100%);
  color: var(--color-text);
  overflow: hidden;
  position: relative;
}

  .bg-vignette {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 30%, rgba(var(--primary-rgb), 0.03) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Background chambers styles */
  .chamber-blur {
    filter: blur(55px);
    opacity: 0.65;
    transition: cx 0.2s ease-out, cy 0.2s ease-out, r 0.3s ease;
    pointer-events: none;
  }

  .chamber-ring {
    opacity: 0.12;
    transition: cx 0.2s ease-out, cy 0.2s ease-out, r 0.3s ease;
    pointer-events: none;
    animation: rotateDotted 90s linear infinite;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes rotateDotted {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .chamber-label-bg {
    transition: x 0.2s ease-out, y 0.2s ease-out;
    opacity: 0.92;
  }

  .chamber-label {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 1.5px;
    pointer-events: none;
    transition: x 0.2s ease-out, y 0.2s ease-out;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
  }

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
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
}

.back-btn:hover {
  background: var(--color-background-mute);
  border-color: var(--primary);
  transform: translateX(-5px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.15);
}

.page-title {
  font-size: 2.8rem;
  font-weight: 850;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

/* Layout Grid */
.ecosystem-layout {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 3rem;
  align-items: start;
}

.graph-column {
  width: 100%;
}

.graph-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(var(--primary-rgb), 0.02);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.background-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, rgba(var(--accent-rgb), 0.05) 50%, transparent 70%);
  filter: blur(50px);
  z-index: 0;
  animation: pulseCore 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulseCore {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

.ecosystem-graph {
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* Background spores styling */
.spore-circle {
  transition: r 0.3s ease;
}

/* Dynamic line connection styling */
.connection-glow {
  stroke: var(--primary);
  stroke-width: 7;
  fill: none;
  opacity: 0.05;
  transition: opacity 0.5s ease, stroke 0.5s ease;
}
.connection-glow.is-active {
  stroke: var(--accent);
  opacity: 0.22;
}
.connection-glow.is-dimmed {
  opacity: 0.02;
}

.connection-line {
  stroke: var(--primary);
  stroke-width: 1.5;
  fill: none;
  opacity: 0.2;
  stroke-dasharray: 4 4;
  transition: opacity 0.5s ease, stroke 0.5s ease;
}
.connection-line.is-active {
  stroke: var(--accent);
  opacity: 0.55;
}
.connection-line.is-dimmed {
  opacity: 0.07;
}

.connection-pulse {
  stroke: var(--accent);
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 12 130;
  stroke-linecap: round;
  opacity: 0.35;
  animation: pulseFlow 4.5s linear infinite;
  transition: opacity 0.5s ease, stroke 0.5s ease;
}
.connection-pulse.is-active {
  stroke: var(--accent);
  stroke-width: 3.5;
  opacity: 0.85;
  animation-duration: 2.2s; /* flows faster on hover! */
}
.connection-pulse.is-dimmed {
  opacity: 0.07;
}

@keyframes pulseFlow {
  from { stroke-dashoffset: 142; }
  to { stroke-dashoffset: 0; }
}

/* Nodes styling */
.node {
  cursor: pointer;
  transition: opacity 0.5s ease;
}

.node.is-dimmed {
  opacity: 0.35;
}

.node-circle-outer {
  fill: none;
  stroke: var(--primary);
  stroke-width: 1.5px;
  opacity: 0.25;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.peripheral-node:hover .node-circle-outer,
.peripheral-node.is-active .node-circle-outer {
  opacity: 0.75;
  stroke-width: 2.5px;
  transform: scale(1.18);
}

.node-circle {
  fill: var(--color-background-soft);
  stroke: var(--color-border);
  stroke-width: 2px;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.peripheral-node:hover .node-circle,
.peripheral-node.is-active .node-circle {
  stroke: var(--active-stroke, var(--accent));
  fill: var(--color-background-mute);
  transform: scale(1.08);
}

/* Center node (Victoria core node) */
.center-node {
  cursor: default;
}

.node-circle.center {
  fill: var(--primary);
  stroke: var(--accent);
  stroke-width: 3.5px;
  filter: drop-shadow(0 0 20px rgba(var(--primary-rgb), 0.45));
  animation: centerBeat 4s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes centerBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); filter: drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.65)); }
}

.node-circle-outer.center {
  stroke: var(--accent);
  opacity: 0.35;
  animation: spinOuter 24s linear infinite;
  stroke-dasharray: 12 6;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes spinOuter {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.node-label {
  fill: var(--color-text);
  font-weight: 750;
  font-size: 13px;
  letter-spacing: -0.1px;
  pointer-events: none;
  transition: fill 0.3s ease;
}

.node-label.center {
  fill: white;
  font-size: 19px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.label-bg {
  fill: var(--color-background-soft);
  stroke: var(--color-border);
  stroke-width: 1px;
  opacity: 0.95;
  transition: all 0.3s ease;
}

.peripheral-node:hover .label-bg,
.peripheral-node.is-active .label-bg {
  fill: var(--accent);
  stroke: var(--accent);
  filter: drop-shadow(0 4px 10px rgba(var(--accent-rgb), 0.3));
}

.peripheral-node:hover .node-label,
.peripheral-node.is-active .node-label {
  fill: white;
}

.node-logo {
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.peripheral-node:hover .node-logo,
.peripheral-node.is-active .node-logo {
  transform: scale(1.12);
}

/* Concentric rippling pulse waves from center */
.center-pulse-ring {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2px;
  opacity: 0;
  pointer-events: none;
  transform-origin: center;
  transform-box: fill-box;
}
.ring-1 {
  animation: ringPulse 4.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
}
.ring-2 {
  animation: ringPulse 4.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
  animation-delay: 1.5s;
}
.ring-3 {
  animation: ringPulse 4.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
  animation-delay: 3s;
}

@keyframes ringPulse {
  0% {
    transform: scale(0.9);
    opacity: 0.85;
    stroke: var(--primary);
  }
  50% {
    stroke: var(--accent);
  }
  100% {
    transform: scale(3.2);
    opacity: 0;
  }
}

/* Info Column & Premium Card */
.info-column {
  width: 100%;
}

.info-card {
  padding: 2.2rem;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 24px;
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px) saturate(180%);
}

.dark .glass-panel {
  background: rgba(24, 24, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 
    0 15px 35px -10px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.info-category {
  display: inline-block;
  align-self: flex-start;
  padding: 0.35rem 0.9rem;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.info-logo-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.info-logo-wrapper.core-logo {
  background: rgba(var(--primary-rgb), 0.08);
  border-color: rgba(var(--primary-rgb), 0.2);
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
  font-size: 1.8rem;
  font-weight: 850;
  letter-spacing: -0.3px;
  color: var(--color-heading);
}

.info-version {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  font-weight: 600;
}

.info-divider {
  height: 1px;
  background: linear-gradient(to right, var(--color-border) 0%, transparent 100%);
  width: 100%;
}

.info-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
}

.section-subtitle {
  font-size: 0.9rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.8rem;
  color: var(--color-text-soft);
}

.features-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.95rem;
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
  gap: 0.6rem;
}

.info-action {
  margin-top: 1rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.3);
  text-decoration: none;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(var(--primary-rgb), 0.45);
}

.action-btn:active {
  transform: translateY(-1px);
}

.action-btn.core-btn {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.action-btn.core-btn:hover {
  border-color: var(--primary);
  background: var(--color-background-mute);
  box-shadow: 0 8px 20px rgba(var(--primary-rgb), 0.12);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsiveness */
@media (max-width: 992px) {
  .ecosystem-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .ecosystem-page {
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .graph-wrapper {
    aspect-ratio: 1;
    border-radius: 16px;
  }
  
  .node-label {
    font-size: 11px;
  }
  
  .node-label.center {
    font-size: 16px;
  }
  
  .info-card {
    padding: 1.5rem;
    min-height: auto;
  }
}
</style>
