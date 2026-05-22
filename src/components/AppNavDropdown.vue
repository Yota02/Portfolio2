<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

defineProps<{
  label: string;
  items: { to: string; label: string }[];
}>();

const emit = defineEmits(['close-menu']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
  emit('close-menu');
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="nav-dropdown" ref="dropdownRef">
    <button
      class="nav-link dropdown-toggle"
      @click="toggleDropdown"
      :class="{ active: isOpen }"
      :aria-expanded="isOpen"
    >
      {{ label }}
      <ChevronDown class="dropdown-arrow" :class="{ rotated: isOpen }" :size="14" />
    </button>
    <div class="dropdown-menu" :class="{ open: isOpen }">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="dropdown-item"
        @click="closeDropdown"
      >
        {{ item.label }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nav-dropdown {
  position: relative;
}

.nav-link {
  position: relative;
  padding: 0.45rem 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  transition: all 0.22s ease;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  box-shadow: 0 2px 10px rgba(2, 6, 23, 0.03);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-background-soft);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1001;
  padding: 0.5rem;
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.dropdown-item:hover {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}

@media (max-width: 768px) {
  .nav-link {
    width: 100%;
    justify-content: space-between;
    border-radius: 8px;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: transparent;
    border: none;
    display: none;
    margin-top: 0.5rem;
    padding: 0;
  }

  .dropdown-menu.open {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
</style>
