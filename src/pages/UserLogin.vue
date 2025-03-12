<script setup>
import AppBaseInput from "@/components/components-ui/AppBaseInput.vue"
import AppBaseButton from "@/components/components-ui/AppBaseButton.vue"
import { useUsersStore } from "@/stores/usersStore.js"
import { useRouter } from "vue-router"

const router = useRouter()
const usersStore = useUsersStore()

const login = ref({
  username: '',
  phone: ''
})

const error = ref(null)

function handleSubmit() {
  const user = usersStore.users.find((user) => user.username === login.value.username && user.phone === login.value.phone)

  if (user) {
    localStorage.setItem('userId', user.id)
    error.value = null
    router.push({ name: 'todos' })
  } else {
    error.value = 'Login error'
  }
}
</script>

<template>
<div class="flex justify-center items-center w-full h-full">
  <form @submit.prevent="handleSubmit" class="flex flex-col w-full max-w-[450px]">
    <div class="flex justify-center bg-[#A5A5A5] p-2">description</div>
    <div class="flex flex-col p-4 bg-[#C3C3C3] space-y-4">
      <div class="p-1 text-gray-600">description</div>
      <AppBaseInput
        v-model:value="login.username"
        placeholder="UserName"
        pattern="^[A-Za-zА-Яа-яЁё]*$"
      />
      <AppBaseInput
        v-model:value="login.phone"
        placeholder="Phone Number"
      />
      <AppBaseButton
        type="submit"
        text="Register"
      />
      <div v-if="error" class="flex justify-center text-red-500">
        {{ error }}
      </div>
    </div>
  </form>
</div>
</template>

