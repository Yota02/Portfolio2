<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectsByGroupId, type Project } from '@/data/projects'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps<{
  groupId: string
  currentProjectId: string
}>()

const { t } = useI18n()
const showEvolutionDetails = ref(false)
const showVersionDetails = ref(false)
const selectedVersion = ref<Project | null>(null)
const timelineContainer = ref<HTMLElement | null>(null)

const openVersionModal = (version: Project) => {
  selectedVersion.value = version
  showVersionDetails.value = true
}

// Auto-centrer la version actuelle au chargement
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    if (timelineContainer.value) {
      const activeCard = timelineContainer.value.querySelector('.timeline-card.active') as HTMLElement
      if (activeCard) {
        const containerWidth = timelineContainer.value.offsetWidth
        const cardOffset = activeCard.offsetLeft
        const cardWidth = activeCard.offsetWidth
        
        timelineContainer.value.scrollTo({
          left: cardOffset - (containerWidth / 2) + (cardWidth / 2),
          behavior: 'smooth'
        })
      }
    }
  }, 300)
})

// Classification sémantique avancée des notes d'évolution pour le comparatif
const classifiedNotes = computed(() => {
  const raw = t('projects.evolution_notes')
  if (!raw || raw === 'projects.evolution_notes') {
    return []
  }
  return raw
    .split('\n')
    .map((line) => {
      const cleaned = line.replace(/^-\s*/, '').trim()
      if (!cleaned) return null
      
      let type: 'added' | 'optimized' | 'removed' | 'info' = 'info'
      let label = 'Général'
      let icon = '💡'
      
      const lower = cleaned.toLowerCase()
      if (
        lower.includes('ajout') || 
        lower.includes('added') || 
        lower.includes('passage à') || 
        lower.includes('move to') ||
        lower.includes('nouveau') ||
        lower.includes('nouvelle') ||
        lower.includes('new') ||
        lower.includes('salon de lecture') ||
        lower.includes('export epub')
      ) {
        type = 'added'
        label = t('projects.evolution_types.added') || 'Ajout'
        icon = '✨'
      } else if (
        lower.includes('abandon') || 
        lower.includes('abandonné') ||
        lower.includes('dropped') || 
        lower.includes('retiré') ||
        lower.includes('removed') ||
        lower.includes('au profit de')
      ) {
        type = 'removed'
        label = t('projects.evolution_types.removed') || 'Remplacement'
        icon = '⇄'
      } else if (
        lower.includes('optimis') || 
        lower.includes('amélior') || 
        lower.includes('plus robust') || 
        lower.includes('meilleur') || 
        lower.includes('modernis') ||
        lower.includes('improved') ||
        lower.includes('stronger') ||
        lower.includes('clearer') ||
        lower.includes('flux utilisateur') ||
        lower.includes('préservation')
      ) {
        type = 'optimized'
        label = t('projects.evolution_types.optimized') || 'Optimisé'
        icon = '⚡'
      }
      
      return {
        text: cleaned,
        type,
        label,
        icon
      }
    })
    .filter(Boolean) as Array<{ text: string, type: 'added' | 'optimized' | 'removed' | 'info', label: string, icon: string }>
})

const versions = computed(() => {
  return getProjectsByGroupId(props.groupId).sort((a, b) => {
    const vA = a.version ? parseInt(a.version.replace(/\D/g, '')) : 0
    const vB = b.version ? parseInt(b.version.replace(/\D/g, '')) : 0
    return vA - vB
  })
})

const isCurrent = (projectId: string) => projectId === props.currentProjectId
</script>

