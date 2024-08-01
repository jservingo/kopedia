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
      path: '/contador',
      name: 'contador',
      component: () => import('../modules/contador/components/Contador.vue')
    },
    {
      path: '/lista-de-tareas',
      name: 'listaDeTareas',
      component: () => import('../modules/listaDeTareas/components/ListaDeTareas.vue')
    } 
  ]
})

export default router
