<script setup>
import VueSelect from "vue3-select-component"

const props = defineProps({
  value: {
    type: [ String, Number ],
    default: null,
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: String
})

const emit = defineEmits(['update:value'])

const selected = ref(null)

watch(() => props.value, () => {
  selected.value = props.value
})

watch(() => selected.value, (value) => {
  emit('update:value', value)
})
</script>

<template>
  <VueSelect
    v-model="selected"
    :options="props.options"
    :placeholder="props.placeholder"
  />
</template>
