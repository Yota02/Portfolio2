<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageMeta } from '@/composables/usePageMeta'
import { useRosalind } from '@/composables/useRosalind'
import AppPageHeader from '@/components/AppPageHeader.vue'
import AppCard from '@/components/AppCard.vue'
import { Github, ExternalLink, ChevronDown, RefreshCw } from 'lucide-vue-next'

const { t } = useI18n()
usePageMeta('rosalind.title', 'rosalind.subtitle')

const { data, loading, error } = useRosalind()

const GITHUB_URL = 'https://github.com/Yota02/Rosalind_Problems'

const expandedCategories = ref<Set<string>>(new Set())

const toggleCategory = (name: string) => {
  if (expandedCategories.value.has(name)) {
    expandedCategories.value.delete(name)
  } else {
    expandedCategories.value.add(name)
  }
}

const totalPercent = computed(() =>
  data.value && data.value.totalProblems > 0
    ? Math.round((data.value.totalSolved / data.value.totalProblems) * 100)
    : 0
)
const easyPercent = computed(() =>
  data.value && data.value.easyTotal > 0
    ? Math.round((data.value.easySolved / data.value.easyTotal) * 100)
    : 0
)
const mediumPercent = computed(() =>
  data.value && data.value.mediumTotal > 0
    ? Math.round((data.value.mediumSolved / data.value.mediumTotal) * 100)
    : 0
)
const hardPercent = computed(() =>
  data.value && data.value.hardTotal > 0
    ? Math.round((data.value.hardSolved / data.value.hardTotal) * 100)
    : 0
)

const categorySolved = (cat: { problems: { solved: boolean }[] }) =>
  cat.problems.filter(p => p.solved).length

const categoryPercent = (cat: { problems: { solved: boolean }[] }) =>
  cat.problems.length > 0
    ? Math.round((categorySolved(cat) / cat.problems.length) * 100)
    : 0

const CIRCUMFERENCE = 2 * Math.PI * 38
const ringOffset = (pct: number) => CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE
</script>

<template>
  <div class="rosalind-page">
    <!-- SVG gradient definition -->
    <svg width="0" height="0" aria-hidden="true" style="position:absolute">
      <defs>
        <linearGradient id="rosalind-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: var(--primary)" />
          <stop offset="100%" style="stop-color: var(--accent)" />
        </linearGradient>
      </defs>
    </svg>

    <div class="container">
      <AppPageHeader
        :title="t('rosalind.title')"
        :subtitle="t('rosalind.subtitle')"
        centered
      >
        <template #after>
          <a :href="GITHUB_URL" target="_blank" rel="noopener" class="github-link">
            <Github :size="18" />
            {{ t('rosalind.github_link') }}
            <ExternalLink :size="14" />
          </a>
        </template>
      </AppPageHeader>

      <!-- Loading -->
      <div v-if="loading" class="state-center reveal-up">
        <RefreshCw :size="40" class="spin" />
        <p>{{ t('rosalind.loading') }}</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-center error reveal-up">
        <p>{{ t('rosalind.error') }}</p>
        <code>{{ error }}</code>
      </div>

      <template v-else-if="data">
        <!-- Stats -->
        <section class="stats-section reveal-up">
          <div class="main-ring-wrap">
            <svg class="ring-svg" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="38" class="ring-bg" />
              <circle
                cx="44" cy="44" r="38"
                class="ring-fill"
                :stroke-dasharray="CIRCUMFERENCE"
                :stroke-dashoffset="ringOffset(totalPercent)"
                stroke="url(#rosalind-ring-gradient)"
              />
            </svg>
            <div class="ring-center">
              <span class="ring-pct">{{ totalPercent }}%</span>
              <span class="ring-label">{{ data.totalSolved }}/{{ data.totalProblems }}</span>
            </div>
            <p class="ring-title">{{ t('rosalind.total') }}</p>
          </div>

          <div class="diff-bars">
            <div class="diff-item easy">
              <div class="diff-header">
                <span class="diff-dot"></span>
                <span class="diff-name">{{ t('rosalind.easy') }}</span>
                <span class="diff-count">{{ data.easySolved }}/{{ data.easyTotal }}</span>
                <span class="diff-pct">{{ easyPercent }}%</span>
              </div>
              <div class="diff-bar-track">
                <div class="diff-bar-fill" :style="{ width: easyPercent + '%' }"></div>
              </div>
            </div>

            <div class="diff-item medium">
              <div class="diff-header">
                <span class="diff-dot"></span>
                <span class="diff-name">{{ t('rosalind.medium') }}</span>
                <span class="diff-count">{{ data.mediumSolved }}/{{ data.mediumTotal }}</span>
                <span class="diff-pct">{{ mediumPercent }}%</span>
              </div>
              <div class="diff-bar-track">
                <div class="diff-bar-fill" :style="{ width: mediumPercent + '%' }"></div>
              </div>
            </div>

            <div class="diff-item hard">
              <div class="diff-header">
                <span class="diff-dot"></span>
                <span class="diff-name">{{ t('rosalind.hard') }}</span>
                <span class="diff-count">{{ data.hardSolved }}/{{ data.hardTotal }}</span>
                <span class="diff-pct">{{ hardPercent }}%</span>
              </div>
              <div class="diff-bar-track">
                <div class="diff-bar-fill" :style="{ width: hardPercent + '%' }"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Categories -->
        <section class="categories-section">
          <AppCard
            v-for="cat in data.categories"
            :key="cat.name"
            class="category-card reveal-up"
          >
            <template #header>
              <button class="cat-header" @click="toggleCategory(cat.name)">
                <div class="cat-meta">
                  <span class="cat-emoji">{{ cat.emoji }}</span>
                  <span class="cat-name">{{ cat.name }}</span>
                  <span class="cat-progress-label">
                    {{ categorySolved(cat) }}/{{ cat.problems.length }}
                  </span>
                </div>
                <div class="cat-right">
                  <div class="cat-mini-bar">
                    <div
                      class="cat-mini-fill"
                      :class="{
                        'all-done': categoryPercent(cat) === 100,
                        'partial': categoryPercent(cat) > 0 && categoryPercent(cat) < 100
                      }"
                      :style="{ width: categoryPercent(cat) + '%' }"
                    ></div>
                  </div>
                  <ChevronDown
                    :size="16"
                    class="cat-chevron"
                    :class="{ rotated: expandedCategories.has(cat.name) }"
                  />
                </div>
              </button>
            </template>

            <Transition name="expand">
              <div v-if="expandedCategories.has(cat.name)" class="problems-grid">
                <div
                  v-for="problem in cat.problems"
                  :key="problem.id"
                  class="problem-chip"
                  :class="[problem.difficulty, { solved: problem.solved }]"
                >
                  <span class="problem-id">{{ problem.id }}</span>
                  <span class="problem-title">{{ problem.title }}</span>
                  <span v-if="problem.solved" class="problem-check">✓</span>
                </div>
              </div>
            </Transition>
          </AppCard>
        </section>

        <p class="auto-note reveal-up">
          ⚡ {{ t('rosalind.auto_updated') }}
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.rosalind-page {
  padding: 4rem 0 6rem;
  min-height: 100vh;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
}

