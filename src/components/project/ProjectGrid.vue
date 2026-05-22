<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    
    <!-- Create New Story Card -->
    <div 
      @click="$emit('create-story')"
      class="group relative h-64 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 hover:border-rose-500 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center"
    >
      <div class="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-rose-500/20 flex items-center justify-center mb-4 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-400 group-hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-300 group-hover:text-rose-400 transition-colors">Create New Story</h3>
      <p class="mt-1 text-sm text-slate-500">Start a new romantic journey</p>
    </div>

    <!-- Existing Stories -->
    <div 
      v-for="project in projects" 
      :key="project.id"
      @click="$emit('open-story', project.slug || project.id)"
      class="group relative h-64 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-900/20 transition-all cursor-pointer flex flex-col"
    >
      <div class="flex-1 bg-slate-900 relative overflow-hidden">
        
        <!-- Thumbnail Grid Logic -->
        <template v-if="project.thumbnails && project.thumbnails.length > 0">
          
          <!-- Single Thumbnail -->
          <div v-if="project.thumbnails.length === 1" class="w-full h-full">
            <img :src="project.thumbnails[0]" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <!-- Two Thumbnails -->
          <div v-else-if="project.thumbnails.length === 2" class="w-full h-full flex">
            <img :src="project.thumbnails[0]" class="w-1/2 h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity border-r border-slate-900" />
            <img :src="project.thumbnails[1]" class="w-1/2 h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity border-l border-slate-900" />
          </div>
          
          <!-- Three Thumbnails (Collage) -->
          <div v-else-if="project.thumbnails.length >= 3" class="w-full h-full flex">
            <div class="w-1/2 h-full">
              <img :src="project.thumbnails[0]" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity border-r border-slate-900" />
            </div>
            <div class="w-1/2 h-full flex flex-col">
              <img :src="project.thumbnails[1]" class="w-full h-1/2 object-cover opacity-80 group-hover:opacity-100 transition-opacity border-b border-l border-slate-900" />
              <img :src="project.thumbnails[2]" class="w-full h-1/2 object-cover opacity-80 group-hover:opacity-100 transition-opacity border-t border-l border-slate-900" />
            </div>
          </div>
          
        </template>
        
        <div v-else class="w-full h-full flex items-center justify-center bg-slate-800/50 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div class="p-4 bg-slate-900 border-t border-slate-800 relative z-10 flex items-center justify-between gap-4">
        <div class="truncate">
          <h3 class="text-lg font-medium text-slate-200 truncate group-hover:text-rose-400 transition-colors">{{ project.title }}</h3>
          <p class="text-xs text-slate-400 mt-1">{{ project.createdAt || 'Just now' }}</p>
        </div>
        
        <!-- Toggle is_active -->
        <button 
          @click.stop="$emit('toggle-active', project)"
          class="shrink-0 flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors border"
          :class="project.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'"
        >
          <div class="w-1.5 h-1.5 rounded-full mr-1.5" :class="project.isActive ? 'bg-emerald-400' : 'bg-slate-500'"></div>
          {{ project.isActive ? 'Active' : 'Draft' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    default: () => []
  }
});
defineEmits(['create-story', 'open-story']);
</script>
