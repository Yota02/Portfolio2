<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const route = useRoute();
const isOpen = ref(false);
const isDropdownOpen = ref(false);
const isParcoursDropdownOpen = ref(false);
const isLangDropdownOpen = ref(false);
const isDark = ref(false);

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

const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

const isResumePage = computed(() => route.path === '/resume');

function toggleMenu() {
  isOpen.value = !isOpen.value;
  isDropdownOpen.value = false;
  isParcoursDropdownOpen.value = false;
}

function toggleProjectsDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  isParcoursDropdownOpen.value = false;
}

function toggleParcoursDropdown() {
  isParcoursDropdownOpen.value = !isParcoursDropdownOpen.value;
  isDropdownOpen.value = false;
}

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
};

// Reveal Animation Logic
const setupRevealAnimations = () => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  updateTheme();

  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    locale.value = savedLang;
  }

  // Initial call with a slight delay to ensure the component is in the DOM
  setTimeout(setupRevealAnimations, 500);
});

// Re-run animations on route change
watch(() => route.path, () => {
  setTimeout(setupRevealAnimations, 500);
}, { immediate: true });
</script>

<template>
  <div class="app-container">
    <header v-if="!isResumePage">
      <nav class="nav-container">
        <RouterLink
          to="/"
          class="logo"
          @click="
            isOpen = false;
            isDropdownOpen = false;
            isParcoursDropdownOpen = false;
          "
        >
          <span class="logo-text">Portfolio</span>
        </RouterLink>

        <div class="header-actions-mobile">
          <div class="lang-dropdown">
            <button class="lang-dropdown-toggle" @click="toggleLangDropdown">
              <img :src="currentLang.flag" :alt="currentLang.name" class="current-flag-img" />
              <svg class="dropdown-arrow" :class="{ rotated: isLangDropdownOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="lang-dropdown-menu" :class="{ open: isLangDropdownOpen }">
              <button 
                v-for="lang in languages" 
                :key="lang.code" 
                @click="changeLanguage(lang.code)" 
                class="lang-option"
                :class="{ active: locale === lang.code }"
              >
                <img :src="lang.flag" :alt="lang.name" class="lang-flag-img" />
                <span class="lang-name">{{ lang.name }}</span>
              </button>
            </div>
          </div>
          <button @click="toggleTheme" class="theme-toggle" :aria-label="t('nav.toggle_theme')">
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
          <button
            class="menu-toggle"
            @click="toggleMenu"
            :aria-expanded="isOpen"
            :aria-label="t('nav.toggle_nav')"
          >
            <svg
              v-if="!isOpen"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="nav-links" :class="{ open: isOpen }">
          <RouterLink
            to="/"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >{{ t('nav.home') }}</RouterLink
          >

          <!-- Dropdown pour Projets -->
          <div class="nav-dropdown">
            <button
              class="nav-link dropdown-toggle"
              @click="toggleProjectsDropdown"
              :class="{ active: isDropdownOpen }"
            >
              {{ t('nav.projects') }}
              <svg
                class="dropdown-arrow"
                :class="{ rotated: isDropdownOpen }"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div class="dropdown-menu" :class="{ open: isDropdownOpen }">
              <RouterLink
                to="/projects"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >{{ t('nav.projects') }}</RouterLink
              >
              <RouterLink
                to="/projects-timeline"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >{{ t('nav.timeline') }}</RouterLink
              >
            </div>
          </div>

          <RouterLink
            to="/certifications"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >{{ t('nav.certifications') }}</RouterLink
          >
          <RouterLink
            to="/languages"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >{{ t('nav.languages') }}</RouterLink
          >

          <!-- Dropdown pour Mon parcours -->
          <div class="nav-dropdown">
            <button
              class="nav-link dropdown-toggle"
              @click="toggleParcoursDropdown"
              :class="{ active: isParcoursDropdownOpen }"
            >
              {{ t('nav.parcours') }}
              <svg
                class="dropdown-arrow"
                :class="{ rotated: isParcoursDropdownOpen }"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div class="dropdown-menu" :class="{ open: isParcoursDropdownOpen }">
              <RouterLink
                to="/objectives"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >{{ t('nav.diplomas') }}</RouterLink
              >
              <RouterLink
                to="/participations"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >{{ t('nav.participations') }}</RouterLink
              >
            </div>
          </div>

          <RouterLink
            to="/blog"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >{{ t('nav.blog') }}</RouterLink
          >
          <RouterLink
            to="/contact"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >{{ t('nav.contact') }}</RouterLink
          >

          <div class="header-actions desktop-only">
            <div class="lang-dropdown">
              <button class="lang-dropdown-toggle" @click="toggleLangDropdown">
                <img :src="currentLang.flag" :alt="currentLang.name" class="current-flag-img" />
                <svg class="dropdown-arrow" :class="{ rotated: isLangDropdownOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="lang-dropdown-menu" :class="{ open: isLangDropdownOpen }">
                <button 
                  v-for="lang in languages" 
                  :key="lang.code" 
                  @click="changeLanguage(lang.code)" 
                  class="lang-option"
                  :class="{ active: locale === lang.code }"
                >
                  <img :src="lang.flag" :alt="lang.name" class="lang-flag-img" />
                  <span class="lang-name">{{ lang.name }}</span>
                </button>
              </div>
            </div>
            <button @click="toggleTheme" class="theme-toggle" aria-label="Changer le thème">
              <span v-if="isDark">☀️</span>
              <span v-else>🌙</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer" v-if="!isResumePage">
      <p>{{ t('footer.rights') }}</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-md);
  transition: all 0.25s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-radius: 0 0 12px 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.logo:hover {
  transform: scale(1.05);
}

