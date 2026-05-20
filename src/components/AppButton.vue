<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  to?: string | object
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  icon?: any // Lucide icon component
  iconRight?: boolean
}>()

const isExternal = computed(() => (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto:'))))
</script>

<template>
  <component
    :is="to ? 'RouterLink' : href ? 'a' : 'button'"
    :[to ? 'to' : 'href']="to || href"
    :target="isExternal ? '_blank' : undefined"
    :class="['app-button', variant || 'primary', size || 'md']"
  >
    <component v-if="icon && !iconRight" :is="icon" :size="size === 'sm' ? 16 : 20" class="btn-icon" />
    <span class="btn-text">
      <slot></slot>
    </span>
    <component v-if="icon && iconRight" :is="icon" :size="size === 'sm' ? 16 : 20" class="btn-icon-right" />
  </component>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1;
}

/* Variants */
.primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.4);
}

.secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.secondary:hover {
  background: var(--color-background-mute);
  transform: translateY(-2px);
}

.outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.outline:hover {
  background: rgba(var(--primary-rgb), 0.1);
  transform: translateY(-2px);
}

.text {
  background: transparent;
  color: var(--primary);
  padding: 0.5rem 0;
  border-radius: 0;
}

.text:hover {
  color: var(--accent);
  gap: 1rem;
}

/* Sizes */
.sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.lg { padding: 1rem 2.5rem; font-size: 1.1rem; }

.btn-icon, .btn-icon-right {
  flex-shrink: 0;
}
</style>
