<script setup>

const props = defineProps({
  value: Boolean,
})

const emit = defineEmits(['update:value'])
</script>

<template>
  <label class="flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="props.value"
      @change="(event) => emit('update:value', event.target.checked)"
      class="peer hidden"
    />
    <span class="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
      <svg v-if="props.value" class="w-4 h-4 text-green-900" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg v-else class="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </label>
</template>
