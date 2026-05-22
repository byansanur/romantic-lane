<template>
  <div class="slide-container" :style="slideStyle">
    <!-- Full Image Background for layout-full-image -->
    <div class="full-image-bg" v-if="slideData.layout === 'layout-full-image' && images.length === 1">
      <img :src="images[0]" alt="Background" class="full-img" />
      <div class="gradient-overlay"></div>
    </div>

    <!-- CSS Shapes/Decorations based on slide data -->
    <div v-if="slideData.shape === 'circle' && slideData.layout !== 'layout-full-image'" class="shape shape-circle"></div>
    <div v-if="slideData.shape === 'blob' && slideData.layout !== 'layout-full-image'" class="shape shape-blob"></div>
    
    <!-- Floating Decorations -->
    <div class="decorations" v-if="slideData.layout !== 'layout-full-image'">
      <span class="decor decor-1">✨</span>
      <span class="decor decor-2">❤️</span>
      <span class="decor decor-3">✨</span>
      <span class="decor decor-4">❤️</span>
    </div>
    
    <div class="content-wrapper" :class="[slideData.layout || 'layout-default', slideData.alignText === 'top' ? 'align-top' : '']">
      <!-- Card Stack (layout-reverse: 1, 2, or N>2 stacked photos) -->
      <CardStack 
        v-if="slideData.layout === 'layout-reverse' && images.length > 0" 
        :images="images" 
      />

      <!-- Photo Grid (layout-split: 3, 4, 6 grid photos) -->
      <PhotoGrid 
        v-else-if="images.length > 0 && slideData.layout !== 'layout-full-image'" 
        :images="images" 
      />

      <div class="emoji-container" v-if="slideData.emoji && !slideData.image">
        <span class="emoji">{{ slideData.emoji }}</span>
      </div>
      
      <h1 class="title" v-if="slideData.title">{{ slideData.title }}</h1>
      <p class="message" v-if="slideData.text || slideData.message" v-html="slideData.text || slideData.message"></p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CardStack from '../collage/CardStack.vue';
import PhotoGrid from '../collage/PhotoGrid.vue';

const props = defineProps({
  slideData: {
    type: Object,
    required: true
  }
});

const images = computed(() => {
  const imgs = props.slideData.photos || props.slideData.image;
  if (!imgs || (Array.isArray(imgs) && imgs.length === 0)) return [];
  return Array.isArray(imgs) ? imgs : [imgs];
});

const slideStyle = computed(() => {
  return {
    background: props.slideData.background || 'var(--color-bg-panel)'
  };
});
</script>

<style scoped>
.slide-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Full Image Background */
.full-image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.full-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%);
}

.content-wrapper {
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  animation: fadeUp 1s ease-out forwards;
  width: 100%;
}

/* Layout Variations */
.layout-default {
  flex-direction: column;
  justify-content: center;
}

.layout-reverse {
  flex-direction: column-reverse;
  justify-content: center;
}

.layout-split {
  flex-direction: column;
  justify-content: space-evenly;
  height: 85%;
}

.layout-full-image {
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 4rem;
  z-index: 10;
}

.align-top {
  justify-content: flex-start !important;
  padding-top: 6rem !important;
  padding-bottom: 0 !important;
}

.layout-full-image .title,
.layout-full-image .message {
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

.emoji {
  font-size: 5rem;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
  animation: float 3s ease-in-out infinite;
  display: inline-block;
}

.title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.2;
}

.message {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 300;
  padding: 0 1rem;
}

/* Floating Decorations */
.decorations {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 5;
}

.decor {
  position: absolute;
  opacity: 0.6;
  animation: float-decor 6s ease-in-out infinite;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
}

.decor-1 { top: 12%; left: 8%; font-size: 2.2rem; animation-delay: 0s; }
.decor-2 { top: 18%; right: 12%; font-size: 1.5rem; animation-delay: 1.5s; }
.decor-3 { bottom: 22%; left: 15%; font-size: 1.8rem; animation-delay: 3s; }
.decor-4 { bottom: 15%; right: 10%; font-size: 2.5rem; animation-delay: 4.5s; }

/* CSS Shapes */
.shape {
  position: absolute;
  z-index: 1;
  opacity: 0.15;
}

.shape-circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: var(--color-secondary);
  top: -50px;
  right: -100px;
  filter: blur(40px);
}

.shape-blob {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, var(--color-tertiary), transparent);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  bottom: -100px;
  left: -150px;
  filter: blur(50px);
  animation: morph 8s ease-in-out infinite;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes morph {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}

@keyframes float-decor {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  50% { transform: translateY(-20px) rotate(15deg) scale(1.1); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
</style>
