<script setup lang="ts">
import { projects } from '@/data/projects';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const getImagePath = (folder: string, imageName: string) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL.slice(0, -1) 
    : import.meta.env.BASE_URL;
  return `${baseUrl}/projet/${folder}/${imageName}`;
};

const printResume = () => {
  window.print();
};
</script>

<template>
  <div class="resume-container">
    <!-- UI Controls (Hidden on print) -->
    <div class="resume-controls no-print">
      <div class="controls-content">
        <h1 class="controls-title">{{ t('resume.generator_title') }}</h1>
        <p class="controls-subtitle">{{ t('resume.generator_subtitle') }}</p>
        <button @click="printResume" class="print-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          {{ t('resume.print_button') }}
        </button>
      </div>
    </div>

    <!-- The actual Resume Document -->
    <div class="resume-document shadow-2xl">
      <!-- Sidebar / Left Column -->
      <aside class="resume-sidebar">
        <div class="profile-section">
          <div class="profile-image-container">
            <div class="profile-placeholder">AMK</div>
          </div>
          <h1 class="profile-name">Alexis Michaux-Kinet</h1>
          <p class="profile-title">{{ t('home.subtitle') }}</p>
        </div>

        <div class="sidebar-section">
          <h2 class="sidebar-heading">{{ t('contact.title').toUpperCase() }}</h2>
          <ul class="contact-list">
            <li>
              <span class="icon">📧</span>
              <span>alexis.michaux-kinet@etu.montpellier.fr</span>
            </li>
            <li>
              <span class="icon">🔗</span>
              <span>linkedin.com/in/alexis-michaux-kinet</span>
            </li>
            <li>
              <span class="icon">💻</span>
              <span>github.com/Yota02</span>
            </li>
            <li>
              <span class="icon">📍</span>
              <span>Montpellier, France</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h2 class="sidebar-heading">{{ t('nav.parcours').toUpperCase() }}</h2>
          <div class="skill-group">
            <h3>Backend & IA</h3>
            <div class="skill-tags">
              <span>Python</span><span>Flask</span><span>Pytorch</span><span>Ollama</span><span>MySQL</span>
            </div>
          </div>
          <div class="skill-group">
            <h3>Frontend</h3>
            <div class="skill-tags">
              <span>Vue.js</span><span>TypeScript</span><span>JavaScript</span><span>HTML5/CSS3</span>
            </div>
          </div>
          <div class="skill-group">
            <h3>Outils & Méthodes</h3>
            <div class="skill-tags">
              <span>Git</span><span>Docker</span><span>Scrum</span><span>Linux</span><span>VS Code</span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h2 class="sidebar-heading">{{ t('nav.languages').toUpperCase() }}</h2>
          <ul class="language-list">
            <li><strong>{{ t('languages.items.lang-1.name') }}:</strong> {{ t('languages.items.lang-1.level') }}</li>
            <li><strong>{{ t('languages.items.lang-2.name') }}:</strong> {{ t('languages.items.lang-2.level') }}</li>
            <li><strong>{{ t('languages.items.lang-7.name') }}:</strong> {{ t('languages.items.lang-7.level') }}</li>
            <li><strong>{{ t('languages.items.lang-4.name') }}:</strong> {{ t('languages.items.lang-4.level') }}</li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h2 class="sidebar-heading">{{ t('about.hobbies.title').toUpperCase() }}</h2>
          <div class="interest-icons">
            <div class="interest-item"><span class="i-icon">🌍</span><span>{{ t('about.hobbies.geopolitics') }}</span></div>
            <div class="interest-item"><span class="i-icon">🚀</span><span>{{ t('about.hobbies.scifi') }}</span></div>
            <div class="interest-item"><span class="i-icon">👥</span><span>{{ t('about.hobbies.sociology') }}</span></div>
            <div class="interest-item"><span class="i-icon">🎥</span><span>{{ t('about.hobbies.cinema') }}</span></div>
          </div>
        </div>
      </aside>

      <!-- Main Content / Right Column -->
      <main class="resume-main">
        <section class="main-section">
          <h2 class="main-heading">{{ t('resume.professional_profile').toUpperCase() }}</h2>
          <p class="profile-summary">
            {{ t('home.description') }}
          </p>
        </section>

        <section class="main-section">
          <h2 class="main-heading">{{ t('objectives.types.experience').toUpperCase() }}</h2>
          <div class="timeline-item">
            <div class="timeline-header">
              <h3 class="item-title">{{ t('objectives.items.obj-7.title') }}</h3>
              <span class="item-date">Avril 2026 - Juillet 2026</span>
            </div>
            <p class="item-subtitle">{{ t('objectives.items.obj-7.institution') }}</p>
            <p class="item-desc">{{ t('objectives.items.obj-6.description') }}</p>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <h3 class="item-title">{{ t('objectives.items.obj-6.title') }}</h3>
              <span class="item-date">Janvier 2025 - Avril 2025</span>
            </div>
            <p class="item-subtitle">{{ t('objectives.items.obj-6.institution') }}</p>
            <p class="item-desc">{{ t('objectives.items.obj-6.description') }}</p>
          </div>
        </section>

        <section class="main-section">
          <h2 class="main-heading">{{ t('objectives.types.education').toUpperCase() }}</h2>
          <div class="timeline-item">
            <div class="timeline-header">
              <h3 class="item-title">{{ t('objectives.items.obj-5.title') }}</h3>
              <span class="item-date">2025 - 2026</span>
            </div>
            <p class="item-subtitle">{{ t('objectives.items.obj-5.institution') }}</p>
            <p class="item-desc">{{ t('objectives.items.obj-5.description') }}</p>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <h3 class="item-title">{{ t('objectives.items.obj-1.title') }}</h3>
              <span class="item-date">2023 - 2026</span>
            </div>
            <p class="item-subtitle">{{ t('objectives.items.obj-1.institution') }}</p>
            <p class="item-desc">{{ t('objectives.items.obj-1.description') }}</p>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <h3 class="item-title">{{ t('objectives.items.obj-2.title') }}</h3>
              <span class="item-date">2020 - 2023</span>
            </div>
            <p class="item-subtitle">{{ t('objectives.items.obj-2.institution') }}</p>
            <p class="item-desc">{{ t('objectives.items.obj-2.description') }}</p>
          </div>
        </section>

        <section class="main-section projects-section">
          <h2 class="main-heading">{{ t('resume.catalogue_title').toUpperCase() }}</h2>
          <div class="projects-grid-mini">
            <div v-for="project in projects.slice(0, 6)" :key="project.id" class="project-mini-card">
              <div class="mini-card-header">
                <img :src="getImagePath(project.folder, project.logo)" :alt="project.name" class="mini-logo">
                <h4 class="mini-name">{{ project.name }}</h4>
              </div>
              <p class="mini-desc">{{ t(project.description) }}</p>
              <div class="mini-tags">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <footer class="resume-footer">
          <p>{{ t('resume.generated_from') }} <strong>alexis-michaux-kinet.com</strong></p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.resume-container {
  min-height: 100vh;
  background-color: var(--color-background-soft);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resume-controls {
  max-width: 800px;
  width: 100%;
  margin-bottom: 30px;
}

.controls-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.controls-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;
}

