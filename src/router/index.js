import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* 
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    */
    {
      path: '/page',
      name: 'page',
      component: () => import('../modules/page/components/Page.vue')
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
