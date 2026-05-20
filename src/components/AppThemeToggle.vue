<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { useI18n } from 'vue-i18n';
import { Sun, Moon } from 'lucide-vue-next';

const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle" :aria-label="t('nav.toggle_theme')">
    <Sun v-if="isDark" :size="20" />
    <Moon v-else :size="20" />
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.22s ease;
  color: var(--color-text);
}

.theme-toggle:hover {
  background: rgba(var(--primary-rgb), 0.1);
  transform: scale(1.1);
  color: var(--primary);
}
</style>
