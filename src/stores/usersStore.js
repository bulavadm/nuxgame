import { defineStore } from 'pinia';

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
  }),

  getters: {
    usersOptions: (state) => state.users.map((i) => {
      return {
        value: i.id,
        label: `${i.id} - ${i.name}`
      }
    })
  },

  actions: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          this.users = data
        })
    }
  },
});
