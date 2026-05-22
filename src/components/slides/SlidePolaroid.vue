<template>
  <div class="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-900 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 opacity-60"></div>
    
    <div class="relative z-10 flex flex-col items-center animate-fade-in-up">
      <!-- Title & Subtitle -->
      <div v-if="slideData.title || slideData.subtitle" class="text-center mb-6 w-full px-4">
        <h2 v-if="slideData.title" class="text-2xl font-bold text-rose-400 font-serif drop-shadow-md mb-1">{{ slideData.title }}</h2>
        <h4 v-if="slideData.subtitle" class="text-sm text-rose-300 font-medium tracking-wide">{{ slideData.subtitle }}</h4>
      </div>

      <!-- Polaroid Card -->
      <div class="w-[85%] max-w-[300px] bg-white p-3 pb-8 rounded-sm shadow-2xl shadow-black/50 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
        <div v-if="slideData.photos && slideData.photos.length > 0" class="aspect-[4/5] w-full bg-slate-200 overflow-hidden mb-4 relative">
          <Transition name="fade">
            <img :key="currentPhotoIndex" :src="slideData.photos[currentPhotoIndex]" class="w-full h-full object-cover absolute inset-0" />
          </Transition>
        </div>
        <div v-else class="aspect-[4/5] w-full bg-slate-100 flex items-center justify-center mb-4 border border-slate-200">
          <span class="text-slate-400 text-sm">No Photo</span>
        </div>
        <p v-if="slideData.caption" class="text-center text-slate-800 font-serif text-lg md:text-xl italic px-2 line-clamp-2">
          {{ slideData.caption }}
        </p>
      </div>
      
      <!-- Slide Text -->
      <div v-if="slideData.text" class="mt-8 text-center px-4 max-w-sm">
        <p class="text-slate-200 text-base md:text-lg leading-relaxed font-light bg-slate-800/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50 shadow-lg">
          {{ slideData.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  slideData: {
    type: Object,
    required: true
  }
});

const currentPhotoIndex = ref(0);
let intervalId = null;

onMounted(() => {
  if (props.slideData.photos && props.slideData.photos.length > 1) {
    intervalId = setInterval(() => {
      currentPhotoIndex.value = (currentPhotoIndex.value + 1) % props.slideData.photos.length;
    }, 3000);
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
