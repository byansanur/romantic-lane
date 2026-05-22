<template>
  <div class="flex h-screen w-full bg-slate-900 overflow-hidden relative">
    
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar Wrapper -->
    <div 
      class="fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar :user="userData" @logout="handleLogout" @create-story="openCreateModal" />
    </div>

    <main class="flex-1 flex flex-col min-w-0 md:ml-0">
      <TopHeader mode="dashboard" @create-story="openCreateModal" @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
        
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-rose-500/10 border border-rose-500 text-rose-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
          {{ errorMessage }}
        </div>

        <!-- Skeleton Loading -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="h-64 rounded-xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
        </div>

        <!-- Project Grid -->
        <ProjectGrid v-else :projects="projectList" @create-story="openCreateModal" @open-story="goToEditor" />
        
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

// Component Imports
import Sidebar from '../components/layout/Sidebar.vue';
import TopHeader from '../components/layout/TopHeader.vue';
import ProjectGrid from '../components/project/ProjectGrid.vue';
import { getMyProjects } from '../services/projectService';

const router = useRouter();
const auth = getAuth();

// State
const isSidebarOpen = ref(false);
const isLoading = ref(true);
const errorMessage = ref('');

const userData = ref({
  name: 'Loading...',
  avatar: '',
  isPremium: false,
  aiGenerateCount: 0
});

const projectList = ref([]);

// Lifecycle
onMounted(() => {
  const currentUser = auth.currentUser;
  
  let isPremium = false;
  let avatarUrl = currentUser?.photoURL || '';
  let aiGenerateCount = 0;

  try {
    const cachedUserStr = localStorage.getItem('user_cache');
    if (cachedUserStr) {
      const cachedUser = JSON.parse(cachedUserStr);
      isPremium = !!cachedUser.is_premium;
      aiGenerateCount = cachedUser.ai_generate_count || 0;
      
      // Jika avatar_url dari backend tidak kosong, gunakan itu. 
      // Jika kosong, akan fallback ke currentUser?.photoURL dari Firebase
      if (cachedUser.avatar_url && cachedUser.avatar_url.trim() !== '') {
        avatarUrl = cachedUser.avatar_url;
      }
    }
  } catch (error) {
    console.error('Failed to parse user cache:', error);
  }

  if (currentUser) {
    userData.value = {
      name: currentUser.displayName || currentUser.email.split('@')[0],
      avatar: avatarUrl,
      isPremium: isPremium,
      aiGenerateCount: aiGenerateCount
    };
    
    // Fetch dynamic data from Golang Backend
    fetchProjects();
  }
});

// Actions
const fetchProjects = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const rawData = await getMyProjects();
    
    // Mapping format tanggal & ekstrak thumbnail dari slide
    projectList.value = rawData.map(proj => {
      // Cari foto dari seluruh slide, maksimal 3
      const allPhotos = proj.slides?.flatMap(s => s.photos || []) || [];
      const thumbnails = allPhotos.slice(0, 3);
      
      return {
        ...proj,
        id: proj.id,
        slug: proj.slug,
        title: proj.title,
        isActive: proj.is_active,
        thumbnails: thumbnails,
        createdAt: new Intl.DateTimeFormat('id-ID', {
          year: 'numeric', month: 'short', day: 'numeric'
        }).format(new Date(proj.created_at))
      };
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    errorMessage.value = 'Gagal memuat daftar cerita. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = async () => {
  await signOut(auth);
  router.push('/');
};

const openCreateModal = () => {
  router.push('/create');
};

const goToEditor = (slug) => {
  router.push(`/to/${slug}`);
};
</script>
