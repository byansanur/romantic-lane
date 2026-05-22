<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <!-- Modal Panel -->
    <div class="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-down">
      
      <!-- Icon Header -->
      <div class="px-6 pt-6 pb-4 flex flex-col items-center text-center">
        <!-- Success Icon -->
        <div v-if="type === 'success'" class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <!-- Error Icon -->
        <div v-else-if="type === 'error'" class="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- Warning Icon -->
        <div v-else-if="type === 'warning'" class="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <!-- Info Icon -->
        <div v-else class="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
        <p class="text-slate-400 text-sm leading-relaxed">{{ message }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="px-6 pb-6 pt-2 flex gap-3 w-full">
        <button 
          v-if="secondaryAction" 
          @click="secondaryAction.handler"
          class="flex-1 px-4 py-2.5 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-xl transition-colors"
        >
          {{ secondaryAction.text }}
        </button>
        
        <button 
          @click="primaryAction.handler"
          class="flex-1 px-4 py-2.5 text-white font-medium rounded-xl transition-colors"
          :class="buttonColorClass"
        >
          {{ primaryAction.text }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    default: 'info', // success, error, warning, info
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  primaryAction: {
    type: Object,
    required: true,
    // Expected shape: { text: 'Confirm', handler: () => {} }
  },
  secondaryAction: {
    type: Object,
    default: null
    // Expected shape: { text: 'Cancel', handler: () => {} }
  }
});

defineEmits(['close']);

const buttonColorClass = computed(() => {
  switch (props.type) {
    case 'success': return 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20';
    case 'error': return 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/20';
    case 'warning': return 'bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-900/20';
    default: return 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20';
  }
});
</script>
