<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePageMeta } from "@/composables/usePageMeta";

const { t } = useI18n();
usePageMeta("objectives.title", "objectives.subtitle");
const baseUrl = import.meta.env.BASE_URL;

interface TimelineItem {
  id: string;
  titleKey: string;
  institutionKey: string;
  date: string;
  descriptionKey: string;
  type: "education" | "experience";
  image: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: "obj-10",
    titleKey: "obj-10.title",
    institutionKey: "obj-10.institution",
    date: "Septembre 2026 - Juin 2028",
    descriptionKey: "obj-10.description",
    type: "education",
    image: "university_lyon.png",
  },
  {
    id: "obj-7",
    titleKey: "obj-7.title",
    institutionKey: "obj-7.institution",
    date: "Avril 2026 - Juillet 2026",
    descriptionKey: "obj-7.description",
    type: "experience",
    image: "csum.webp",
  },
  {
    id: "obj-8",
    titleKey: "obj-8.title",
    institutionKey: "obj-8.institution",
    date: "Mars 2026",
    descriptionKey: "obj-8.description",
    type: "experience",
    image: "Gecolab.png",
  },
  {
    id: "obj-5",
    titleKey: "obj-5.title",
    institutionKey: "obj-5.institution",
    date: "2025 - 2026",
    descriptionKey: "obj-5.description",
    type: "education",
    image: "iae.webp",
  },
  {
    id: "obj-6",
    titleKey: "obj-6.title",
    institutionKey: "obj-6.institution",
    date: "Janvier 2025 - Avril 2025",
    descriptionKey: "obj-6.description",
    type: "experience",
    image: "csum.webp",
  },
  {
    id: "obj-1",
    titleKey: "obj-1.title",
    institutionKey: "obj-1.institution",
    date: "2023 - 2026",
    descriptionKey: "obj-1.description",
    type: "education",
    image: "IUT-Montpellier.webp",
  },
  {
    id: "obj-2",
    titleKey: "obj-2.title",
    institutionKey: "obj-2.institution",
    date: "2020 - 2023",
    descriptionKey: "obj-2.description",
    type: "education",
    image: "jeanJaurès.webp",
  },
  {
    id: "obj-9",
    titleKey: "obj-9.title",
    institutionKey: "obj-9.institution",
    date: "Juillet 2021",
    descriptionKey: "obj-9.description",
    type: "education",
    image: "bia.gif",
  },
];
</script>

<template>
  <div class="objectives-page">
    <div class="container">
      <header class="header reveal-up">
        <h1 class="page-title">{{ t("objectives.title") }}</h1>
        <p class="page-subtitle">{{ t("objectives.subtitle") }}</p>
      </header>

      <div class="timeline-container">
        <div class="timeline-line"></div>

        <div
          v-for="(item, index) in timelineItems"
          :key="item.id"
          class="timeline-item reveal"
          :class="[item.type, index % 2 === 0 ? 'left' : 'right']"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="content-header">
              <div class="icon-wrapper">
                <img
                  :src="`${baseUrl}icone/${item.image}`"
                  :alt="t('objectives.items.' + item.institutionKey)"
                  class="institution-logo"
                />
              </div>
              <span class="item-date">{{ item.date }}</span>
            </div>
            <h3 class="item-title">{{ t("objectives.items." + item.titleKey) }}</h3>
            <h4 class="item-institution">{{ t("objectives.items." + item.institutionKey) }}</h4>
            <p class="item-description">{{ t("objectives.items." + item.descriptionKey) }}</p>
            <span class="item-type-badge">{{ t("objectives.types." + item.type) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.objectives-page {
  min-height: 80vh;
  padding: 4rem 2rem;
  background: var(--color-background);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 5rem;
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

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  margin-bottom: 4rem;
}

.timeline-item.left {
  left: 0;
  padding-right: 3rem;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  padding-left: 3rem;
}

.timeline-dot {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--color-background);
  border: 4px solid var(--primary);
  border-radius: 50%;
  z-index: 1;
}

.timeline-item.left .timeline-dot {
  right: -10px;
}

.timeline-item.right .timeline-dot {
  left: -10px;
}

.timeline-content {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.timeline-item:hover .timeline-content {
  transform: translateY(-5px);
  border-color: var(--primary);
}

.content-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.timeline-item.left .content-header {
  flex-direction: row-reverse;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: white;
  padding: 8px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.institution-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-date {
  font-weight: 700;
  color: var(--primary);
  font-size: 0.9rem;
}

.timeline-item.education .item-date {
  color: #10b981;
}

.item-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-heading);
}

.item-institution {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.item-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

.item-type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-item.education .timeline-dot {
  border-color: #10b981;
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    padding-left: 3rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }

  .timeline-item.right {
    left: 0;
  }

  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 10px;
  }

  .timeline-item.left .content-header {
    flex-direction: row;
  }
}
</style>
