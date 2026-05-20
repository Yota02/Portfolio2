<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProjectsByGroupId, type Project } from '@/data/projects'

const props = defineProps<{
  groupId: string
  currentProjectId: string
}>()

const { t } = useI18n()

const versions = computed(() => {
  return getProjectsByGroupId(props.groupId).sort((a, b) => {
    // Simple version sorting, assuming v1, v2, v3...
    const vA = a.version ? parseInt(a.version.replace(/\D/g, '')) : 0
    const vB = b.version ? parseInt(b.version.replace(/\D/g, '')) : 0
    return vA - vB
  })
})

const isCurrent = (projectId: string) => projectId === props.currentProjectId
</script>

<template>
  <div v-if="versions.length > 1" class="project-evolution reveal-up">
    <h2 class="evolution-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
      {{ t('projects.evolution') || 'Évolution du projet' }}
    </h2>
    
    <div class="evolution-tree">
      <div v-for="(version, index) in versions" :key="version.id" class="version-node-wrapper">
        <router-link 
          :to="{ name: 'project-detail', params: { id: version.id } }"
          class="version-node"
          :class="{ 'active': isCurrent(version.id) }"
        >
          <div class="version-tag">{{ version.version }}</div>
          <div class="version-info">
            <span class="version-name">{{ version.name }}</span>
            <span class="version-date" v-if="version.startDate">{{ t(version.startDate) }}</span>
          </div>
        </router-link>
        <div v-if="index < versions.length - 1" class="version-connector">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-evolution {
  margin: 4rem 0;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 24px;
  border: 1px solid var(--color-border);
}

.evolution-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-heading);
}

.title-icon {
  color: var(--primary);
}

.evolution-tree {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: thin;
}

.version-node-wrapper {
  display: flex;
  align-items: center;
}

.version-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  min-width: 140px;
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.version-node:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.version-node.active {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  border-color: transparent;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.3);
  z-index: 2;
}

.version-tag {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  margin-bottom: 0.75rem;
}

.active .version-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.version-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.version-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.version-date {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.version-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  color: var(--color-border);
}

.version-connector svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .evolution-tree {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .version-node-wrapper {
    flex-direction: column;
    width: 100%;
  }
  
  .version-connector {
    width: 100%;
    height: 40px;
    transform: rotate(90deg);
  }
  
  .version-node {
    width: 100%;
    min-width: unset;
  }
}
</style>
