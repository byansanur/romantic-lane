<template>
  <div class="collage-container" :class="`count-${images.length}`">
    <div 
      v-for="(img, index) in images" 
      :key="index"
      class="photo-container collage-item"
      :class="`item-${index + 1}`"
    >
      <img :src="img" alt="Memory" class="slide-photo" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true
  }
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

/* 3 Images Grid Layout (Instagram Style) */
.count-3 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 350px;
  height: 380px;
  padding: 0;
}

.count-3 .collage-item {
  position: relative;
  width: 100%;
  height: 100%;
  transform: none !important;
  border-radius: 8px;
  border: none;
  box-shadow: none;
}

.count-3 .item-1 {
  grid-column: 1 / -1;
  grid-row: 1;
}
.count-3 .item-2 {
  grid-column: 1;
  grid-row: 2;
}
.count-3 .item-3 {
  grid-column: 2;
  grid-row: 2;
}

/* 4 Images Grid Layout */
.count-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 350px;
  height: 350px;
  padding: 0;
}

.count-4 .collage-item {
  position: relative;
  width: 100%;
  height: 100%;
  transform: none !important;
  border-radius: 8px;
  border: none;
  box-shadow: none;
}

/* 6 Images Grid Layout */
.count-6 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 350px;
  height: 400px;
  padding: 0;
}

.count-6 .collage-item {
  position: relative;
  width: 100%;
  height: 100%;
  transform: none !important;
  border-radius: 8px;
  border: none;
  box-shadow: none;
}

.slide-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