.controls-subtitle {
  color: #64748b;
  margin-bottom: 20px;
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.print-btn:hover {
  background: #2563eb;
}

/* Document Styles */
.resume-document {
  background: white;
  width: 210mm; /* A4 Width */
  min-height: 297mm; /* A4 Height */
  display: flex;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
}

.resume-sidebar {
  width: 30%;
  background: #1e293b;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-section {
  text-align: center;
}

.profile-image-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-placeholder {
  font-size: 2rem;
  font-weight: 800;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 5px;
}

.profile-title {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.sidebar-heading {
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 5px;
  margin-bottom: 15px;
  color: white;
}

.contact-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-list li {
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
  align-items: center;
}

.icon {
  width: 20px;
  text-align: center;
}

.skill-group {
  margin-bottom: 15px;
}

.skill-group h3 {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #94a3b8;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tags span {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.language-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.75rem;
}

.interest-icons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.interest-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

.resume-main {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main-heading {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.main-heading::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.profile-summary {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #475569;
}

.timeline-item {
  margin-bottom: 20px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.item-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}

.item-date {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
}

.item-subtitle {
  font-size: 0.85rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 10px;
}

.item-details {
  list-style: disc;
  padding-left: 20px;
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
}

.item-desc {
  font-size: 0.85rem;
  color: #475569;
}

.projects-grid-mini {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.project-mini-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.mini-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.mini-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.mini-name {
  font-size: 0.85rem;
  font-weight: 700;
}

.mini-desc {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-tags {
  display: flex;
  gap: 5px;
}

.mini-tags span {
  font-size: 0.65rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 6px;
  border-radius: 4px;
}

.resume-footer {
  margin-top: auto;
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
  padding-top: 20px;
}

@media print {
  .no-print {
    display: none !important;
  }
  .resume-container {
    padding: 0;
    background: white;
  }
  .resume-document {
    box-shadow: none;
    width: 100%;
  }
}

@media (max-width: 850px) {
  .resume-document {
    width: 100%;
    flex-direction: column;
  }
  .resume-sidebar {
    width: 100%;
  }
}
</style>
