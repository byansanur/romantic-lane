<template>
  <div class="slide-share-container" :style="slideStyle" @click.stop>
    
    <!-- Background decorations -->
    <div class="star star-1">✨</div>
    <div class="star star-2">✨</div>
    <div class="star star-3">✨</div>
    <div class="star star-4">✨</div>

    <div class="header" v-if="!isGenerating">
      <div class="title-badge">Thanks for walking with us!</div>
    </div>

    <!-- Color Pickers (Left Side) -->
    <div class="color-pickers" v-if="!isGenerating">
      <div 
        v-for="(color, index) in availableColors" 
        :key="index"
        class="color-swatch"
        :style="{ background: color }"
        :class="{ active: selectedColorIndex === index }"
        @click="selectedColorIndex = index"
      ></div>
    </div>

    <div class="carousel-container" ref="carouselRef" @scroll="handleScroll">
      <div class="cards-wrapper">
        <!-- Card 1 -->
        <div class="share-card" ref="card1Ref">
          <div class="card-bg" :style="{ background: availableColors[selectedColorIndex] }"></div>
          <div class="card-content">
            <div class="polaroid-container quad">
              <div class="polaroid">
                <div class="photo-placeholder">
                  <img :src="imgFirstMeet" alt="Memory" class="cover-img landscape" />
                </div>
              </div>
              <div class="polaroid">
                <div class="photo-placeholder">
                  <img :src="imgBeach" alt="Memory" class="cover-img portrait" />
                </div>
              </div>
              <div class="polaroid">
                <div class="photo-placeholder">
                  <img :src="imgDufan" alt="Memory" class="cover-img portrait" />
                </div>
              </div>
              <div class="polaroid">
                <div class="photo-placeholder">
                  <img :src="imgFirstDate" alt="Memory" class="cover-img landscape" />
                </div>
              </div>
            </div>
            
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">First Met On</span>
                <span class="stat-value">23/03/25</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Days Together</span>
                <span class="stat-value" style="font-size: 1rem; line-height: 1.1;">
                  420 Days<br>
                  <span style="font-size: 0.7rem; font-family: var(--font-body); font-weight: normal; opacity: 0.9;">and still counting...</span>
                </span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Most Visited</span>
                <span class="stat-value">Anywhere with You</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Fav Song</span>
                <span class="stat-value">Everything You Are</span>
              </div>
            </div>
            
            <div class="watermark-container">
              <span class="watermark">ROMANTICLANE.COM/26</span>
              <span class="logo-circle">RL</span>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="share-card" ref="card2Ref">
          <div class="card-bg" :style="{ background: availableColors[selectedColorIndex] }"></div>
          <div class="card-content">
            <div class="polaroid-container single">
              <div class="polaroid large">
                <div class="photo-placeholder">
                  <img :src="imgBeach" alt="Memory" class="cover-img portrait" />
                </div>
              </div>
            </div>
            
            <div class="stats-grid single-stat">
              <div class="stat-item">
                <span class="stat-label">The Best Adventure</span>
                <span class="stat-value highlight">Everywhere with you</span>
              </div>
            </div>
            
            <div class="watermark-container">
              <span class="watermark">ROMANTICLANE.COM/26</span>
              <span class="logo-circle">RL</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-controls" v-if="!isGenerating">
      <div class="indicator">0{{ selectedCard }} / 02</div>
      
      <button class="share-button" @click.stop="shareSelectedCard">
        {{ isGenerating ? 'Menyiapkan...' : 'Share' }}
      </button>

      <button class="restart-button" @click.stop="$emit('restart')">
        Restart ↻
      </button>
    </div>

    <!-- Global Dialog Modal -->
    <DialogModal 
      :isOpen="modalConfig.isOpen"
      :type="modalConfig.type"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :primaryAction="modalConfig.primaryAction"
      @close="modalConfig.isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import html2canvas from 'html2canvas';
import DialogModal from '../ui/DialogModal.vue';

import imgFirstMeet from '../../assets/image/first-meet.webp';
import imgFirstDate from '../../assets/image/first-date1.webp';
import imgDufan from '../../assets/image/dufan-trip1.webp';
import imgBeach from '../../assets/image/beach-trip1.webp';
import imgConcert from '../../assets/image/concert1.webp';

const props = defineProps({
  slideData: {
    type: Object,
    default: () => ({ background: '#121212' })
  }
});

const emit = defineEmits(['restart']);

const slideStyle = computed(() => {
  return {
    background: '#1a1a1a' // Dark spotify-like texture bg
  };
});

const availableColors = [
  'linear-gradient(135deg, #E29595, #B19CD9)', // Primary to Secondary
  'linear-gradient(135deg, #F3E5AB, #E29595)', // Tertiary to Primary
  'linear-gradient(135deg, #5A3A3A, #2D2424)', // Darker
  '#E29595', // Solid Primary
  '#B19CD9'  // Solid Secondary
];
const selectedColorIndex = ref(0);

const selectedCard = ref(1);
const isGenerating = ref(false);

const carouselRef = ref(null);
const card1Ref = ref(null);
const card2Ref = ref(null);

const modalConfig = reactive({
  isOpen: false,
  type: 'error',
  title: 'Error',
  message: '',
  primaryAction: {
    text: 'OK',
    handler: () => { modalConfig.isOpen = false; }
  }
});

