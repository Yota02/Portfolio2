<script setup lang="ts">
// Interface pour une certification
interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
  logo: string;
}

// Liste d'exemple de certifications (à personnaliser)
const certifications: Certification[] = [
  {
    id: "cert-2",
    name: "Brevet d’Initiation Aéronautique (BIA)",
    issuer: "Ministère de l’Éducation nationale",
    date: "2021",
    description: "Diplôme attestant des connaissances fondamentales en aéronautique et en espace.",
    link: "https://eduscol.education.fr/sti/aeronautique/bia",
    logo: "bia.gif",
  },
  {
    id: "cert-1",
    name: "Data From Space",
    issuer: "CNES",
    date: "2026",
    description: "Formation sur l'utilisation des données spatiales",
    link: "https://datafromspace.fr/",
    logo: "datafromspace.png",
  },
  {
    id: "cert-3",
    name: "Mooc Aéronautique et Espace",
    issuer: "CNES / FUN-MOOC",
    date: "2026",
    description:
      "Il s'agit d'un cours introductif aux activités, métiers, enjeux et technologies du secteur spatial.",
    link: "https://www.fun-mooc.fr/fr/cours/mooc-espace/",
    logo: "funmooc.svg",
  },
  {
    id: "cert-3",
    name: "Viral Outbreaks and Pandemics, a One Health Approach",
    issuer: "Institut Pasteur / FUN-MOOC",
    date: "2026",
    description:
      "Ce cours explore les origines, la transmission et la prévention des épidémies virales, en adoptant une approche globale de santé publique.",
    link: "https://lms.fun-mooc.fr/courses/course-v1%3Apasteur%2B96025%2Bsession02/",
    logo: "funmooc.svg",
  },
  {
    id: "cert-3",
    name: "Viruses and human cancers",
    issuer: "Institut Pasteur / FUN-MOOC",
    date: "2026",
    description:
      "Ce cours explore les liens entre les virus et le développement de certains cancers, en mettant en lumière les mécanismes biologiques et les implications pour la prévention et le traitement.",
    link: "https://lms.fun-mooc.fr/courses/course-v1:pasteur+96012+session04/info",
    logo: "funmooc.svg",
  },
  {
    id: "cert-4",
    name: "Modeling of Infectious Diseases",
    issuer: "Institut Pasteur / FUN-MOOC",
    date: "2026",
    description:
      "Ce cours explore les méthodes de modélisation des maladies infectieuses, en mettant l'accent sur les approches mathématiques et statistiques pour comprendre la propagation des épidémies.",
    link: "https://lms.fun-mooc.fr/courses/course-v1:pasteur+96020+session03/info",
    logo: "funmooc.svg",
  },

  // Ajoutez d'autres certifications ici
];
</script>

<template>
  <div class="certifications-page">
    <div class="container">
      <div class="header">
        <h1 class="page-title">Mes Certifications</h1>
        <p class="page-subtitle">
          Découvrez les certifications que j'ai obtenues pour renforcer mes compétences.
        </p>
      </div>

      <div class="certifications-grid">
        <div v-for="cert in certifications" :key="cert.id" class="certification-card">
          <img
            :src="cert.logo.startsWith('http') ? cert.logo : `/Portfolio2/icone/${cert.logo}`"
            :alt="`Logo de la certification`"
            class="cert-logo"
            loading="lazy"
          />

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
  background: linear-gradient(
    135deg,
    var(--color-background) 0%,
    rgba(var(--primary-rgb, 59, 130, 246), 0.05) 100%
  );
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out backwards;
  position: relative;
  overflow: hidden;
}

.certification-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.certification-card:nth-child(1) {
  animation-delay: 0.1s;
}
.certification-card:nth-child(2) {
  animation-delay: 0.2s;
}

.certification-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
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

.cert-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
