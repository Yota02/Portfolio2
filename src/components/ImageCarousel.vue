<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  images: string[]
  folder: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL
const currentImageIndex = ref(0)

// Réinitialise l'index si la liste des images change (essentiel lors du changement de projet)
watch(() => props.images, () => {
  currentImageIndex.value = 0
}, { deep: true })

const fullImages = computed(() => {
  return props.images.map(img =>
    img.startsWith('http') ? img : `${baseUrl}projet/${props.folder}/${img}`
  )
})

const isVideo = (src?: string): boolean => {
  if (!src) return false
  return src.endsWith('.webm') || src.endsWith('.mp4') || src.endsWith('.avi')
}

const nextImage = () => {
  if (fullImages.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % fullImages.value.length
  }
}

const prevImage = () => {
  if (fullImages.value.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0 ? fullImages.value.length - 1 : currentImageIndex.value - 1
  }
}

const setIndex = (index: number) => {
  currentImageIndex.value = index
}
</script>

<template>
  <div class="carousel-container">
    <div class="carousel">
      <div v-if="fullImages.length > 0" class="carousel-slide">
        <video 
          v-if="isVideo(fullImages[currentImageIndex])" 
          :key="fullImages[currentImageIndex]"
          :src="fullImages[currentImageIndex]" 
          controls 
          autoplay 
          muted 
          loop 
          class="carousel-image"
        ></video>
        <img v-else :key="fullImages[currentImageIndex]" :src="fullImages[currentImageIndex]" :alt="t('projects.image_alt')" class="carousel-image" />
      </div>
      <div v-else class="image-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <p>{{ t('projects.image_alt') }}</p>
      </div>
    </div>
    <button v-if="fullImages.length > 1" @click="prevImage" class="carousel-btn prev" aria-label="Image précédente">&lt;</button>
    <button v-if="fullImages.length > 1" @click="nextImage" class="carousel-btn next" aria-label="Image suivante">&gt;</button>
    <div v-if="fullImages.length > 1" class="carousel-indicators">
      <span 
        v-for="(img, index) in fullImages" 
        :key="index" 
        :class="['indicator', { active: index === currentImageIndex }]" 
        @click="setIndex(index)"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel {
  border-radius: 20px;
  overflow: hidden;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: black;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.carousel-btn:hover {
  background: var(--primary);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.4);
}

.carousel-btn.prev { left: 1.5rem; }
.carousel-btn.next { right: 1.5rem; }

.carousel-indicators {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
  padding: 0.4rem 0.75rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.indicator.active {
  background: var(--primary);
  width: 20px;
  border-radius: 4px;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: var(--color-text);
  opacity: 0.5;
  text-align: center;
}

@media (max-width: 768px) {
  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .carousel-btn.prev { left: 0.75rem; }
  .carousel-btn.next { right: 0.75rem; }
  .carousel-indicators { bottom: 0.75rem; }
}
</style>
