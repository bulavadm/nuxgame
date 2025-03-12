<script setup>
import { useUsersStore } from "@/stores/usersStore.js"

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <RouterView />
</template>
