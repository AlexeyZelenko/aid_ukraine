import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Volunteers from '../views/Volunteers.vue'
import Needs from '../views/Needs.vue'
import Financial from '../views/Financial.vue'
import Map from '../views/Map.vue'
import Blog from '../views/Blog.vue'
import Articles from '../views/Articles.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/volunteers',
      name: 'volunteers',
      component: Volunteers
    },
    {
      path: '/needs',
      name: 'needs',
      component: Needs
    },
    {
      path: '/financial',
      name: 'financial',
      component: Financial
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router