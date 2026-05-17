<template>
  <div class="app-container" 
    @mousedown="onPointerDown" 
    @mouseup="onPointerUp"
    @mouseleave="onPointerUp"
    @touchstart="onPointerDown" 
    @touchend="onPointerUp"
  >
    <div v-if="!hasStarted" class="intro-screen" @click.stop="startStory">
       <div class="intro-content">
         <h1>Ready to dive in?</h1>
         <button class="start-btn">Start Journey</button>
       </div>
    </div>

    <StoryProgressBar v-if="hasStarted && !isFinalShareSlide"
      :totalSlides="contentSlidesCount" 
      :currentIndex="currentIndex"
      :duration="15000"
      :isPaused="isPaused"
      @complete="nextSlide"
    />
    
    <div class="story-content">
      <Transition name="fade" mode="out-in">
        <component 
          :is="currentSlideComponent" 
          :key="currentIndex" 
          :slideData="slides[currentIndex]" 
          @restart="restartStory"
        />
      </Transition>
    </div>
    
    <!-- Click overlays -->
    <div class="overlay-left" @click.stop="prevSlide" v-if="hasStarted"></div>
    <div class="overlay-right" @click.stop="nextSlide" v-if="hasStarted && !isFinalShareSlide"></div>

    <audio ref="audioRef" style="display: none;"></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import StoryProgressBar from './StoryProgressBar.vue';
import SlideBase from './slides/SlideBase.vue'; 
import SlideShare from './slides/SlideShare.vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const isPaused = ref(false);
const pressTimer = ref(null);
const isLongPress = ref(false);

const contentSlidesCount = computed(() => {
  return props.slides.filter(s => s.type !== 'slide-share').length;
});

const hasStarted = ref(false);
const audioRef = ref(null);

/**
 * Memulai pemutaran cerita untuk pertama kali dari layar intro.
 * Juga akan memicu audio slide pertama untuk diputar.
 */
const startStory = () => {
  hasStarted.value = true;
  playAudioForCurrentSlide();
};

/**
 * Menyesuaikan pemutaran audio berdasarkan data konfigurasi pada slide yang aktif.
 * Menghentikan audio jika slide tidak memiliki referensi file audio.
 */
const playAudioForCurrentSlide = () => {
  if (!audioRef.value) return;
  const slide = props.slides[currentIndex.value];
  if (slide && slide.audioSrc) {
    audioRef.value.src = slide.audioSrc;
    audioRef.value.play().catch(e => console.log('Audio play blocked:', e));
  } else {
    audioRef.value.pause();
  }
};

watch(currentIndex, () => {
  if (hasStarted.value) {
    playAudioForCurrentSlide();
  }
});

watch(isPaused, (newVal) => {
  if (!audioRef.value || !hasStarted.value) return;
  if (newVal) {
    audioRef.value.pause();
  } else {
    audioRef.value.play().catch(e => console.log('Audio play blocked:', e));
  }
});

const isFinalShareSlide = computed(() => {
  return props.slides[currentIndex.value]?.type === 'slide-share';
});

const currentSlideComponent = computed(() => {
  if (isFinalShareSlide.value) {
    return SlideShare;
  }
  return SlideBase; 
});

/**
 * Memulai ulang keseluruhan cerita ke indeks slide 0.
 */
const restartStory = () => {
  currentIndex.value = 0;
};

/**
 * Memajukan halaman ke slide berikutnya (bila bukan di halaman akhir).
 * Diabaikan jika trigger berasal dari sentuhan panjang (long-press).
 */
const nextSlide = () => {
  if (isLongPress.value) return; 
  if (isFinalShareSlide.value) return;
  if (currentIndex.value < props.slides.length - 1) {
    currentIndex.value++;
  }
};

/**
 * Mengembalikan halaman ke slide sebelumnya.
 * Diabaikan jika trigger berasal dari sentuhan panjang (long-press).
 */
const prevSlide = () => {
  if (isLongPress.value) return;
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

/**
 * Menangani event ketika layar ditekan (touch/mouse down).
 * Akan memicu jeda (pause) pada timer jika ditekan lebih dari 200ms.
 */
const onPointerDown = () => {
  isLongPress.value = false;
  pressTimer.value = setTimeout(() => {
    isPaused.value = true;
    isLongPress.value = true;
  }, 200); 
};

/**
 * Menangani event ketika tekanan di layar dilepas (touch/mouse up).
 * Akan melanjutkan cerita (unpause) dan mereset detektor long-press.
 */
const onPointerUp = () => {
  clearTimeout(pressTimer.value);
  isPaused.value = false;
  
  setTimeout(() => {
    isLongPress.value = false;
  }, 50);
};

</script>

<style scoped>
.story-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.overlay-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  z-index: 50;
  cursor: pointer;
}

.overlay-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  z-index: 50;
  cursor: pointer;
}

.intro-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-dark);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  cursor: pointer;
}

.intro-content h1 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.start-btn {
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(226, 149, 149, 0.4);
  font-family: var(--font-body);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.start-btn:hover {
  background-color: var(--color-secondary);
  transform: translateY(-2px);
}
</style>
