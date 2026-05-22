<template>
  <div class="w-full h-full flex flex-col justify-center items-center p-8 bg-slate-900 text-center relative overflow-hidden">
    <!-- Theme specific decoration -->
    <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-80"></div>
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

    <div class="z-10 flex flex-col items-center gap-4 animate-fade-up">
      <h1 v-if="slideData.title" class="text-4xl md:text-5xl font-bold text-rose-500 font-serif leading-tight drop-shadow-md">
        {{ slideData.title }}
      </h1>
      <h3 v-if="slideData.subtitle" class="text-xl md:text-2xl text-rose-300 font-medium tracking-wide">
        {{ slideData.subtitle }}
      </h3>
      <div v-if="slideData.text" class="mt-6 p-6 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl">
        <p class="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
          {{ slideData.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  slideData: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
