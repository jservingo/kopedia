import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/perfil',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/course/:id',
      name: 'course',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/page/:id',
      name: 'page',
      component: () => import('../views/PageView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/HomeAdminView.vue')
    },
    {
      path: '/admin/course/:id',
      name: 'courseAdmin',
      component: () => import('../views/CourseAdminView.vue')
    },
    {
      path: '/admin/page/:id',
      name: 'pageAdmin',
      component: () => import('../views/PageAdminView.vue')
    }
  ]
})

export default router
