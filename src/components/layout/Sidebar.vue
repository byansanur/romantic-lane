<template>
  <aside class="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full text-slate-300">
    <div class="p-6 border-b border-slate-800">
      <h2 class="text-2xl font-bold text-rose-500 tracking-tight">Romantic Lane</h2>
    </div>
    
    <nav class="flex-1 py-6 px-4 space-y-2">
      <!-- Create Story Button -->
      <button @click="$emit('create-story')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-500 transition-colors mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Story
      </button>

      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-500/10 text-rose-500 font-medium transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        My Stories
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </a>
      
      <!-- Language Toggle -->
      <button @click="$emit('change-language')" class="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-slate-900 transition-colors text-slate-400 hover:text-slate-200">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Language
        </div>
        <span class="text-xs font-semibold bg-slate-800 px-2 py-1 rounded border border-slate-700">EN</span>
      </button>
    </nav>

    <!-- Quota Indicator -->
    <div class="px-4 mb-4">
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-3">
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Story Quota</span>
          <span class="text-xs font-bold" :class="user?.aiGenerateCount >= 3 ? 'text-rose-500' : 'text-emerald-500'">
            {{ user?.aiGenerateCount || 0 }} / 3
          </span>
        </div>
        <div class="w-full bg-slate-800 rounded-full h-1.5">
          <div class="h-1.5 rounded-full transition-all duration-300" :class="user?.aiGenerateCount >= 3 ? 'bg-rose-500' : 'bg-emerald-500'" :style="{ width: `${Math.min(((user?.aiGenerateCount || 0) / 3) * 100, 100)}%` }"></div>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t border-slate-800">
      <div class="flex items-center gap-3 mb-4">
        <img :src="user?.avatar || 'https://via.placeholder.com/40'" alt="Avatar" class="w-10 h-10 rounded-full border border-slate-700 object-cover" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-200 truncate">{{ user?.name || 'Guest User' }}</p>
          <div class="mt-0.5">
            <span v-if="user?.isPremium" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Premium
            </span>
            <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
              Free Plan
            </span>
          </div>
        </div>
      </div>
      <button @click="$emit('logout')" class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: () => ({ name: '', avatar: '', isPremium: false, aiGenerateCount: 0 })
  }
});
defineEmits(['logout', 'create-story', 'change-language']);
</script>
