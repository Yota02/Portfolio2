<script setup lang="ts">
import { projects } from '@/data/projects';

const getImagePath = (folder: string, imageName: string) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL.slice(0, -1) 
    : import.meta.env.BASE_URL;
  return `${baseUrl}/projet/${folder}/${encodeURIComponent(imageName)}`;
};

const printPage = () => {
  window.print();
};

const personalInfo = {
  name: "Alexis Michaux-Kinet",
  title: "Étudiant en 3e année d'Informatique",
  specialization: "Algorithmique & Systèmes Complexes",
  email: "alexis.michaux-kinet@etu.montpellier.fr",
  linkedin: "linkedin.com/in/alexis-michaux-kinet-89062b2b4/",
  github: "github.com/Yota02",
  website: "yota02.github.io/Portfolio2/"
};
</script>

<template>
  <div class="resume-wrapper">
    <!-- UI Header (Hidden on Print) -->
    <header class="no-print ui-header">
      <div class="ui-container">
        <div class="ui-info">
          <h1>Générateur de Portfolio PDF</h1>
          <p>Exportez un résumé professionnel de vos réalisations.</p>
        </div>
        <button @click="printPage" class="print-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Imprimer / Sauvegarder en PDF
        </button>
      </div>
    </header>

    <!-- Document Content -->
    <div class="document-container">
      <!-- Document Header -->
      <header class="doc-header">
        <div class="header-main">
          <h1 class="name">{{ personalInfo.name }}</h1>
          <p class="title">{{ personalInfo.title }}</p>
          <p class="specialization">{{ personalInfo.specialization }}</p>
        </div>
        <div class="header-contact">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            {{ personalInfo.email }}
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            {{ personalInfo.linkedin }}
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            {{ personalInfo.github }}
          </div>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="section-title">Catalogue des Projets</h2>
        
        <div class="projects-grid">
          <article v-for="project in projects" :key="project.id" class="project-card">
            <div class="card-header">
              <div class="title-area">
                <h3 class="project-name">{{ project.name }}</h3>
                <span class="category">{{ project.category }}</span>
              </div>
              <div class="date-area">
                {{ project.startDate }} — {{ project.isOngoing ? 'Présent' : project.endDate }}
              </div>
            </div>

            <div class="card-body">
              <div class="text-content">
                <p class="project-desc">{{ project.description }}</p>
                
                <div class="sub-section">
                  <h4>Réalisations & Fonctionnalités</h4>
                  <ul class="features-list">
                    <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>

                <div class="sub-section">
                  <h4>Technologies</h4>
                  <div class="tech-tags">
                    <span v-for="tag in project.tags" :key="tag" class="tech-tag">{{ tag }}</span>
                  </div>
                </div>
              </div>

              <div class="visual-content">
                <div class="image-list">
                  <div v-for="(img, idx) in project.images" :key="idx" class="img-box">
                    <img :src="getImagePath(project.folder, img)" :alt="project.name" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      
      <footer class="doc-footer">
        <p>Généré depuis mon portfolio en ligne : {{ personalInfo.website }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* --- UI STYLES (Screen only) --- */
.resume-wrapper {
  background: #f4f7f6;
  min-height: 100vh;
  padding-bottom: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ui-header {
  background: #fff;
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.ui-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ui-info h1 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
}

.ui-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.print-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
}

.print-button:hover {
  background: #33a06f;
  transform: translateY(-1px);
}

/* --- DOCUMENT STYLES (Print & Preview) --- */
.document-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Document Header */
.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 3px solid #42b883;
  padding-bottom: 25px;
  margin-bottom: 40px;
}

.header-main .name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -1px;
}

.header-main .title {
  font-size: 1.2rem;
  color: #42b883;
  font-weight: 600;
  margin: 5px 0;
}

.header-main .specialization {
  color: #666;
  font-style: italic;
  margin: 0;
}

.header-contact {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: 0.9rem;
  color: #444;
}

.contact-item svg {
  color: #42b883;
}

/* Projects Section */
.section-title {
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 30px;
  display: block;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.project-card {
  border-left: 4px solid #f0f0f0;
  padding-left: 20px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  page-break-after: avoid;
}

.project-name {
  font-size: 1.6rem;
  color: #1a1a1a;
  margin: 0;
  display: inline-block;
  margin-right: 15px;
}

.category {
  font-size: 0.8rem;
  background: #f0fdf4;
  color: #166534;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.date-area {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.project-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 15px;
}

.sub-section h4 {
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #777;
  margin: 0 0 10px;
  letter-spacing: 1px;
}

.features-list {
  padding-left: 18px;
  margin-bottom: 20px;
}

.features-list li {
  margin-bottom: 5px;
  color: #444;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-size: 0.8rem;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
  background: #f8fafc;
  color: #475569;
}

/* Visual Content / Images */
.image-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.img-box {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #eee;
  page-break-inside: avoid;
  background: #fafafa;
}

.img-box img {
  width: 100%;
  height: auto;
  display: block;
}

.doc-footer {
  margin-top: 50px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  text-align: center;
  color: #999;
  font-size: 0.8rem;
}

/* --- PRINT RULES --- */
@media print {
  @page {
    margin: 1.5cm;
    size: A4;
  }

  body {
    background: white !important;
  }

  .resume-wrapper {
    background: white;
    padding: 0;
  }

  .no-print {
    display: none !important;
  }

  .document-container {
    box-shadow: none;
    padding: 0;
    width: 100%;
    max-width: none;
  }

  .project-card {
    border-left: 2px solid #eee; 
    margin-bottom: 60px;
  }

  .img-box {
    border: 1px solid #ddd;
    box-shadow: none;
  }

  .section-title {
    margin-top: 40px;
  }
}

@media (max-width: 850px) {
  .document-container {
    padding: 20px;
  }
  .doc-header {
    flex-direction: column;
    gap: 20px;
  }
  .header-contact {
    text-align: left;
    align-items: flex-start;
  }
}
</style>