<template>
  <div v-if="versions.length > 1" class="project-evolution reveal-up">
    <!-- En-tête de la section Évolution -->
    <div class="evolution-header">
      <h3 class="evolution-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
          <path d="M12 20v-6M6 20V10M18 20V4"/>
        </svg>
        {{ t('projects.evolution') || 'Évolution du projet' }}
      </h3>
      
      <button
        class="evolution-compare-btn"
        type="button"
        @click="showEvolutionDetails = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 18H8a4 4 0 0 1-4-4V6"></path>
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          <path d="M20 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          <circle cx="4" cy="18" r="3"></circle>
        </svg>
        {{ t('projects.evolution_details_button') || 'Comparer les versions (v1 ⇄ v2)' }}
      </button>
    </div>
    
    <!-- Timeline Épurée et Ultra-Lisible (Inline) -->
    <div class="timeline-container" ref="timelineContainer">
      <div class="timeline-steps">
        <div v-for="(version, index) in versions" :key="version.id" class="timeline-step-wrapper">
          
          <!-- Bouton/Carte de version épuré et interactif -->
          <button 
            class="timeline-card"
            :class="{ 'active': isCurrent(version.id) }"
            @click="openVersionModal(version)"
            type="button"
          >
            <div class="version-badge">{{ version.version }}</div>
            <div class="version-name">{{ version.name }}</div>
            <div class="version-date" v-if="version.startDate">{{ t(version.startDate) }}</div>
            <div class="click-hint">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m12 16 4-4-4-4M8 12h8"/>
              </svg>
              Voir détails
            </div>
            <span class="active-dot" v-if="isCurrent(version.id)">Actuel</span>
          </button>
          
          <!-- Connecteur Linéaire avec Flèche Directe -->
          <div v-if="index < versions.length - 1" class="timeline-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- 1. MODAL DE DÉTAILS DE VERSION INDIVIDUELLE (Ultra-Lisible) -->
    <BaseModal :isOpen="showVersionDetails" @close="showVersionDetails = false">
      <template #header>
        <div class="version-modal-header" v-if="selectedVersion">
          <span class="v-tag">{{ selectedVersion.version }}</span>
          <h2>{{ selectedVersion.name }}</h2>
        </div>
      </template>
      <template #body>
        <div class="version-modal-body" v-if="selectedVersion">
          
          <!-- Description et contexte -->
          <div class="modal-info-section">
            <h4 class="section-title">Description</h4>
            <p class="section-text highlight">
              {{ t(selectedVersion.longDescription) || t(selectedVersion.description) }}
            </p>
          </div>
          
          <div class="modal-info-section" v-if="selectedVersion.context">
            <h4 class="section-title">Contexte</h4>
            <p class="section-text">{{ t(selectedVersion.context) }}</p>
          </div>
          
          <!-- Durée -->
          <div class="modal-info-section" v-if="selectedVersion.duration">
            <h4 class="section-title">Durée de développement</h4>
            <p class="section-text">{{ t(selectedVersion.duration) }}</p>
          </div>
          
          <!-- Technologies -->
          <div class="modal-info-section" v-if="selectedVersion.tags && selectedVersion.tags.length">
            <h4 class="section-title">Technologies de cette version</h4>
            <div class="modal-tech-list">
              <span v-for="tag in selectedVersion.tags" :key="tag" class="modal-tech-pill">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Fonctionnalités -->
          <div class="modal-info-section" v-if="selectedVersion.features && selectedVersion.features.length">
            <h4 class="section-title">Fonctionnalités clés</h4>
            <ul class="modal-features-list">
              <li v-for="feat in selectedVersion.features" :key="feat">
                <svg class="bullet-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ t(feat) }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Bouton d'action principal pour aller sur le projet complet -->
          <div class="modal-action-row">
            <router-link 
              :to="{ name: 'project-detail', params: { id: selectedVersion.id } }"
              class="modal-btn-primary"
              @click="showVersionDetails = false"
            >
              Consulter la page complète du projet
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7 7-7"/>
              </svg>
            </router-link>
            
            <button class="modal-btn-secondary" @click="showVersionDetails = false" type="button">
              Fermer
            </button>
          </div>

        </div>
      </template>
    </BaseModal>

    <!-- 2. MODAL COMPARATIF D'ÉVOLUTION (Diff aéré et lisible) -->
    <BaseModal :isOpen="showEvolutionDetails" @close="showEvolutionDetails = false">
      <template #header>
        <div class="version-modal-header">
          <span class="compare-icon">⇄</span>
          <h2>Comparatif d'Évolution (v1 ➔ v2)</h2>
        </div>
      </template>
      <template #body>
        <div class="comparison-layout">
          
          <!-- Comparatif des Technologies -->
          <div class="comparison-block">
            <h3 class="comparison-title-badge">Évolution Technologique</h3>
            
            <div class="tech-comparison-row">
              <div class="tech-column">
                <div class="tech-column-title">v1 : {{ versions[0]?.name }}</div>
                <div class="tech-column-pills">
                  <span v-for="tag in versions[0]?.tags" :key="tag" class="tech-pill-solid v1">
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <div class="tech-arrow-divider">➔</div>
              
              <div class="tech-column" v-if="versions[1]">
                <div class="tech-column-title">v2 : {{ versions[1]?.name }}</div>
                <div class="tech-column-pills">
                  <span v-for="tag in versions[1]?.tags" :key="tag" class="tech-pill-solid v2" :class="{ 'exclusive': !versions[0]?.tags.includes(tag) }">
                    {{ tag }}
                    <span v-if="!versions[0]?.tags.includes(tag)" class="new-label-pill">Nouveau</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notes de Changements Classifiées -->
          <div class="comparison-block">
            <h3 class="comparison-title-badge">Différentiel des Changements</h3>
            
            <div class="clean-diff-list">
              <div 
                v-for="(note, idx) in classifiedNotes" 
                :key="idx" 
                class="clean-diff-card"
                :class="note.type"
              >
                <div class="diff-type-indicator">
                  <span class="type-icon">{{ note.icon }}</span>
                  <span class="type-name">{{ note.label }}</span>
                </div>
                <div class="diff-content">
                  {{ note.text }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer de fermeture -->
          <div class="modal-action-row end">
            <button class="modal-btn-secondary" @click="showEvolutionDetails = false" type="button">
              Fermer le comparatif
            </button>
          </div>

        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
/* 1. SECTION PRINCIPALE INLINE (Design Épuré) */
.project-evolution {
  margin: 3.5rem 0;
  padding: 2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.evolution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.evolution-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-heading);
}

