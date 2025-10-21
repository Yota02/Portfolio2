<script setup lang="ts">
// Interface pour une certification
interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  description: string
  link: string
}

// Liste d'exemple de certifications (à personnaliser)
const certifications: Certification[] = [
{
    id: 'cert-2',
    name: 'Brevet d’Initiation Aéronautique (BIA)',
    issuer: 'Ministère de l’Éducation nationale',
    date: '2021',
    description: 'Diplôme attestant des connaissances fondamentales en aéronautique et en espace.',
    link: 'https://eduscol.education.fr/sti/aeronautique/bia'
},
  
  // Ajoutez d'autres certifications ici
]
</script>

<template>
  <div class="certifications-page">
    <div class="container">
      <div class="header">
        <h1 class="page-title">Mes Certifications</h1>
        <p class="page-subtitle">Découvrez les certifications que j'ai obtenues pour renforcer mes compétences.</p>
      </div>

      <div class="certifications-grid">
        <div v-for="cert in certifications" :key="cert.id" class="certification-card">
          <h2 class="cert-title">{{ cert.name }}</h2>
          <p class="cert-issuer">Émis par : {{ cert.issuer }}</p>
          <p class="cert-date">Date : {{ cert.date }}</p>
          <p class="cert-description">{{ cert.description }}</p>
          <a :href="cert.link" target="_blank" class="cert-link">Voir le certificat →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certifications-page {
  min-height: 80vh;
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.certification-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.6s ease-out backwards;
}

.certification-card:nth-child(1) { animation-delay: 0.1s; }
.certification-card:nth-child(2) { animation-delay: 0.2s; }

.certification-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary);
}

.cert-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.cert-issuer,
.cert-date {
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.cert-description {
  color: var(--color-text);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.cert-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cert-link:hover {
  transform: translateX(5px);
  color: var(--accent);
}

@media (max-width: 768px) {
  .certifications-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .certifications-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .certification-card {
    padding: 1.5rem;
  }
}
</style>
