<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppPageHeader from '@/components/AppPageHeader.vue';
import AppSection from '@/components/AppSection.vue';
import AppCard from '@/components/AppCard.vue';
import AppButton from '@/components/AppButton.vue';
import { BookOpen } from 'lucide-vue-next';

const { t } = useI18n();

const sections = [
  'identification',
  'missions',
  'skills',
  'balance'
];
</script>

<template>
  <div class="professional-experience">
    <div class="container">
      <AppPageHeader 
        :title="t('professional_experience_analysis.title')"
        :subtitle="t('professional_experience_analysis.subtitle')"
        centered
      />

      <div class="intro-text reveal-up">
        <p>{{ t('professional_experience_analysis.intro') }}</p>
      </div>

      <div class="content-container">
        <AppSection v-for="(sectionKey, index) in sections" :key="sectionKey">
          <AppCard 
            reveal="up" 
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <template #header>
              <h2 class="card-title">{{ t(`professional_experience_analysis.sections.${sectionKey}.title`) }}</h2>
            </template>
            <p class="pre-line">{{ t(`professional_experience_analysis.sections.${sectionKey}.content`) }}</p>
          </AppCard>
        </AppSection>

        <AppSection>
          <AppCard variant="highlight" reveal="up" :style="{ transitionDelay: '600ms' }">
            <template #header>
              <h2 class="card-title">{{ t('professional_experience_analysis.portfolio_link.title') }}</h2>
            </template>
            <p>
              {{ t('professional_experience_analysis.portfolio_link.content') }}
            </p>
            <template #footer>
              <div class="action-buttons">
                <AppButton to="/portfolio-apprentissage" :icon="BookOpen">
                  {{ t('professional_experience_analysis.portfolio_link.button') }}
                </AppButton>
              </div>
            </template>
          </AppCard>
        </AppSection>
      </div>
    </div>
  </div>
</template>

<style scoped>
.professional-experience {
  padding: 6rem 2rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
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
}

.card-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.01em;
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .professional-experience {
    padding: 4rem 1.5rem;
  }
}
</style>

