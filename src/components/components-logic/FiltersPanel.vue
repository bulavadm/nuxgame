<script setup>
import AppBaseSelect from "@/components/components-ui/AppBaseSelect.vue"
import AppBaseInput from "@/components/components-ui/AppBaseInput.vue"
import { useUsersStore } from "@/stores/usersStore.js"

const emit = defineEmits(['updateQueryParams'])

const usersStore = useUsersStore()

const filtersQuery = ref({
  title: '',
  userId: null,
  completed: null
})

function toQueryString(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

watch(() => filtersQuery.value, () => {
  emit('updateQueryParams', toQueryString(filtersQuery.value))
}, { deep: true })
</script>

<template>
  <div class="flex gap-x-2">
    <div class="w-[60%]">
      <AppBaseInput
        v-model:value="filtersQuery.title"
        placeholder="Search"
      />
    </div>

    <div class="w-[20%]">
      <AppBaseSelect
        v-model:value="filtersQuery.userId"
        placeholder="UserId"
        :options="usersStore.usersOptions.concat([{ value: null, label: 'All' }])"
      />
    </div>

    <div class="w-[20%]">
      <AppBaseSelect
        v-model:value="filtersQuery.completed"
        placeholder="Status"
        :options="[{ value: true, label: 'Completed'}, { value: false, label: 'Uncompleted' }, { value: null, label: 'All' }]"
      />
    </div>
  </div>
</template>

