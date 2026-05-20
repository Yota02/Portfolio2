<script setup lang="ts">
defineProps<{
  hoverable?: boolean
  reveal?: 'up' | 'left' | 'right' | 'none'
  variant?: 'default' | 'glass' | 'highlight'
}>()
</script>

<template>
  <div 
    :class="[
      'app-card', 
      variant || 'default',
      { hoverable },
      reveal && reveal !== 'none' ? `reveal-${reveal}` : ''
    ]"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.app-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.app-card.hoverable:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.app-card.glass {
  background: rgba(var(--color-background-soft-rgb), 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.app-card.highlight {
  border: 2px solid var(--primary);
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.03) 0%, rgba(var(--accent-rgb), 0.03) 100%);
}

.card-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--accent-rgb), 0.05) 100%);
}

.card-body {
  padding: 2rem;
  flex-grow: 1;
}

.card-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .card-header, .card-body, .card-footer {
    padding: 1.25rem 1.5rem;
  }
}
</style>
