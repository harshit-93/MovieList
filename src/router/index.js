import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import login from '@/components/login.vue'
import signup from '@/components/signup.vue'
const routes = [
  {
    path: '/',
    name: 'Helloworld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router