.github-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 6rem 0;
  color: var(--color-text);
  opacity: 0.6;
}

.state-center.error { color: #ef4444; opacity: 1; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Stats */
.stats-section {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2rem;
}

.main-ring-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.ring-svg {
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
  display: block;
}

.ring-bg {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 8;
}

.ring-fill {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease;
}

.ring-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  text-align: center;
  pointer-events: none;
}

.ring-pct {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.ring-label {
  display: block;
  font-size: 0.7rem;
  color: var(--color-text);
  opacity: 0.5;
  margin-top: 3px;
}

.ring-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.6;
  margin: 0;
}

/* Diff bars */
.diff-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.diff-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.diff-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.easy .diff-dot   { background: #22c55e; }
.medium .diff-dot { background: #eab308; }
.hard .diff-dot   { background: #ef4444; }

.diff-name {
  font-weight: 600;
  color: var(--color-text);
}

.diff-count {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.5;
}

.diff-pct {
  font-weight: 700;
  min-width: 3rem;
  text-align: right;
}

.easy .diff-pct   { color: #22c55e; }
.medium .diff-pct { color: #ca8a04; }
.hard .diff-pct   { color: #ef4444; }

.diff-bar-track {
  height: 8px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.diff-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1s ease;
  min-width: 0;
}

.easy .diff-bar-fill   { background: #22c55e; }
.medium .diff-bar-fill { background: #eab308; }
.hard .diff-bar-fill   { background: #ef4444; }

/* Categories */
.categories-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-card :deep(.card-header) {
  padding: 0;
  background: transparent;
  border-bottom: none;
}

.category-card :deep(.card-body) {
  padding: 0;
}

.cat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.1rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  text-align: left;
  border-radius: 20px;
  transition: background 0.2s;
}

.cat-header:hover {
  background: rgba(var(--primary-rgb), 0.04);
}

.cat-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cat-emoji { font-size: 1.15rem; }

.cat-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.cat-progress-label {
  font-size: 0.75rem;
  opacity: 0.5;
  background: var(--color-background);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
}

.cat-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.cat-mini-bar {
  width: 80px;
  height: 5px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.cat-mini-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--color-border);
  transition: width 0.8s ease;
}

.cat-mini-fill.partial  { background: linear-gradient(90deg, var(--primary), var(--accent)); }
.cat-mini-fill.all-done { background: #22c55e; }

.cat-chevron {
  transition: transform 0.25s ease;
  opacity: 0.45;
}

.cat-chevron.rotated { transform: rotate(180deg); }

/* Problems grid */
.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 0.45rem;
  padding: 0.25rem 1.5rem 1.25rem;
}

.problem-chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  font-size: 0.78rem;
  overflow: hidden;
}

.problem-chip.solved {
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.04);
}

.problem-id {
  font-weight: 700;
  font-size: 0.68rem;
  padding: 0.12rem 0.35rem;
  border-radius: 4px;
  flex-shrink: 0;
  font-family: monospace;
  letter-spacing: 0.03em;
}

.easy   .problem-id { background: rgba(34, 197, 94, 0.12); color: #16a34a; }
.medium .problem-id { background: rgba(234, 179, 8, 0.12);  color: #ca8a04; }
.hard   .problem-id { background: rgba(239, 68, 68, 0.12);  color: #dc2626; }

.problem-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
  opacity: 0.7;
}

.problem-chip.solved .problem-title { opacity: 1; }

.problem-check {
  font-size: 0.7rem;
  color: #22c55e;
  font-weight: 800;
  flex-shrink: 0;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.auto-note {
  text-align: center;
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.35;
  margin-top: 3rem;
}

@media (max-width: 600px) {
  .stats-section {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .main-ring-wrap { align-self: center; }

  .cat-mini-bar { display: none; }

  .problems-grid {
    grid-template-columns: 1fr 1fr;
    padding: 0.25rem 1rem 1rem;
  }
}
</style>
