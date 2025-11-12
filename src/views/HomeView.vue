<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Bonjour, je suis
            <br>
            <span class="gradient-text">Alexis Michaux-Kinet</span>
          </h1>
          <div class="social-icons">
            <a href="https://github.com/Yota02" target="_blank" rel="noopener" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/alexis-michaux-kinet-89062b2b4/" target="_blank" rel="noopener" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:alexis.michaux-kinet@etu.montpellier.com" class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <!-- Add this link with PDF icon for downloading cv.pdf -->
            <a href="../../Portfolio2/public/pdf/cv.pdf" download class="social-icon" title="mon cv">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16h-4v-4h-4l6-6v4h4v6z"/>
              </svg>
            </a>
          </div>
          <p class="hero-subtitle">Développeur Full Stack passionné</p>
          <p class="hero-description">
            Je crée des applications web modernes et performantes avec Vue.js, TypeScript et bien plus encore.
            Bienvenue dans mon univers créatif.
          </p>
          <div class="hero-actions">
            <RouterLink to="/projects" class="btn btn-primary">
              Voir mes projets
            </RouterLink>

            <RouterLink to="/about" class="btn btn-secondary">
              En savoir plus
            </RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card card-1">
            <img src="../../public/projet/Victoria/logo.png" alt="Image de code">
          </div>
          <div class="floating-card card-2">
            <img src="../../public/projet/starGuardian/logo.png" alt="Image de développement web">
          </div>
          <div class="floating-card card-3">
            <img src="../../public/projet/WorldOfChan/logo.png" alt="Image de technologie">
          </div>
          <div class="floating-card card-4">
            <img src="../../public/projet/CodeTonFutur/logo.png" alt="Image de projet supplémentaire">
          </div>
          <div class="floating-card card-5">
            <img src="../../public/projet/CapitalWars/logo.png" alt="Image de projet supplémentaire">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
}

.social-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  color: var(--color-text);
  transition: all 0.3s ease;
  border-radius: 50%;
  padding: 0.5rem;
  background: transparent;
}

.social-icon:hover {
  color: var(--primary);
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.1);
}

.social-icon svg {
  width: 100%;
  height: 100%;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
  opacity: 0.8;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 2rem;
  opacity: 0.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.hero-visual {
  position: relative;
  height: 400px;
}

.floating-card {
  position: absolute;
  border-radius: 16px;
  box-shadow: var(--shadow-xl);
  animation: float 6s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.card-1 {
  width: 200px;
  height: 200px;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.card-2 {
  width: 150px;
  height: 150px;
  top: 100px;
  right: 50px;
  opacity: 0.6;
  animation-delay: -2s;
}

.card-3 {
  width: 180px;
  height: 180px;
  bottom: 0;
  left: 100px;
  opacity: 0.7;
  animation-delay: -4s;
}

.card-4 {
  width: 130px;
  height: 130px;
  bottom: 50px;
  right: -120px;
  opacity: 0.7;
  animation-delay: -1s;
}

.card-5 {
  width: 100px;
  height: 110px;
  top: 100px;
  right: -230px;
  opacity: 0.6;
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.about {
  padding: 6rem 2rem;
  background: var(--color-background-soft);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.skill-item {
  padding: 0.75rem 1.5rem;
  background: var(--color-background);
  border-radius: 25px;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-visual {
    height: 300px;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
    padding: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    text-align: center;
  }

  .hero-visual {
    display: none;
  }

  .social-icons {
    gap: 0.75rem;
  }
  
  .social-icon {
    width: 45px;
    height: 45px;
  }
}
</style>
