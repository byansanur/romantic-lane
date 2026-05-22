<template>
  <div class="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white relative overflow-hidden">
    <!-- Background elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
        Welcome to <span class="text-rose-500">Romantic Lane</span>
      </h2>
      <p class="mt-2 text-center text-sm text-slate-400">
        Masuk untuk menyimpan dan membagikan ceritamu
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-slate-900 py-8 px-4 shadow-2xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-slate-800">
        <form class="space-y-6" @submit.prevent="handleEmailLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-300">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                class="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 bg-slate-950 text-white sm:text-sm transition-colors" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-300">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 bg-slate-950 text-white sm:text-sm transition-colors" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-700 rounded bg-slate-950" />
              <label for="remember-me" class="ml-2 block text-sm text-slate-400">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-rose-500 hover:text-rose-400 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all shadow-rose-900/30 hover:shadow-rose-500/30 disabled:opacity-70">
              <span v-if="!isLoading">Sign in</span>
              <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-slate-900 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button @click="loginWithGoogle" :disabled="isLoading"
              class="w-full inline-flex justify-center py-3 px-4 border border-slate-700 rounded-xl shadow-sm bg-slate-950 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50">
              <svg v-if="!isLoading" class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div v-else class="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin mr-2"></div>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
      
      <p class="mt-8 text-center text-sm text-slate-500">
        <button @click="router.push('/')" class="hover:text-rose-400 transition-colors">
          &larr; Back to Home
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { syncUser } from '../services/modules/user';

const router = useRouter();
const auth = getAuth();
const provider = new GoogleAuthProvider();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleEmailLogin = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    const syncResponse = await syncUser();
    if (syncResponse && syncResponse.data) {
      localStorage.setItem('user_cache', JSON.stringify(syncResponse.data));
    }
    router.push('/dashboard');
  } catch (error) {
    console.error('Email login failed', error);
    let errorMessage = 'Gagal melakukan login. Silakan periksa email dan password Anda.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Email atau password salah.';
    }
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

const loginWithGoogle = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  
  try {
    await signInWithPopup(auth, provider);
    const syncResponse = await syncUser();
    if (syncResponse && syncResponse.data) {
      localStorage.setItem('user_cache', JSON.stringify(syncResponse.data));
    }
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
    alert('Gagal melakukan login dengan Google. Silakan coba lagi.');
  } finally {
    isLoading.value = false;
  }
};

// Override global overflow:hidden dari style.css agar halaman bisa discroll
onMounted(() => {
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
});

onUnmounted(() => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});
</script>