.title-icon {
  color: var(--primary);
}

/* Bouton Comparer ultra-lisible */
.evolution-compare-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  border: 2px solid var(--primary);
  background: transparent;
  color: var(--primary);
  font-size: 0.88rem;
  font-weight: 750;
  cursor: pointer;
  transition: all 0.2s ease;
}

.evolution-compare-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-1px);
}

/* Container de Timeline */
.timeline-container {
  width: 100%;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
}

.timeline-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}

.timeline-step-wrapper {
  display: flex;
  align-items: center;
}

/* Bouton/Carte de version (très lisible, fort contraste) */
.timeline-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.75rem;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  min-width: 160px;
  cursor: pointer;
  text-align: center;
  color: var(--color-text);
  transition: all 0.25s ease;
  position: relative;
}

.timeline-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.timeline-card.active {
  border-color: var(--primary);
  background: rgba(var(--primary-rgb), 0.03);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.08);
}

.version-badge {
  font-size: 0.75rem;
  font-weight: 850;
  text-transform: uppercase;
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  margin-bottom: 0.5rem;
}

.timeline-card.active .version-badge {
  background: var(--primary);
  color: white;
}

.version-name {
  font-weight: 800;
  font-size: 1rem;
  color: var(--color-heading);
}

.version-date {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.25rem;
  font-weight: 600;
}

.click-hint {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-top: 0.6rem;
  opacity: 0.85;
}

.active-dot {
  position: absolute;
  top: -10px;
  background: #10b981;
  color: white;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
  text-transform: uppercase;
}

/* Connecteur épuré */
.timeline-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  position: relative;
}

.connector-line {
  width: 100%;
  height: 2px;
  background: var(--color-border);
}

.connector-arrow {
  position: absolute;
  background: var(--color-background-soft);
  color: var(--color-text);
  opacity: 0.5;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.connector-arrow svg {
  width: 12px;
  height: 12px;
}

/* 2. MODAL DÉTAILS DE VERSION (Styles Clairs & Aérés) */
.version-modal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-heading);
}

