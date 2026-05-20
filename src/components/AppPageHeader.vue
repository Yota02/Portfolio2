<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  centered?: boolean
}>()
</script>

<template>
  <header :class="['app-page-header', { centered }]" class="reveal-up">
    <h1 class="page-title" v-html="title"></h1>
    <p v-if="subtitle" class="page-subtitle" v-html="subtitle"></p>
    <div v-if="centered" class="title-underline"></div>
    <slot name="after"></slot>
  </header>
</template>

<style scoped>
.app-page-header {
  margin-bottom: 4rem;
}

.app-page-header.centered {
  text-align: center;
}

.page-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.7;
  max-width: 800px;
  margin-bottom: 1.5rem;
}

.centered .page-subtitle {
  margin-left: auto;
  margin-right: auto;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 1.5rem auto 0;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .app-page-header {
    margin-bottom: 2.5rem;
  }
  .page-title {
    font-size: 2.5rem;
  }
}
</style>
