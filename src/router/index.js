import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

function auth(to, from) {
  const auth = useAuthStore();
  if (!auth.user)
    return "/login";
}

function guest(to, from) {
  const auth = useAuthStore();
  if (auth.user)
    return "/";
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('../views/HomeGuestView.vue')
    },
    {
      path: '/guest',
      name: 'guestRoot',
      component: () => import('../views/HomeGuestView.vue')
    },
    {
      path: '/student',
      name: 'student',
      beforeEnter: auth,
      component: () => import('../views/HomeStudentView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: auth,
      component: () => import('../views/HomeAdminView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import('../views/RegisterView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: guest,
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/perfil',
        name: 'profile',
        beforeEnter: auth,
        component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/guest/course/:id',
      name: 'course',
      //beforeEnter: auth,
      component: () => import('../views/CourseGuestView.vue')
    },
    {
      path: '/guest/page/:id',
      name: 'page',
      //beforeEnter: auth,
      component: () => import('../views/PageGuestView.vue')
    },
    {
      path: '/student/course/:id',
      name: 'courseStudent',
      beforeEnter: auth,
      component: () => import('../views/CourseStudentView.vue')
    },
    {
      path: '/student/page/:id',
      name: 'pageStudent',
      beforeEnter: auth,
      component: () => import('../views/PageStudentView.vue')
    },
    {
      path: '/admin/course/:id',
      name: 'courseAdmin',
      beforeEnter: auth,
      component: () => import('../views/CourseAdminView.vue')
    },
    {
      path: '/admin/unit/:id',
      name: 'unitAdmin',
      beforeEnter: auth,
      component: () => import('../views/UnitAdminView.vue')
    },
    {
      path: '/admin/page/:id',
      name: 'pageAdmin',
      beforeEnter: auth,
      component: () => import('../views/PageAdminView.vue')
    },
    {
      path: '/admin/card/:id',
      name: 'cardAdmin',
      beforeEnter: auth,
      component: () => import('../views/CardAdminView.vue')
    }
  ]
})

export default router
