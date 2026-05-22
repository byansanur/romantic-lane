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
      <Sidebar :user="userData" @logout="handleLogout" @create-story="isSidebarOpen = false" />
    </div>

    <main class="flex-1 flex flex-col min-w-0 md:ml-0">
      <TopHeader mode="dashboard" @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div class="max-w-4xl mx-auto text-white font-sans">
      <!-- Header & Progress -->
      <header class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-rose-500 mb-2">Create New Story</h1>
        <p class="text-slate-400">Step {{ currentStep }} of 3: {{ stepTitles[currentStep - 1] }}</p>
        
        <div class="flex items-center justify-center gap-4 mt-6">
          <div v-for="step in 3" :key="step" class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
              :class="currentStep >= step ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-800 text-slate-500'"
            >
              {{ step }}
            </div>
            <div v-if="step < 3" class="w-16 h-1 mx-2 rounded transition-colors" :class="currentStep > step ? 'bg-rose-500' : 'bg-slate-800'"></div>
          </div>
        </div>
      </header>

      <!-- Step 1: AI Generation -->
      <section v-if="currentStep === 1" class="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Story Title</label>
            <input v-model="storyData.title" type="text" placeholder="e.g. Our Bali Trip" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Theme</label>
            <select v-model="storyData.theme" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors">
              <option value="ethernal-memory">Ethernal Memory</option>
              <option value="romantic">Romantic</option>
              <option value="funny">Funny</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Background Music</label>
            <select v-model="storyData.audio_url" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors">
              <option value="">No Music</option>
              <option v-for="audio in availableAudio" :key="audio.value" :value="audio.value">
                {{ audio.label }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Memory / Prompt for AI</label>
            <textarea v-model="storyData.prompt" rows="4" placeholder="Tell the AI what happened... e.g. We went to the beach and saw a beautiful sunset." class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors resize-none"></textarea>
          </div>
          <button @click="generateAI" :disabled="isGenerating || !storyData.title" class="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <span v-if="isGenerating" class="animate-pulse">Generating Magic...</span>
            <span v-else>Generate Initial Story</span>
          </button>
        </div>
      </section>

      <!-- Step 2: Media & Edit -->
      <section v-if="currentStep === 2" class="space-y-6">
        <div v-for="(slide, index) in storyData.slides" :key="slide.id" class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative group">
          
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-rose-400 font-semibold flex items-center gap-3">
              Slide {{ index + 1 }} 
              <span class="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 font-medium">
                {{ index === 0 ? 'Cover Slide' : 'Story Slide' }}
              </span>
            </h3>
            
            <div class="flex items-center gap-4">
              <!-- Slide Type Selector -->
              <select v-if="index > 0" v-model="slide.type" class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors">
                <option value="polaroid_text">Polaroid</option>
                <option value="base">Standard Base</option>
              </select>
              <span v-else class="text-xs text-slate-500 font-mono">({{ slide.type }})</span>

              <!-- Remove Button -->
              <button v-if="index > 0" @click="removeSlide(index)" class="text-slate-500 hover:text-rose-500 transition-colors" title="Remove Slide">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input v-model="slide.title" type="text" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Subtitle</label>
                <input v-model="slide.subtitle" type="text" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Slide Text</label>
                <textarea v-model="slide.text" rows="3" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors resize-none"></textarea>
              </div>
            </div>
            <!-- Image Upload Section -->
            <div class="flex flex-col">
              <label class="block text-xs font-medium text-slate-400 mb-1">Photos</label>
              
              <!-- Photo Grid -->
              <div v-if="slide.photos && slide.photos.length > 0" :class="slide.type === 'cover' ? 'mb-4' : 'grid grid-cols-2 gap-2 mb-4'">
                <div v-for="(photoUrl, pIndex) in slide.photos" :key="pIndex" class="relative aspect-[4/5] rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                  <img :src="photoUrl" class="w-full h-full object-cover" />
                  <button @click="slide.photos.splice(pIndex, 1)" class="absolute top-1 right-1 bg-black/70 text-white p-1 rounded hover:bg-rose-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
              
              <!-- Upload Button -->
              <div v-if="!(slide.type === 'cover' && slide.photos && slide.photos.length >= 1)" class="flex-1 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 flex flex-col items-center justify-center min-h-[120px] p-4 text-center">
                <button @click="uploadPhoto(index)" class="text-sm font-medium text-slate-400 hover:text-rose-400 flex items-center gap-2 transition-colors px-4 py-2 bg-slate-800 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  Upload Foto
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-4">
          <button @click="currentStep = 1" class="px-6 py-2 rounded-lg text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors">Back</button>
          <button @click="addSlide" class="px-4 py-2 text-sm font-medium text-rose-400 border border-rose-500/50 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add New Slide
          </button>
          <button @click="currentStep = 3" :disabled="storyData.slides.length < 2" :class="storyData.slides.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-500 shadow-lg shadow-rose-500/20'" class="px-6 py-2 rounded-lg bg-rose-600 text-white font-medium transition-colors">Review & Publish</button>
        </div>
      </section>

      <!-- Step 3: Publish -->
      <section v-if="currentStep === 3" class="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Live Preview & Publish</h2>
        
        <!-- Mobile Mockup Container -->
        <div class="w-[320px] aspect-[9/16] rounded-[2.5rem] border-[12px] border-slate-950 overflow-hidden mx-auto shadow-2xl shadow-rose-900/20 relative mb-8 bg-black">
          <StoryViewer :slides="storyData.slides" />
        </div>

        <div class="flex justify-between items-center max-w-[320px] mx-auto">
          <button @click="currentStep = 2" class="px-5 py-3 rounded-xl text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors text-sm font-medium">Edit Again</button>
          <button @click="publishStory" :disabled="isPublishing" class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold transition-colors shadow-lg shadow-rose-500/30 flex items-center gap-2 text-sm">
            <span v-if="isPublishing" class="animate-pulse">Publishing...</span>
            <span v-else>Publish Story</span>
          </button>
        </div>
      </section>

        </div>
      </div>
    </main>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-rose-900/20 text-center animate-fade-up">
        <div class="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Story Published!</h3>
        <p class="text-slate-400 text-sm mb-6">Your romantic story is now live and ready to be shared.</p>
        
        <div class="bg-slate-950 border border-slate-800 rounded-lg p-3 mb-6 flex items-center justify-between gap-2 text-left">
          <div class="flex items-center gap-2 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span class="text-slate-300 text-sm font-mono truncate select-all">{{ publicStoryUrl }}</span>
          </div>
          <button @click="copyLink" class="text-rose-500 hover:text-rose-400 p-1 transition-colors flex-shrink-0" title="Copy Link">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        <button @click="finishAndGoDashboard" class="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-rose-500/20">
          Back to Dashboard
        </button>
      </div>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import Sidebar from '../components/layout/Sidebar.vue';
import TopHeader from '../components/layout/TopHeader.vue';
import StoryViewer from '../components/project/StoryViewer.vue';
import DialogModal from '../components/ui/DialogModal.vue';
import { generateStoryAI, uploadFile, createProject } from '../services/projectService';

const router = useRouter();
const auth = getAuth();

// Layout State
const isSidebarOpen = ref(false);
const userData = ref({ name: 'Loading...', avatar: '', isPremium: false });

const modalConfig = reactive({
  isOpen: false,
  type: 'info',
  title: '',
  message: '',
  primaryAction: {
    text: 'OK',
    handler: () => { modalConfig.isOpen = false; }
  }
});

const showModal = (title, message, type = 'error') => {
  modalConfig.title = title;
  modalConfig.message = message;
  modalConfig.type = type;
  modalConfig.primaryAction = { text: 'OK', handler: () => { modalConfig.isOpen = false; } };
  modalConfig.isOpen = true;
};

onMounted(() => {
  const currentUser = auth.currentUser;
  let isPremium = false;
  let avatarUrl = currentUser?.photoURL || '';

  try {
    const cachedUserStr = localStorage.getItem('user_cache');
    if (cachedUserStr) {
      const cachedUser = JSON.parse(cachedUserStr);
      isPremium = !!cachedUser.is_premium;
      if (cachedUser.avatar_url && cachedUser.avatar_url.trim() !== '') {
        avatarUrl = cachedUser.avatar_url;
      }
    }
  } catch (e) {
    console.error(e);
  }

  if (currentUser) {
    userData.value = {
      name: currentUser.displayName || currentUser.email.split('@')[0],
      avatar: avatarUrl,
      isPremium: isPremium
    };
  }
});

const handleLogout = async () => {
  await signOut(auth);
  router.push('/');
};

const currentStep = ref(1);
const stepTitles = ['Story Brainstorming', 'Edit & Add Media', 'Publish'];

const isGenerating = ref(false);
const isPublishing = ref(false);
const showSuccessModal = ref(false);
const publishedSlug = ref('');

const publicStoryUrl = computed(() => {
  if (!publishedSlug.value) return '';
  return `${window.location.origin}/to/${publishedSlug.value}`;
});

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(publicStoryUrl.value);
    showModal('Berhasil', 'Link cerita berhasil disalin ke clipboard!', 'success');
  } catch (err) {
    console.error('Failed to copy link:', err);
    showModal('Gagal', 'Gagal menyalin link. Silakan salin secara manual.', 'error');
  }
};

