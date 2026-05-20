<script setup lang="ts">

defineProps<{
  title?: string
  icon?: any // Lucide icon component
  reveal?: 'up' | 'left' | 'right' | 'none'
}>()
</script>

<template>
  <section :class="['app-section', reveal && reveal !== 'none' ? `reveal-${reveal}` : '']">
    <div v-if="title" class="section-header">
      <h2 class="section-title">
        <component v-if="icon" :is="icon" class="icon-primary" :size="28" />
        {{ title }}
      </h2>
    </div>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.app-section {
  margin-bottom: 4rem;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-heading);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.01em;
}

.icon-primary {
  color: var(--primary);
}

@media (max-width: 768px) {
  .app-section {
    margin-bottom: 2.5rem;
  }
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
