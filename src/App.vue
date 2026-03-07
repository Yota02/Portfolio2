<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const isOpen = ref(false);
const isDropdownOpen = ref(false);
const isParcoursDropdownOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
  isDropdownOpen.value = false;
  isParcoursDropdownOpen.value = false; // Fermer les deux dropdowns
}

function toggleProjectsDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  isParcoursDropdownOpen.value = false; // Fermer l'autre dropdown
}

function toggleParcoursDropdown() {
  isParcoursDropdownOpen.value = !isParcoursDropdownOpen.value;
  isDropdownOpen.value = false; // Fermer l'autre dropdown
}
</script>

<template>
  <div class="app-container">
    <header>
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

        <!-- Bouton menu mobile -->
        <button
          class="menu-toggle"
          @click="toggleMenu"
          :aria-expanded="isOpen"
          aria-label="Toggle navigation"
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

        <div class="nav-links" :class="{ open: isOpen }">
          <RouterLink
            to="/"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >Accueil</RouterLink
          >

          <!-- Dropdown pour Projets -->
          <div class="nav-dropdown">
            <button
              class="nav-link dropdown-toggle"
              @click="toggleProjectsDropdown"
              :class="{ active: isDropdownOpen }"
            >
              Projets
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
                >Tous les projets</RouterLink
              >
              <RouterLink
                to="/projects-timeline"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >Timeline des projets</RouterLink
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
            >Certifications</RouterLink
          >
          <RouterLink
            to="/languages"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >Langues</RouterLink
          >
          <!-- <RouterLink to="/victoria" class="nav-link" @click="isOpen = false; isDropdownOpen = false; isParcoursDropdownOpen = false">Victoria</RouterLink>-->

          <!-- Dropdown pour Mon parcours -->
          <div class="nav-dropdown">
            <button
              class="nav-link dropdown-toggle"
              @click="toggleParcoursDropdown"
              :class="{ active: isParcoursDropdownOpen }"
            >
              Mon parcours
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
                >Diplômes & Expériences</RouterLink
              >
              <RouterLink
                to="/participations"
                class="dropdown-item"
                @click="
                  isOpen = false;
                  isDropdownOpen = false;
                  isParcoursDropdownOpen = false;
                "
                >Participations</RouterLink
              >
            </div>
          </div>

          <RouterLink
            to="/contact"
            class="nav-link"
            @click="
              isOpen = false;
              isDropdownOpen = false;
              isParcoursDropdownOpen = false;
            "
            >Contact</RouterLink
          >
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>&copy; 2026 Mon Portfolio. Tous droits réservés.</p>
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
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.7), rgba(250, 250, 250, 0.55));
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.08);
  transition: all 0.25s ease;
}

@media (prefers-color-scheme: dark) {
  header {
    background: rgba(24, 24, 24, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
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
  background: rgba(255, 255, 255, 0.03);
}

@media (prefers-color-scheme: dark) {
  .nav-container {
    background: linear-gradient(135deg, rgba(24, 24, 24, 0.1) 0%, rgba(24, 24, 24, 0.05) 100%);
  }
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
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.95));
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(2, 6, 23, 0.12);
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.95));
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.1);
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
</style>
