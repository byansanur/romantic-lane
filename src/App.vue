<template>
  <StoryViewer :slides="storySlides" />
</template>

<script setup>
import StoryViewer from './components/StoryViewer.vue';
import { storySlides } from './config/storyData';
</script>

<style>
/* Any global resets not covered in style.css */
</style>