.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
  border-radius: 8px;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}
.menu-toggle:active {
  transform: scale(0.98);
}
.menu-toggle:hover {
  background: rgba(0, 0, 0, 0.04);
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: all 0.3s ease;
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
}

.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: width 0.25s ease;
  transform: translateX(-50%);
  border-radius: 3px;
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  width: 60%;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: inline-flex;
  }

  .nav-links {
    position: absolute;
    right: 1rem;
    top: 64px;
    display: grid;
    grid-auto-rows: min-content;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--color-background-soft);
    border: 1px solid var(--color-border);
    backdrop-filter: blur(16px);
    border-radius: 12px;
    box-shadow: var(--shadow-xl);
    transform-origin: top right;
    transform: scale(0.95);
    opacity: 0;
    pointer-events: none;
    width: calc(100% - 2rem);
    max-width: 320px;
    transition:
      transform 0.18s ease,
      opacity 0.18s ease;
  }

  .nav-links.open {
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    display: block;
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
  }

  .nav-dropdown {
    width: 100%;
  }

  .dropdown-toggle {
    justify-content: space-between;
    width: 100%;
  }
}

.main-content {
  flex: 1;
  width: 100%;
}

.footer {
  background: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  padding: 2rem;
  text-align: center;
  color: var(--color-text);
  opacity: 0.9;
}

/* Nouveaux styles pour le dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  transition: all 0.22s ease;
}

.dropdown-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
}

.dropdown-toggle.active {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-switcher button {
  background: none;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  opacity: 0.5;
}

.lang-switcher button:hover {
  opacity: 1;
}

.lang-switcher button.active {
  opacity: 1;
  border-color: var(--primary);
}

.lang-switcher img {
  width: 24px;
  height: auto;
  border-radius: 2px;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
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
}

.desktop-only {
  display: flex;
}

.header-actions-mobile {
  display: none;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .header-actions-mobile {
    display: flex;
  }
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
  transition: background 0.2s ease;
  border-radius: 8px;
  margin: 0.25rem;
}

.dropdown-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

@media (max-width: 768px) {
  .nav-links.open .dropdown-menu {
    position: static;
    box-shadow: none;
    background: transparent;
    border: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 0.5rem;
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    margin: 0;
    border-radius: 8px;
  }
}

/* Language Dropdown */
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
}

.lang-dropdown-toggle:hover {
  background: var(--color-background-mute);
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
  transition: background 0.2s ease;
  color: var(--color-text);
  text-align: left;
}

.lang-option:hover {
  background: rgba(59, 130, 246, 0.1);
}

.lang-option.active {
  background: rgba(59, 130, 246, 0.15);
  color: var(--primary);
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
  }
}
</style>

<style>
/* Styles globaux pour les animations au scroll */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal-up {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Transitions globales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
