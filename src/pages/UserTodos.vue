<script setup>
import { useUsersStore } from "@/stores/usersStore.js"
import router from "@/router/index.js"
import AppBaseButton from "@/components/components-ui/AppBaseButton.vue"
import UserTodoRow from "@/components/components-logic/UserTodoRow.vue"
import AppBaseInput from "@/components/components-ui/AppBaseInput.vue";
import AppBaseSelect from "@/components/components-ui/AppBaseSelect.vue";
import FiltersPanel from "@/components/components-logic/FiltersPanel.vue";

const usersStore = useUsersStore()
const user = computed(() => usersStore.users.find((user) => user.id.toString() === localStorage.getItem('userId')))

const todosList = ref([])

onMounted(() => {
  getTodos()
})

function getTodos(queryParams) {
  fetch(`https://jsonplaceholder.typicode.com/todos?${queryParams}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = JSON.parse(localStorage.getItem('favoriteIds')) || []

      todosList.value = data.map(todo => ({
        ...todo,
        isFavorite: favorites.includes(todo.id)
      }))
    })
}

const bodyCreateTodo = ref({
  userId: null,
  title: ''
})

function createTodo() {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(bodyCreateTodo.value),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      todosList.value.unshift({
        ...data,
        isFavorite: false
      })

      clearForm()
    })
}

function clearForm() {
  bodyCreateTodo.value.userId = null
  bodyCreateTodo.value.title = ''
}

function updateFavorite(id, value) {
  const todo = todosList.value.find((todo) => todo.id === id)
  todo.isFavorite = value

  saveFavorites(id, value)
}

function saveFavorites(id, value) {
  const favoriteIds = JSON.parse(localStorage.getItem('favoriteIds')) || []

  if (value) {
    if (!favoriteIds.includes(id)) {
      favoriteIds.push(id)
    }
  } else {
    const filteredFavorites = favoriteIds.filter(todoId => todoId !== id)
    localStorage.setItem('favoriteIds', JSON.stringify(filteredFavorites))
    return
  }

  localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds))
}

function logout() {
  localStorage.removeItem('userId')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex flex-col h-full p-2 rounded-lg">
    <div class="flex justify-between items-center bg-gray-200 p-2">
      <div class="flex flex-col text-sm">
        <div class="font-bold">
          {{ user?.name }}
        </div>
        <div>{{ user?.email }}</div>
      </div>

      <AppBaseButton text="Logout" @click="logout"/>
    </div>

    <hr class="h-px my-1 border-1">

    <form @submit.prevent="createTodo" class="flex p-2 gap-x-2">
      <div class="w-[20%]">
        <AppBaseSelect
          v-model:value="bodyCreateTodo.userId"
          placeholder="UserId"
          :options="usersStore.usersOptions"
        />
      </div>

      <AppBaseInput
        v-model:value="bodyCreateTodo.title"
        placeholder="Title"
      />

      <AppBaseButton text="Create" type="submit" />
    </form>

    <hr class="h-px my-1 border-1">

    <FiltersPanel class="mb-2" @update-query-params="(value) => getTodos(value)"/>

    <div class="h-full flex flex-col">
      <div class="flex bg-gray-500 text-white text-sm">
        <div class="w-[10%] border-gray-800 p-1">User ID</div>
        <div class="w-[30%] border-gray-800 p-1">Title</div>
        <div class="w-[30%] border-gray-800 p-1">Completed</div>
        <div class="w-[30%] p-1">Favorite</div>
      </div>

      <div  class="flex flex-col grow overflow-auto">
        <UserTodoRow v-for="todo in todosList" :key="todo.id"
          :id="todo.id"
          :user-id="todo.userId"
          :title="todo.title"
          :completed="todo.completed"
          :is-favorite="todo.isFavorite"
          @update-favorite="(id, value) => updateFavorite(id, value)"
        />
      </div>
    </div>
  </div>
</template>
