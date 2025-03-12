<script setup>
import AppBaseCheckbox from "@/components/components-ui/AppBaseCheckbox.vue"

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: Boolean,
  isFavorite: Boolean,
})

const emit = defineEmits(['updateFavorite'])
</script>

<template>
  <div class="flex">
    <div class="w-[10%] border p-2">{{ props.userId }}</div>
    <div class="w-[30%] border p-2">{{ props.title }}</div>
    <div class="w-[30%] border p-2">{{ props.completed ? 'Yes' : 'No' }}</div>
    <div class="w-[30%] border p-2">
      <AppBaseCheckbox
        :value="props.isFavorite"
        @update:value="(value) => emit('updateFavorite', props.id, value)"/>
    </div>
  </div>
</template>