const finishAndGoDashboard = () => {
  showSuccessModal.value = false;
  router.push('/dashboard');
};

import audio1 from '../assets/audio/chachacha.mp3';
import audio2 from '../assets/audio/everything-u-are.mp3';
import audio3 from '../assets/audio/kita-buat-menyenangkan.mp3';
import audio4 from '../assets/audio/memori-baik.mp3';
import audio5 from '../assets/audio/nobody-else.mp3';
import audio6 from '../assets/audio/swim.mp3';

const availableAudio = [
  { label: 'chachacha', value: audio1 },
  { label: 'everything-u-are', value: audio2 },
  { label: 'kita-buat-menyenangkan', value: audio3 },
  { label: 'memori-baik', value: audio4 },
  { label: 'nobody-else', value: audio5 },
  { label: 'swim', value: audio6 }
];

const storyData = reactive({
  title: '',
  theme: 'ethernal-memory',
  audio_url: '',
  prompt: '',
  slides: []
});

// Helper for AI Limit
const checkAILimit = () => {
  const today = new Date().toISOString().split('T')[0];
  const usageDate = localStorage.getItem('ai_usage_date');
  let usageCount = parseInt(localStorage.getItem('ai_usage_count') || '0', 10);
  
  if (usageDate !== today) {
    usageCount = 0;
    localStorage.setItem('ai_usage_date', today);
  }
  return usageCount;
};

