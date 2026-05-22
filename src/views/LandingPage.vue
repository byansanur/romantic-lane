<template>
  <div class="min-h-screen bg-slate-950 text-white overflow-x-hidden">
    
    <!-- Header -->
    <TopHeader mode="landing" @login="login" @create-story="login" />

    <!-- Hero Section -->
    <section id="hero" class="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      <!-- Background glow effects -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <!-- Left: Copy -->
        <div class="text-center lg:text-left">
          <p class="text-rose-400 font-semibold text-sm tracking-widest uppercase mb-4 animate-fade-down">✨ Platform Cerita Interaktif #1</p>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Abadikan Momen Manismu dalam
            <span class="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text"> Cerita Digital</span>
            yang Tak Terlupakan
          </h1>
          <p class="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Tulis prompt sederhana, biarkan AI merangkai kata-kata puitis, unggah foto kenangan, dan bagikan cerita interaktif bergaya Instagram Story kepada orang tersayang.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button @click="login" class="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 text-lg">
              Mulai Buat Cerita
            </button>
            <button @click="scrollToDemo" class="px-8 py-4 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-white font-medium rounded-full transition-all hover:bg-slate-900 text-lg">
              Lihat Demo →
            </button>
          </div>
        </div>

        <!-- Right: Visual Polaroid Mockup -->
        <div class="relative flex items-center justify-center h-80 lg:h-[420px] cursor-pointer" @click="cardFlipped = !cardFlipped">
          <!-- Card 1 -->
          <div 
            class="absolute w-52 h-64 bg-white rounded-lg shadow-2xl p-3 transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-1"
            :class="cardFlipped 
              ? 'rotate-[6deg] translate-x-8 translate-y-4 z-20 shadow-black/50' 
              : 'rotate-[-8deg] z-10 shadow-black/40'"
          >
            <div class="w-full h-44 rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop&q=60" alt="First date" class="w-full h-full object-cover" />
            </div>
            <p class="text-center text-slate-500 text-xs mt-2 font-medium italic">Our first date 💕</p>
          </div>
          <!-- Card 2 -->
          <div 
            class="absolute w-52 h-64 bg-white rounded-lg shadow-2xl p-3 transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-1"
            :class="cardFlipped 
              ? 'rotate-[-8deg] z-10 shadow-black/40' 
              : 'rotate-[6deg] translate-x-8 translate-y-4 z-20 shadow-black/50'"
          >
            <div class="w-full h-44 rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=300&fit=crop&q=60" alt="Sunset memories" class="w-full h-full object-cover" />
            </div>
            <p class="text-center text-slate-500 text-xs mt-2 font-medium italic">Sunset memories 🌅</p>
          </div>
          <!-- Floating badge -->
          <div class="absolute -top-2 right-4 lg:right-8 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce z-30">
            AI Powered ✨
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-slate-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-rose-400 font-semibold text-sm tracking-widest uppercase mb-3">Fitur Unggulan</p>
          <h2 class="text-3xl sm:text-4xl font-bold">Why <span class="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text">Romantic Lane</span>?</h2>
          <p class="text-slate-400 mt-4 max-w-2xl mx-auto">Semua yang kamu butuhkan untuk menciptakan momen digital yang berkesan, dalam satu platform.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-rose-500/30 hover:bg-slate-800 transition-all duration-300">
            <div class="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
              <svg class="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">AI Copywriter</h3>
            <p class="text-slate-400 leading-relaxed">Cukup ceritakan momenmu dalam satu kalimat. AI kami akan mengubahnya menjadi narasi puitis yang menyentuh hati.</p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-rose-500/30 hover:bg-slate-800 transition-all duration-300">
            <div class="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <svg class="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Galeri Kenangan</h3>
            <p class="text-slate-400 leading-relaxed">Upload foto-foto berhargamu. Sistem kami akan mengkompresinya ke format WebP dan menyusunnya menjadi kolase polaroid cantik.</p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-rose-500/30 hover:bg-slate-800 transition-all duration-300">
            <div class="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
              <svg class="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Soundtrack Cinta</h3>
            <p class="text-slate-400 leading-relaxed">Pilih musik latar yang sesuai suasana hatimu. Ceritamu akan mengalun bersama lagu pengiring yang menyentuh.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 px-4 bg-slate-950">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-rose-400 font-semibold text-sm tracking-widest uppercase mb-3">Langkah Mudah</p>
          <h2 class="text-3xl sm:text-4xl font-bold">Tiga Langkah Menuju <span class="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text">Momen Abadi</span></h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="relative text-center p-8">
            <div class="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-rose-500/30">1</div>
            <h3 class="text-xl font-bold text-white mb-3">Ceritakan Sedikit</h3>
            <p class="text-slate-400 leading-relaxed">Tulis satu prompt sederhana tentang momenmu. AI akan memparafrasanya menjadi narasi romantis yang indah.</p>
            <!-- Connector line (hidden on mobile) -->
            <div class="hidden md:block absolute top-12 right-0 w-1/2 h-px bg-gradient-to-r from-transparent to-slate-700"></div>
          </div>

          <!-- Step 2 -->
          <div class="relative text-center p-8">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-purple-500/30">2</div>
            <h3 class="text-xl font-bold text-white mb-3">Kustomisasi & Foto</h3>
            <p class="text-slate-400 leading-relaxed">Tambahkan slide, unggah foto kenangan, pilih musik favorit, dan sesuaikan setiap detail ceritamu.</p>
            <div class="hidden md:block absolute top-12 left-0 w-1/2 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            <div class="hidden md:block absolute top-12 right-0 w-1/2 h-px bg-gradient-to-r from-transparent to-slate-700"></div>
          </div>

          <!-- Step 3 -->
          <div class="relative text-center p-8">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-amber-500/30">3</div>
            <h3 class="text-xl font-bold text-white mb-3">Bagikan Tautan Rahasia</h3>
            <p class="text-slate-400 leading-relaxed">Publikasikan ceritamu dan dapatkan link unik. Kirimkan ke orang tersayangmu sebagai kejutan manis.</p>
            <div class="hidden md:block absolute top-12 left-0 w-1/2 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
          </div>
        </div>

        <!-- CTA Bottom -->
        <div class="text-center mt-16">
          <button @click="login" class="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 text-lg">
            Mulai Gratis Sekarang 🚀
          </button>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-4 bg-slate-900">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-rose-400 font-semibold text-sm tracking-widest uppercase mb-3">Harga</p>
          <h2 class="text-3xl sm:text-4xl font-bold">Mulai <span class="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text">Gratis</span>, Upgrade Kapan Saja</h2>
          <p class="text-slate-400 mt-4 max-w-2xl mx-auto">Nikmati semua fitur utama tanpa biaya. Paket premium segera hadir untuk pengalaman lebih istimewa.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <!-- Free Plan -->
          <div class="relative bg-slate-800/50 border-2 border-rose-500/50 rounded-2xl p-8 shadow-lg shadow-rose-900/10">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full">Aktif Sekarang</div>
            <h3 class="text-2xl font-bold text-white mb-2 mt-2">Gratis</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-extrabold text-white">Rp 0</span>
              <span class="text-slate-400 text-sm">/ selamanya</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-slate-300">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                3x AI Generate per hari
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Upload foto (auto-convert WebP)
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                6 pilihan soundtrack
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Link cerita publik
              </li>
            </ul>
            <button @click="login" class="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-500/20">
              Mulai Sekarang
            </button>
          </div>

          <!-- Premium Plan (Coming Soon) -->
          <div class="relative bg-slate-800/30 border border-slate-700 rounded-2xl p-8 opacity-75">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 text-slate-300 text-xs font-bold px-4 py-1 rounded-full">Coming Soon</div>
            <h3 class="text-2xl font-bold text-white mb-2 mt-2">Premium</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-extrabold text-slate-400">???</span>
              <span class="text-slate-500 text-sm">/ bulan</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-slate-400">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Unlimited AI Generate
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Custom domain cerita
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Tema eksklusif
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Tanpa watermark
              </li>
            </ul>
            <button disabled class="w-full py-3 bg-slate-700 text-slate-400 font-bold rounded-xl cursor-not-allowed">
              Segera Hadir
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-10 px-4 bg-slate-900 border-t border-slate-800">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <span class="text-rose-500 font-bold text-lg">Romantic Lane</span>
          <span class="text-slate-500 text-sm">© {{ new Date().getFullYear() }}</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-slate-400">
          <a href="#" class="hover:text-rose-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-rose-400 transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-rose-400 transition-colors">Contact</a>
        </div>
        <div class="flex items-center gap-4 text-slate-500">
          <!-- Instagram -->
          <a href="#" class="hover:text-rose-400 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <!-- Twitter/X -->
          <a href="#" class="hover:text-rose-400 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import TopHeader from '../components/layout/TopHeader.vue';

const router = useRouter();
const cardFlipped = ref(false);

const login = () => {
  const auth = getAuth();
  if (auth.currentUser) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
};

const scrollToDemo = () => {
  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
};

// Override global overflow:hidden dari style.css agar landing page bisa discroll
onMounted(() => {
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
});

onUnmounted(() => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});
</script>
