<template>
  <div class="ig-music-watermark" v-if="label">
    <svg class="music-icon" viewBox="0 0 24 24" fill="white">
      <rect x="4" y="9" width="3" height="6" class="bar bar1"/>
      <rect x="10" y="5" width="3" height="14" class="bar bar2"/>
      <rect x="16" y="9" width="3" height="6" class="bar bar3"/>
    </svg>
    <div class="marquee-container">
      <div class="marquee-text">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.ig-music-watermark {
  position: absolute;
  top: 2rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  pointer-events: none; /* So clicks pass through to overlay */
  max-width: 65%;
  overflow: hidden;
}

.music-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
}

.bar {
  transform-origin: center;
}
.bar1 { animation: eq 0.6s ease-in-out infinite alternate; }
.bar2 { animation: eq 0.8s ease-in-out infinite alternate-reverse; }
.bar3 { animation: eq 0.7s ease-in-out infinite alternate; }

@keyframes eq {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  width: 100%;
}

.marquee-text {
  display: inline-block;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  animation: scroll-left 7s linear infinite;
  padding-left: 100%;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