/**
 * Menangani event scroll pada carousel kartu share.
 * Berguna untuk mendeteksi kartu mana yang sedang aktif dilihat oleh pengguna.
 */
const handleScroll = () => {
  if (!carouselRef.value) return;
  const scrollLeft = carouselRef.value.scrollLeft;
  const width = carouselRef.value.clientWidth;
  
  if (scrollLeft > width / 2) {
    selectedCard.value = 2;
  } else {
    selectedCard.value = 1;
  }
};

/**
 * Fungsi utama untuk mengambil tangkapan layar (screenshot) dari kartu yang aktif
 * menggunakan library html2canvas, dan membuka dialog 'Web Share API' bawaan HP
 * untuk membagikannya ke media sosial seperti Instagram Story.
 */
const shareSelectedCard = async () => {
  if (isGenerating.value) return;
  isGenerating.value = true;
  
  try {
    const targetElement = selectedCard.value === 1 ? card1Ref.value : card2Ref.value;
    
    const canvas = await html2canvas(targetElement, {
      scale: 3, // Increase scale for higher quality
      backgroundColor: null,
      useCORS: true,
      allowTaint: true
    });
    
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'romantic-lane-story.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file]
          });
        } catch (error) {
          console.log('Error sharing:', error);
          if (error.name !== 'AbortError') {
             downloadFallback(canvas);
          }
        }
      } else {
        downloadFallback(canvas);
      }
      
      isGenerating.value = false;
    });
  } catch (err) {
    console.error('Failed to generate image', err);
    isGenerating.value = false;
    modalConfig.title = 'Gagal';
    modalConfig.message = 'Gagal membuat gambar. Silakan coba lagi.';
    modalConfig.type = 'error';
    modalConfig.isOpen = true;
  }
};

/**
 * Fungsi fallback (cadangan) apabila perangkat/browser tidak mendukung Web Share API.
 * Akan otomatis mengunduh gambar hasil tangkapan layar ke memori perangkat.
 * @param {HTMLCanvasElement} canvas - Elemen canvas hasil render html2canvas
 */
const downloadFallback = (canvas) => {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `romantic-lane-wrapped-${selectedCard.value}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<style scoped>
.slide-share-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  z-index: 100;
  font-family: var(--font-body);
  background-image: radial-gradient(circle at 50% 0%, #333 0%, #111 100%) !important;
}

/* Stars decoration */
.star {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: twinkle 3s infinite alternate;
}
.star-1 { top: 10%; left: 10%; }
.star-2 { top: 15%; right: 15%; font-size: 1rem; }
.star-3 { bottom: 20%; left: 15%; font-size: 2rem; animation-delay: 1s; }
.star-4 { bottom: 10%; right: 10%; animation-delay: 0.5s; }

@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 0.8; transform: scale(1.2); }
}

.header {
  margin-top: 3rem;
  z-index: 10;
  flex-shrink: 0;
}

.title-badge {
  background: white;
  color: black;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.color-pickers {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 20;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.color-swatch.active {
  border-color: white;
  transform: scale(1.2);
}

.carousel-container {
  width: 100%;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel-container::-webkit-scrollbar {
  display: none;
}

.cards-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem; /* Give padding to avoid shadow clipping */
  width: max-content; /* Critical for horizontal scrolling */
}

.share-card {
  position: relative;
  width: 300px; /* Fixed width */
  aspect-ratio: 9 / 16; /* Force exact portrait format for Instagram Story */
  background: #222;
  scroll-snap-align: center;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: background 0.3s ease;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  color: white;
}

.polaroid-container {
  display: flex;
  justify-content: center;
  gap: -10px;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.polaroid-container.single {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.polaroid {
  background: white;
  padding: 10px 10px 30px 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transform: rotate(-5deg);
}

.polaroid-container.quad {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 250px;
  height: 250px;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.polaroid-container.quad .polaroid {
  position: relative;
  transform: none;
  padding: 6px; /* Uniform padding like a simple frame */
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.polaroid-container.quad .photo-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

/* Manual object-fit: cover polyfill for html2canvas iOS */
.cover-img.landscape {
  height: 100%;
  width: auto;
  max-width: none;
}

.cover-img.portrait {
  width: 100%;
  height: auto;
  max-height: none;
}

.photo-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.polaroid.large {
  width: 220px;
  height: 220px;
  padding: 15px 15px 45px 15px;
  transform: rotate(2deg);
}

.polaroid.large .photo-placeholder {
  width: 100%;
  height: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 1rem;
  margin-top: auto;
  margin-bottom: 3.5rem; /* Increased margin to prevent overlap with watermark */
}

.stats-grid.single-stat {
  grid-template-columns: 1fr;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
  margin-bottom: 0.3rem;
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-tertiary);
}

.stat-value.highlight {
  font-size: 2rem;
  color: white;
}

.watermark-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.watermark {
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.logo-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-tertiary);
  color: #000;
  font-size: 0.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  z-index: 10;
}

.indicator {
  color: white;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.share-button {
  background-color: #FF5A5A; /* Similar to the red share button in screenshot */
  color: white;
  border: none;
  border-radius: 30px;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 90, 90, 0.4);
}

.restart-button {
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.restart-button:hover {
  opacity: 1;
}
</style>
