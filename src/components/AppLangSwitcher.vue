<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown } from 'lucide-vue-next';

const { locale } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const baseUrl = import.meta.env.BASE_URL;

const languages = [
  { code: 'fr', name: 'Français', flag: `${baseUrl}drapeau/fr.svg` },
  { code: 'en', name: 'English', flag: `${baseUrl}drapeau/en.svg` },
  { code: 'de', name: 'Deutsch', flag: `${baseUrl}drapeau/de.svg` },
  { code: 'jp', name: '日本語', flag: `${baseUrl}drapeau/jp.svg` },
  { code: 'zh', name: '中文', flag: `${baseUrl}drapeau/zh.svg` },
  { code: 'ru', name: 'Русский', flag: `${baseUrl}drapeau/ru.svg` },
  { code: 'it', name: 'Italiano', flag: `${baseUrl}drapeau/it.svg` },
  { code: 'es', name: 'Español', flag: `${baseUrl}drapeau/es.svg` }
];

const currentLang = computed(() => languages.find(l => l.code === locale.value) || languages[0]!);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  isOpen.value = false;
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
  <div class="lang-dropdown" ref="dropdownRef">
    <button class="lang-dropdown-toggle" @click="toggleDropdown" :aria-expanded="isOpen" aria-haspopup="listbox">
      <img :src="currentLang.flag" :alt="currentLang.name" class="current-flag-img" />
      <ChevronDown class="dropdown-arrow" :class="{ rotated: isOpen }" :size="16" />
    </button>
    
    <div class="lang-dropdown-menu" :class="{ open: isOpen }">
      <button 
        v-for="lang in languages" 
        :key="lang.code" 
        @click="changeLanguage(lang.code)" 
        class="lang-option"
        :class="{ active: locale === lang.code }"
        role="option"
        :aria-selected="locale === lang.code"
      >
        <img :src="lang.flag" :alt="lang.name" class="lang-flag-img" />
        <span class="lang-name">{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lang-dropdown {
  position: relative;
}

.lang-dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
}

.lang-dropdown-toggle:hover {
  background: var(--color-background-mute);
  border-color: var(--primary);
}

.current-flag-img {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  opacity: 0.6;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.lang-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--color-background-soft);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1001;
  overflow: hidden;
}

.lang-dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
  text-align: left;
}

.lang-option:hover {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}

.lang-option.active {
  background: rgba(var(--primary-rgb), 0.15);
  color: var(--primary);
  font-weight: 700;
}

.lang-flag-img {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

.lang-name {
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .lang-dropdown-menu {
    position: static;
    box-shadow: none;
    background: transparent;
    border: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 0.5rem;
    min-width: 100%;
  }
}
</style>
