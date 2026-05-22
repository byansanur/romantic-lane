<template>
  <div class="h-screen w-full bg-slate-950 flex items-center justify-center text-white">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center">
      <div class="w-12 h-12 border-4 border-slate-700 border-t-rose-500 rounded-full animate-spin mb-4"></div>
      <p class="text-slate-400">Loading romantic memories...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl max-w-md">
      <div class="w-16 h-16 bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold mb-2 text-white">Story Not Found</h2>
      <p class="text-slate-400 text-sm mb-6">{{ errorMessage }}</p>
      <button @click="router.push('/')" class="bg-rose-600 hover:bg-rose-500 text-white font-medium py-2 px-6 rounded-full transition-colors">
        Go to Homepage
      </button>
    </div>

    <!-- Viewer Component -->
    <StoryViewer v-else :slides="projectData.slides" class="w-full h-full max-w-md mx-auto relative" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProjectBySlug } from '../services/projectService';
import StoryViewer from '../components/project/StoryViewer.vue';

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const errorMessage = ref('');
const projectData = ref(null);

onMounted(async () => {
  const slug = route.params.slug;
  if (!slug) {
    errorMessage.value = "Invalid story link.";
    isLoading.value = false;
    return;
  }

  try {
    const data = await getProjectBySlug(slug);
    if (data && data.slides && data.slides.length > 0) {
      projectData.value = data;
    } else {
      throw new Error("Cerita ini kosong atau tidak memiliki slide.");
    }
  } catch (error) {
    console.error("Failed to load story:", error);
    errorMessage.value = error.response?.status === 404 
      ? "Cerita yang Anda cari tidak ditemukan. Mungkin sudah dihapus atau link salah."
      : "Terjadi kesalahan saat memuat cerita.";
  } finally {
    isLoading.value = false;
  }
});
</script>
