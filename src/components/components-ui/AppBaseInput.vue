<script setup>
const props = defineProps({
  value: {
    type: [ String, Number ],
    default: null,
  },
  type: {
    type: String,
    default: 'text'
  },
  pattern: String,
  placeHolder: String,
})

const emit = defineEmits(['update:value'])

const internalValue = ref(props.value)

watch(() => props.value, () => {
  internalValue.value = props.value
})

watch(() => internalValue.value, (newValue, oldValue) => {
  if (props.pattern && !new RegExp(props.pattern).test(newValue)) {
    internalValue.value = oldValue;
  } else {
    emit('update:value', newValue);
  }
})
</script>

<template>
  <input class="w-full p-2 rounded-md border-none bg-white"
    v-model="internalValue"
    :type="props.type"
    :placeholder="props.placeHolder"
  />
</template>
