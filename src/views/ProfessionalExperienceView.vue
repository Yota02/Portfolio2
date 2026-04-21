<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const sections = [
  'identification',
  'missions',
  'skills',
  'balance'
];
</script>

<template>
  <div class="professional-experience reveal">
    <div class="header-section">
      <h1 class="title">{{ t('professional_experience_analysis.title') }}</h1>
      <p class="subtitle">{{ t('professional_experience_analysis.subtitle') }}</p>
      <div class="title-underline"></div>
    </div>

    <div class="intro-text">
      <p>{{ t('professional_experience_analysis.intro') }}</p>
    </div>

    <div class="content-container">
      <section v-for="(sectionKey, index) in sections" :key="sectionKey" class="experience-card reveal-up" :style="{ transitionDelay: `${index * 150}ms` }">
        <div class="card-header">
          <h2>{{ t(`professional_experience_analysis.sections.${sectionKey}.title`) }}</h2>
        </div>
        <div class="card-body">
          <p class="pre-line">{{ t(`professional_experience_analysis.sections.${sectionKey}.content`) }}</p>
        </div>
      </section>

      <section class="experience-card reveal-up highlight" :style="{ transitionDelay: '600ms' }">
        <div class="card-header">
          <h2>{{ t('professional_experience_analysis.portfolio_link.title') }}</h2>
        </div>
        <div class="card-body">
          <p>
            {{ t('professional_experience_analysis.portfolio_link.content') }}
          </p>
          <div class="action-buttons">
            <RouterLink to="/portfolio-apprentissage" class="btn btn-primary">
              {{ t('professional_experience_analysis.portfolio_link.button') }}
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.professional-experience {
  max-width: 1000px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
}

.title-underline {
  width: 100px;
  height: 6px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 1.5rem auto 0;
  border-radius: 10px;
}

.intro-text {
  text-align: center;
  margin-bottom: 5rem;
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--color-text);
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.pre-line {
  white-space: pre-line;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.experience-card {
  background: rgba(var(--color-background-soft-rgb), 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.experience-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px -15px rgba(var(--primary-rgb), 0.2);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.card-header {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.08) 0%, rgba(var(--accent-rgb), 0.08) 100%);
  padding: 2rem 2.5rem;
  border-bottom: 1px solid rgba(var(--primary-rgb), 0.1);
}

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.01em;
}

.card-body {
  padding: 2.5rem;
}

.card-body p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--color-text);
}

.highlight {
  border: 2px solid var(--primary);
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.03) 0%, rgba(var(--accent-rgb), 0.03) 100%);
}

.action-buttons {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 100px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.4);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  .professional-experience {
    padding: 4rem 1.5rem;
  }
  .card-header, .card-body {
    padding: 1.5rem;
  }
}
</style>