.v-tag {
  font-size: 0.8rem;
  font-weight: 900;
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.version-modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  color: var(--color-text);
}

.modal-info-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-heading);
  letter-spacing: 0.05em;
  opacity: 0.85;
}

.section-text {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text);
}

.section-text.highlight {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.65;
  color: var(--color-heading);
}

.modal-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.modal-tech-pill {
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  background: var(--color-background-mute);
  color: var(--color-heading);
  border: 1px solid var(--color-border);
}

.modal-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.modal-features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 1rem;
  line-height: 1.5;
}

.bullet-icon {
  color: #10b981;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

/* Boutons de la Modal */
.modal-action-row {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}

.modal-action-row.end {
  justify-content: flex-end;
}

.modal-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
  box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.25);
}

.modal-btn-primary:hover {
  background: var(--primary-dark);
}

.modal-btn-secondary {
  background: var(--color-background-mute);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn-secondary:hover {
  background: rgba(var(--primary-rgb), 0.05);
  border-color: var(--primary);
  color: var(--primary);
}

/* 3. MODAL DE COMPARAISON (Spacieuse & Contrastée) */
.compare-icon {
  font-size: 1.25rem;
  color: var(--primary);
}

.comparison-layout {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.comparison-block {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.comparison-title-badge {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-heading);
  text-transform: uppercase;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  letter-spacing: 0.03em;
}

/* Ligne comparaison technologique */
.tech-comparison-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
}

.tech-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.tech-column-title {
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  opacity: 0.75;
}

.tech-column-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-pill-solid {
  font-size: 0.85rem;
  font-weight: 750;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.tech-pill-solid.v2.exclusive {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
  color: #10b981;
}

.new-label-pill {
  font-size: 0.6rem;
  font-weight: 900;
  background: #10b981;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  margin-left: 0.3rem;
  vertical-align: middle;
}

.tech-arrow-divider {
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: bold;
}

/* Liste des Notes de Diff */
.clean-diff-list {
  display: grid;
  gap: 0.75rem;
}

.clean-diff-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--color-text);
}

.clean-diff-card.added {
  border-left: 5px solid #10b981;
  background: rgba(16, 185, 129, 0.02);
}
.clean-diff-card.optimized {
  border-left: 5px solid var(--primary);
  background: rgba(var(--primary-rgb), 0.02);
}
.clean-diff-card.removed {
  border-left: 5px solid var(--accent);
  background: rgba(var(--accent-rgb), 0.02);
}
.clean-diff-card.info {
  border-left: 5px solid #f59e0b;
  background: rgba(245, 158, 11, 0.02);
}

.diff-type-indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
  flex-shrink: 0;
}

.added .diff-type-indicator { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.optimized .diff-type-indicator { background: rgba(var(--primary-rgb), 0.1); color: var(--primary); }
.removed .diff-type-indicator { background: rgba(var(--accent-rgb), 0.1); color: var(--accent); }
.info .diff-type-indicator { background: rgba(245, 158, 11, 0.1); color: #d97706; }

.diff-content {
  flex: 1;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .project-evolution {
    padding: 1.25rem;
  }
  
  .evolution-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .evolution-compare-btn {
    justify-content: center;
    width: 100%;
  }
  
  .timeline-steps {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    padding: 0;
  }
  
  .timeline-step-wrapper {
    flex-direction: column;
    width: 100%;
  }
  
  .timeline-card {
    width: 100%;
  }
  
  .timeline-connector {
    width: 2px;
    height: 40px;
    margin: 0.25rem 0;
  }
  
  .connector-line {
    width: 2px;
    height: 100%;
  }
  
  .connector-arrow {
    transform: rotate(90deg);
  }
  
  /* Modals */
  .tech-comparison-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .tech-arrow-divider {
    transform: rotate(90deg);
    margin: 0.25rem auto;
  }
  
  .clean-diff-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .modal-action-row {
    flex-direction: column;
  }
  
  .modal-btn-primary, .modal-btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
