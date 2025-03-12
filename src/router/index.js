import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from "@/pages/UserLogin.vue"
import UserTodos from "@/pages/UserTodos.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/todos',
      name: 'todos',
      component: UserTodos,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('userId')) {
    next({ name: 'login' })
  }
  else next()
})

export default router
