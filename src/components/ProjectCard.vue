<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { type Project, purposeMap } from '@/data/projects'

interface Props {
  project: Project
}

defineProps<Props>()

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL

const getLogoSrc = (project: Project) => {
  const logo = project.logo_recadrer || project.logo
  return logo.startsWith('http') ? logo : `${baseUrl}projet/${project.folder}/${logo}`
}

const getDisplayedTags = (tags: string[], maxTags: number = 3) => {
  const displayed = tags.slice(0, maxTags)
  const remaining = tags.length - maxTags
  return { displayed, remaining }
}
</script>

<template>
  <RouterLink
    :to="{ name: 'project-detail', params: { id: project.id } }"
    class="project-card"
  >
    <div class="card-image-container">
      <img
        :src="getLogoSrc(project)"
        :alt="`Logo du projet ${project.name}`"
        class="card-image"
        loading="lazy"
      />
    </div>

    <div class="card-info-badges">
      <span v-if="project.version" class="badge version-badge">v{{ project.version }}</span>
      <span
        class="badge purpose-badge"
        :class="purposeMap[project.purpose]"
      >
        {{ t('projects.purposes.' + purposeMap[project.purpose]) }}
      </span>
    </div>

    <h2 class="card-title">{{ project.name }}</h2>

    <div class="card-tags">
      <span
        v-for="tag in getDisplayedTags(project.tags).displayed"
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </span>
      <span
        v-if="getDisplayedTags(project.tags).remaining > 0"
        class="tag tag-more"
      >
        +{{ getDisplayedTags(project.tags).remaining }}
      </span>
      <span v-if="project.subProjects && project.subProjects.length > 0" class="tag tag-sub">
        📂 {{ project.subProjects.length }} sous-projet{{ project.subProjects.length > 1 ? 's' : '' }}
      </span>
    </div>

    <p class="card-description">{{ t(project.description) }}</p>

    <div class="card-footer">
      <span class="view-project">{{ t('projects.view_project_link') }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 0;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.6s ease-out backwards;
  overflow: hidden;
  position: relative;
}

/* Effet de brillance (Shine) */
.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: left 0.8s ease;
  z-index: 2;
}

.project-card:hover::after {
  left: 150%;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  border-radius: 20px;
}

.project-card > * {
  position: relative;
  z-index: 1;
}

.project-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.3);
  border-color: var(--primary);
}

.project-card:hover::before {
  opacity: 0.03;
}

.card-image-container {
  margin: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
  position: relative;
}

.card-image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .card-image-container::after {
  opacity: 1;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.project-card:hover .card-image {
  transform: scale(1.2) translateY(-10px);
}

.card-info-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.version-badge {
  background: var(--primary);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  border-radius: 8px;
}

.purpose-badge {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.purpose-badge.education {
  background: var(--color-background);
  color: #3b82f6;
  border-color: #3b82f6;
}

.purpose-badge.personnel {
  background: var(--color-background);
  color: #10b981;
  border-color: #10b981;
}

.purpose-badge.professionnel {
  background: var(--color-background);
  color: #8b5cf6;
  border-color: #8b5cf6;
}

.project-card:hover .purpose-badge.education {
  background: #3b82f6;
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.project-card:hover .purpose-badge.personnel {
  background: #10b981;
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.project-card:hover .purpose-badge.professionnel {
  background: #8b5cf6;
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 1.5rem 2rem 0.5rem;
  color: var(--color-heading);
  transition: color 0.3s ease;
}

.project-card:hover .card-title {
  color: var(--primary);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 2rem 1rem;
}

.tag {
  font-size: 0.725rem;
  padding: 0.25rem 0.6rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  font-weight: 600;
  transition: all 0.3s ease;
}

.tag-more {
  background: var(--color-background-mute);
  font-weight: 700;
}

.tag-sub {
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  border-color: rgba(var(--primary-rgb), 0.15);
  font-weight: 700;
}

.project-card:hover .tag {
  border-color: rgba(var(--primary-rgb), 0.2);
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin: 0 2rem 1.5rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-background-soft);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: background 0.3s ease;
}

.project-card:hover .card-footer {
  background: rgba(var(--primary-rgb), 0.02);
}

.view-project {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: transform 0.3s ease;
}

.project-card:hover .view-project {
  transform: translateX(5px);
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
</style>
