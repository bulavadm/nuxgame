<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="props.type" class="bg-[#519945] p-2 rounded-md cursor-pointer" @click="() => emit('click')">
    {{ text }}
  </button>
</template>
