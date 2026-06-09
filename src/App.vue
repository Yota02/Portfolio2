<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { useTheme } from "@/composables/useTheme";
import { useSafeIntersectionObserver } from "@/composables/useSafeIntersectionObserver";
import AppLangSwitcher from "@/components/AppLangSwitcher.vue";
import AppNavDropdown from "@/components/AppNavDropdown.vue";
import AppThemeToggle from "@/components/AppThemeToggle.vue";
import { Menu, X } from 'lucide-vue-next';

const { locale, t } = useI18n();
const route = useRoute();
const isOpen = ref(false);

const { initTheme } = useTheme();
const { observe, disconnectAll } = useSafeIntersectionObserver();

const hideHeaderFooter = computed(() => route.path === '/resume' || route.path.startsWith('/admin'));

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

const closeMenu = () => {
  isOpen.value = false;
};

// Reveal Animation Logic
const setupRevealAnimations = () => {
  disconnectAll();

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const elements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
  if (elements.length > 0) {
    observe(elements, (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);
  }
};

onMounted(() => {
  initTheme();

  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    locale.value = savedLang;
  }
});
</script>

<template>
  <div class="app-container">
    <header v-if="!hideHeaderFooter">
      <nav class="nav-container">
        <RouterLink to="/" class="logo" @click="closeMenu">
          <span class="logo-text">Portfolio</span>
        </RouterLink>

        <div class="header-actions-mobile">
          <AppLangSwitcher />
          <AppThemeToggle />
          <button
            class="menu-toggle"
            @click="toggleMenu"
            :aria-expanded="isOpen"
            :aria-label="t('nav.toggle_nav')"
          >
            <Menu v-if="!isOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>

        <div class="nav-links" :class="{ open: isOpen }">
          <RouterLink to="/" class="nav-link" @click="closeMenu">{{ t('nav.home') }}</RouterLink>

          <AppNavDropdown
            :label="t('nav.projects')"
            :items="[
              { to: '/projects', label: t('nav.projects') },
              { to: '/projects-timeline', label: t('nav.timeline') },
              { to: '/rosalind', label: t('nav.rosalind') }
            ]"
            @close-menu="closeMenu"
          />

          <RouterLink to="/certifications" class="nav-link" @click="closeMenu">{{ t('nav.certifications') }}</RouterLink>
          <RouterLink to="/languages" class="nav-link" @click="closeMenu">{{ t('nav.languages') }}</RouterLink>

          <AppNavDropdown 
            :label="t('nav.parcours')" 
            :items="[
              { to: '/objectives', label: t('nav.diplomas') },
              { to: '/participations', label: t('nav.participations') }
            ]"
            @close-menu="closeMenu"
          />

          <RouterLink to="/contact" class="nav-link" @click="closeMenu">{{ t('nav.contact') }}</RouterLink>

          <div class="header-actions desktop-only">
            <AppLangSwitcher />
            <AppThemeToggle />
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition 
          name="page" 
          mode="out-in"
          appear
          @after-enter="setupRevealAnimations"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer" v-if="!hideHeaderFooter">
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
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
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
    transition: all 0.2s ease;
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

  .desktop-only {
    display: none;
  }
  
  .header-actions-mobile {
    display: flex;
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
</style>

<style>
/* Styles globaux pour les animations au scroll */
.reveal, .reveal-up, .reveal-left, .reveal-right {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal-up { transform: translateY(40px); }
.reveal-left { transform: translateX(-40px); }
.reveal-right { transform: translateX(40px); }

.revealed {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
