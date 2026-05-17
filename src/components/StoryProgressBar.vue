<template>
  <div class="progress-bar-container">
    <div 
      v-for="(slide, index) in totalSlides" 
      :key="index" 
      class="progress-bar-segment"
    >
      <div 
        class="progress-bar-fill" 
        :class="{
          'completed': index < currentIndex,
          'active': index === currentIndex
        }"
        :style="index === currentIndex ? { animationDuration: duration + 'ms', animationPlayState: isPaused ? 'paused' : 'running' } : {}"
        @animationend="onAnimationEnd(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  totalSlides: {
    type: Number,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 15000 // 15 seconds
  },
  isPaused: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['complete']);

const onAnimationEnd = (index) => {
  if (index === props.currentIndex) {
    emit('complete');
  }
};
</script>

<style scoped>
.progress-bar-container {
  position: absolute;
  top: 15px;
  left: 10px;
  right: 10px;
  display: flex;
  gap: 4px;
  z-index: 100;
}

.progress-bar-segment {
  flex: 1;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  width: 0%;
  border-radius: 2px;
}

.progress-bar-fill.completed {
  width: 100%;
}

.progress-bar-fill.active {
  animation-name: fillProgress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes fillProgress {
  0% { width: 0%; }
  100% { width: 100%; }
}
</style>
