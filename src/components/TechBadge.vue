<script setup lang="ts">
import { techIconMap } from '@/data/projects'

interface Props {
  tech: string
  showIcon?: boolean
  active?: boolean
  iconOnly?: boolean
}

withDefaults(defineProps<Props>(), {
  showIcon: true,
  active: false,
  iconOnly: false
})

defineEmits<{
  (e: 'click'): void
}>()

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div
    class="tech-badge"
    :class="{ active, 'icon-only': iconOnly }"
    @click="$emit('click')"
    :title="tech"
  >
    <img
      v-if="showIcon && techIconMap[tech]"
      :src="`${baseUrl}icone/${techIconMap[tech]}.webp`"
      :alt="`Icône de ${tech}`"
      class="tech-icon"
      loading="lazy"
    />
    <span v-if="!iconOnly" class="tech-name">{{ tech }}</span>
  </div>
</template>

<style scoped>
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s ease;
  user-select: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.tech-badge:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  background: rgba(var(--primary-rgb), 0.05);
}

.tech-badge.active {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
}

.tech-badge.icon-only {
  padding: 0.6rem;
  border-radius: 12px;
  justify-content: center;
}

.tech-badge.icon-only:hover {
  transform: translateY(-3px) scale(1.08);
  box-shadow: var(--shadow-md);
}

.tech-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
}

.tech-badge.icon-only .tech-icon {
  width: 24px;
  height: 24px;
}

.tech-badge.active .tech-icon {
  filter: brightness(0) invert(1);
}
</style>