const incrementAILimit = () => {
  const usageCount = checkAILimit();
  localStorage.setItem('ai_usage_count', (usageCount + 1).toString());
  localStorage.setItem('last_ai_request_time', Date.now().toString());
};

const checkCooldown = () => {
  const lastRequestTime = parseInt(localStorage.getItem('last_ai_request_time') || '0', 10);
  const now = Date.now();
  const diff = now - lastRequestTime;
  
  if (diff < 60000) {
    const remainingSeconds = Math.ceil((60000 - diff) / 1000);
    return remainingSeconds;
  }
  return 0;
};

// [FASE 2: INJEKSI AI SLIDE (Tipe: Cover)]
const generateAI = async () => {
  if (checkAILimit() >= 3) {
    showModal('Batas Maksimal Harian', 'Anda hanya dapat menggunakan fitur AI sebanyak 3 kali per hari. Silakan coba lagi besok!', 'warning');
    return;
  }

  const cooldown = checkCooldown();
  if (cooldown > 0) {
    showModal('Terlalu Cepat', `Harap tunggu ${cooldown} detik lagi sebelum menghasilkan cerita baru (batas 1 request per menit).`, 'warning');
    return;
  }

  isGenerating.value = true;
  try {
    const response = await generateStoryAI(storyData.prompt);
    
    // Inject to slides dengan struktur TDD homogen
    storyData.slides = [
      { 
        slide_id: crypto.randomUUID(), 
        type: 'cover', 
        title: storyData.title,
        subtitle: '',
        text: response.data.generated_text, 
        photos: [],
        caption: ''
      }
    ];
    
    incrementAILimit();
    isGenerating.value = false;
    currentStep.value = 2;
  } catch (error) {
    console.error("Generate AI Error:", error);
    if (error.response?.status === 400 && error.response.data?.message === "INVALID_PROMPT") {
      showModal('Prompt Tidak Valid', 'Maaf, kalimat yang Anda masukkan tidak pantas atau tidak relevan. Silakan perbaiki prompt Anda.', 'error');
    } else {
      showModal('Gagal Menghubungi AI', 'Gagal menghubungi AI. Pastikan server berjalan dan coba lagi.', 'error');
    }
    isGenerating.value = false;
  }
};

// [FASE 2: INJEKSI MANUAL SLIDE (Tipe: Polaroid Text)]
const addSlide = () => {
  storyData.slides.push({
    slide_id: crypto.randomUUID(), 
    type: 'polaroid_text', 
    title: '',
    subtitle: '',
    text: '', 
    photos: [],
    caption: ''
  });
};

const removeSlide = (index) => {
  storyData.slides.splice(index, 1);
};

// Client-side image upload & WebP conversion
const uploadPhoto = (index) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Max dimension 1080px to save memory and upload size
        let width = img.width;
        let height = img.height;
        const max_size = 1080;
        
        if (width > max_size || height > max_size) {
          if (width > height) {
            height *= max_size / width;
            width = max_size;
          } else {
            width *= max_size / height;
            height = max_size;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP format with 80% quality
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          try {
            const response = await uploadFile(blob);
            const fileUrl = response.data.image_url;
            if (!fileUrl) throw new Error("No URL returned from server");
            
            if (!storyData.slides[index].photos) {
              storyData.slides[index].photos = [];
            }
            storyData.slides[index].photos.push(fileUrl);
          } catch (error) {
            console.error("Upload Error:", error);
            showModal('Upload Gagal', 'Gagal mengunggah foto. Periksa koneksi Anda dan coba lagi.', 'error');
          }
        }, 'image/webp', 0.8);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  input.click();
};

// POST /api/v1/projects
const publishStory = async () => {
  isPublishing.value = true;
  
  try {
    const finalPayload = {
      title: storyData.title,
      theme: storyData.theme,
      audio_url: storyData.audio_url,
      slides: storyData.slides.map(s => ({
        slide_id: s.slide_id,
        type: s.type,
        title: s.title,
        subtitle: s.subtitle,
        text: s.text,
        photos: s.photos,
        caption: s.caption || ''
      }))
    };
    
    console.log("=== SENDING POST /api/v1/projects ===");
    console.log(JSON.stringify(finalPayload, null, 2));
    
    const response = await createProject(finalPayload);
    
    isPublishing.value = false;
    publishedSlug.value = response.data.slug;
    showSuccessModal.value = true;
  } catch (error) {
    console.error("Publish Error:", error);
    showModal('Publish Gagal', 'Gagal mem-publish cerita. Silakan coba lagi.', 'error');
    isPublishing.value = false;
  }
};
</script>
