<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <nav class="nav-container">
        <RouterLink to="/" class="logo">
          <span class="logo-text">Portfolio</span>
        </RouterLink>
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Accueil</RouterLink>
          <RouterLink to="/projects" class="nav-link">Projets</RouterLink>
          <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Mon Portfolio. Tous droits réservés.</p>
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
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
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
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 10px 10px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
}

@media (prefers-color-scheme: dark) {
  .nav-container {
    background: linear-gradient(135deg, rgba(24, 24, 24, 0.1) 0%, rgba(24, 24, 24, 0.05) 100%);
  }
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: var(--color-text);
  transition: all 0.3s ease;
  border-radius: 5px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  width: 80%;
}

.nav-link:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.router-link-exact-active {
  color: var(--primary);
  background: rgba(0, 123, 255, 0.05);
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
  opacity: 0.7;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
