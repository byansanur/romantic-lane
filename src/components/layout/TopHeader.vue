<template>
  <header class="h-16 px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
    
    <!-- LANDING MODE -->
    <template v-if="mode === 'landing'">
      <div class="flex items-center gap-8">
        <h1 class="text-xl font-bold text-rose-500">Romantic Lane</h1>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#" class="hover:text-rose-400 transition-colors">Home</a>
          <a href="#" class="hover:text-rose-400 transition-colors">About</a>
          <a href="#" class="hover:text-rose-400 transition-colors">Pricing</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <button @click="$emit('login')" class="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors">
          Login
        </button>
        <button @click="$emit('create-story')" class="px-4 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white rounded-full transition-colors shadow-lg shadow-rose-900/20">
          Create Story
        </button>
      </div>
    </template>

    <!-- DASHBOARD MODE -->
    <template v-else-if="mode === 'dashboard'">
      <!-- Hamburger Button (Mobile Only) -->
      <button @click="$emit('toggle-sidebar')" class="md:hidden mr-4 p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex-1 flex items-center">
        <!-- Disiapkan untuk integrasi Elasticsearch di future development -->
        <div class="relative w-full max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search stories, music, images, captions..." 
            class="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-950 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 sm:text-sm transition-colors"
            @input="(e) => $emit('search', e.target.value)"
          >
        </div>
      </div>
    </template>

  </header>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ['landing', 'dashboard'].includes(value)
  }
});

defineEmits(['login', 'create-story', 'search', 'toggle-sidebar']);
</script>
