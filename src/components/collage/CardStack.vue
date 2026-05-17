<template>
  <!-- Dynamic Stack Layout for > 2 images -->
  <div class="collage-container stack-layout" v-if="images.length > 2">
    <div 
      v-for="(img, index) in images" 
      :key="index"
      class="photo-container collage-item stack-card"
      :style="getStackCardStyle(index)"
    >
      <img :src="img" alt="Memory" class="slide-photo" />
    </div>
  </div>

  <!-- CSS Swap Layout for exactly 2 images -->
  <div class="collage-container count-2" v-else-if="images.length === 2">
    <div class="photo-container collage-item item-1"><img :src="images[0]" class="slide-photo" /></div>
    <div class="photo-container collage-item item-2"><img :src="images[1]" class="slide-photo" /></div>
  </div>

  <!-- Single image -->
  <div class="collage-container count-1" v-else-if="images.length === 1">
    <div class="photo-container collage-item item-1"><img :src="images[0]" class="slide-photo" /></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

// Dynamic Stack Logic
const activeStackIndex = ref(0);
let stackInterval = null;

const getStackCardStyle = (index) => {
  const total = props.images.length;
  if (total <= 2) return {};

  const relIndex = (index - activeStackIndex.value + total) % total;
  
  let translateX = 0;
  let translateY = 0;
  let rotate = 0;
  let scale = 1;
  let zIndex = total - relIndex;
  let opacity = 1;

  if (relIndex === 0) {
    translateX = 0; translateY = 0; rotate = -2; scale = 1.05;
  } else if (relIndex === 1) {
    translateX = 20; translateY = 15; rotate = 5; scale = 0.95;
  } else if (relIndex === 2) {
    translateX = -15; translateY = -10; rotate = -6; scale = 0.90;
  } else if (relIndex === total - 1) {
    translateX = -180; translateY = -40; rotate = -25; scale = 0.9;
    zIndex = total + 1; 
    opacity = 0; 
  } else {
    opacity = 0; scale = 0.8;
  }

  return {
    zIndex,
    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
    opacity,
  };
};

onMounted(() => {
  if (props.images.length > 2) {
    stackInterval = setInterval(() => {
      activeStackIndex.value = (activeStackIndex.value + 1) % props.images.length;
    }, 2500);
  }
});

onUnmounted(() => {
  if (stackInterval) clearInterval(stackInterval);
});
</script>

<style scoped>
.collage-container {
  position: relative;
  width: 100%;
  max-width: 350px;
  height: 380px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-container {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  border: 4px solid rgba(255,255,255,0.15);
  background-color: var(--color-bg-panel);
}

.collage-item {
  position: absolute;
  width: 220px;
  height: 300px;
  transition: transform 0.3s ease;
}

/* Dynamic Stack Card */
.stack-card {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* 1 Image Layout */
.count-1 .item-1 {
  position: relative;
  width: 260px;
  height: 340px;
  transform: rotate(-2deg);
  z-index: 2;
}

/* 2 Images Layout - Animated Swap */
.count-2 .item-1 {
  animation: card-swap-1 5s ease-in-out infinite;
}
.count-2 .item-2 {
  animation: card-swap-2 5s ease-in-out infinite;
}

@keyframes card-swap-1 {
  0%, 30% { transform: rotate(-6deg) translateX(-30px) translateY(-20px); z-index: 1; }
  40% { transform: rotate(-15deg) translateX(-100px) translateY(-10px); z-index: 1; }
  41% { transform: rotate(-15deg) translateX(-100px) translateY(-10px); z-index: 3; }
  50%, 80% { transform: rotate(8deg) translateX(30px) translateY(20px); z-index: 3; }
  90% { transform: rotate(15deg) translateX(100px) translateY(10px); z-index: 3; }
  91% { transform: rotate(15deg) translateX(100px) translateY(10px); z-index: 1; }
  100% { transform: rotate(-6deg) translateX(-30px) translateY(-20px); z-index: 1; }
}

@keyframes card-swap-2 {
  0%, 30% { transform: rotate(8deg) translateX(30px) translateY(20px); z-index: 3; }
  40% { transform: rotate(15deg) translateX(100px) translateY(10px); z-index: 3; }
  41% { transform: rotate(15deg) translateX(100px) translateY(10px); z-index: 1; }
  50%, 80% { transform: rotate(-6deg) translateX(-30px) translateY(-20px); z-index: 1; }
  90% { transform: rotate(-15deg) translateX(-100px) translateY(-10px); z-index: 1; }
  91% { transform: rotate(-15deg) translateX(-100px) translateY(-10px); z-index: 3; }
  100% { transform: rotate(8deg) translateX(30px) translateY(20px); z-index: 3; }
}

.slide-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
