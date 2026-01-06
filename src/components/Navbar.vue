<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink to="/" class="logo">
        <img src="/logo.png" alt="Logo" />
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/projects" class="nav-link">Projets</RouterLink>
        <RouterLink to="/competencies" class="nav-link">Compétences</RouterLink>
        <RouterLink to="/participations" class="nav-link">Participations</RouterLink>
        <RouterLink to="/about" class="nav-link">À Propos</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// script setup pour la navbar si nécessaire
</script>

<style scoped>
.navbar {
  background: var(--color-background);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}
</style>
