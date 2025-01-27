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
      component: () => import('../views/guest/HomeGuestView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/ModalTestView.vue')
    },
    {
      path: '/guest',
      name: 'guestRoot',
      component: () => import('../views/guest/HomeGuestView.vue')
    },
    {
      path: '/student',
      name: 'student',
      beforeEnter: auth,
      component: () => import('../views/student/HomeStudentView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: auth,
      component: () => import('../views/admin/HomeAdminView.vue')
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
      path: '/guest/course/:id/:slug',
      name: 'course',
      //beforeEnter: auth,
      component: () => import('../views/guest/CourseGuestView.vue')
    },
    {
      path: '/guest/page/:id/:slug',
      name: 'page',
      //beforeEnter: auth,
      component: () => import('../views/guest/PageGuestView.vue')
    },
    {
      path: '/student/course/:id/:slug',
      name: 'courseStudent',
      beforeEnter: auth,
      component: () => import('../views/student/CourseStudentView.vue')
    },
    {
      path: '/student/page/:id/:id_card/:slug',
      name: 'pageStudent',
      beforeEnter: auth,
      component: () => import('../views/student/PageStudentView.vue')
    },
    {
      path: '/admin/course/:id/:slug',
      name: 'courseAdmin',
      beforeEnter: auth,
      component: () => import('../views/admin/CourseAdminView.vue')
    },
    {
      path: '/admin/unit/:id/:slug',
      name: 'unitAdmin',
      beforeEnter: auth,
      component: () => import('../views/admin/UnitAdminView.vue')
    },
    {
      path: '/admin/page/:id/:slug',
      name: 'pageAdmin',
      beforeEnter: auth,
      component: () => import('../views/admin/PageAdminView.vue')
    },
    {
      path: '/admin/card/:id/:slug',
      name: 'cardAdmin',
      beforeEnter: auth,
      component: () => import('../views/admin/CardAdminView.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      component: () => import('../views/PageNotFound.vue') 
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    /*
    if (savedPosition) {
      return savedPosition;
    }
    */
    if (to.hash) {
      return { el: to.hash };
    }
    //return { x: 0, y: 0 };
  }
})

export default router
