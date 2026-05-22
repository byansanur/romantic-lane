<template>
  <div class="app-container" 
    @mousedown="onPointerDown" 
    @mouseup="onPointerUp"
    @mouseleave="onPointerUp"
    @touchstart="onPointerDown" 
    @touchend="onPointerUp"
  >
    <div v-if="!hasStarted" class="intro-screen" @click.stop="startStory">
       <!-- Dynamic Background -->
       <div 
         v-if="coverSlide?.photos && coverSlide.photos.length > 0" 
         class="absolute inset-0 bg-cover bg-center"
         :style="{ backgroundImage: `url('${coverSlide.photos[0]}')` }"
       ></div>
       <div v-if="coverSlide?.photos && coverSlide.photos.length > 0" class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

       <div class="intro-content animate-fade-up relative z-10">
         <h1 v-if="coverSlide?.title" class="cover-title">{{ coverSlide.title }}</h1>
         <h1 v-else>Ready to dive in?</h1>
         
         <h3 v-if="coverSlide?.subtitle" class="cover-subtitle">{{ coverSlide.subtitle }}</h3>
         <p v-if="coverSlide?.text" class="cover-text">{{ coverSlide.text }}</p>
         
         <button class="start-btn mt-8">Start Journey</button>
       </div>
    </div>

    <StoryProgressBar v-if="hasStarted && !isFinalShareSlide"
      :totalSlides="contentSlidesCount" 
      :currentIndex="currentIndex"
      :duration="15000"
      :isPaused="isPaused"
      @complete="nextSlide"
    />

    <!-- IG Style Music Watermark -->
    <MusicWatermark v-if="hasStarted && !isFinalShareSlide" :label="currentMusicLabel" />
    
    <div class="story-content" v-if="hasStarted">
      <Transition name="fade" mode="out-in">
        <div :key="currentIndex" class="w-full h-full">
          <SlidePolaroid 
            v-if="storySlides[currentIndex]?.type === 'polaroid_text'" 
            :slideData="storySlides[currentIndex]" 
          />
          
          <SlideShare 
            v-else-if="storySlides[currentIndex]?.type === 'slide-share'" 
            :slideData="storySlides[currentIndex]" 
            @restart="restartStory"
          />
          
          <!-- Fallback Legacy Slide -->
          <SlideBase 
            v-else-if="storySlides[currentIndex]" 
            :slideData="storySlides[currentIndex]" 
          />
        </div>
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
import StoryProgressBar from '../ui/StoryProgressBar.vue';
import SlideBase from '../slides/SlideBase.vue'; 
import SlidePolaroid from '../slides/SlidePolaroid.vue';
import SlideShare from '../slides/SlideShare.vue';
import MusicWatermark from '../ui/MusicWatermark.vue';

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

const coverSlide = computed(() => {
  return props.slides.find(s => s.type === 'cover');
});

const storySlides = computed(() => {
  return props.slides.filter(s => s.type !== 'cover');
});

const contentSlidesCount = computed(() => {
  return storySlides.value.filter(s => s.type !== 'slide-share').length;
});

const hasStarted = ref(false);
const audioRef = ref(null);

/**
 * Memulai pemutaran cerita untuk pertama kali dari layar intro.
 * Juga akan memicu audio slide pertama untuk diputar.
 */
const startStory = () => {
  if (storySlides.value.length === 0) return; // Prevent crash if no slides
  hasStarted.value = true;
  playAudioForCurrentSlide();
};

/**
 * Menyesuaikan pemutaran audio berdasarkan data konfigurasi pada slide yang aktif.
 * Menghentikan audio jika slide tidak memiliki referensi file audio.
 */
const playAudioForCurrentSlide = () => {
  if (!audioRef.value) return;
  const slide = storySlides.value[currentIndex.value];
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
  return storySlides.value[currentIndex.value]?.type === 'slide-share';
});

const currentMusicLabel = computed(() => {
  return storySlides.value[currentIndex.value]?.musicLabel || '';
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
  if (currentIndex.value < storySlides.value.length - 1) {
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

.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.cover-title {
  font-family: var(--font-heading, serif);
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary, #f43f5e);
  line-height: 1.2;
}

.cover-subtitle {
  font-size: 1.2rem;
  color: #fda4af; /* rose-300 */
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.cover-text {
  font-size: 1rem;
  color: #cbd5e1; /* slate-300 */
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 80%;
}

.intro-content h1:not(.cover-title) {
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
