import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { GROUPS } from '@/constansts/routes'
import { authGuard } from '@/middlewares/AuthMiddleware'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.AUTH
            }
        },
        {
            path: '/login',
            name: 'login',
            component: import('@/views/LoginView.vue'),
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.GUEST
            }
        },
        {
            path: '/signup',
            name: 'register',
            component: import('@/views/RegisterView.vue'),
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.GUEST
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/AboutView.vue'),
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.ALL
            }
        },
        {
            path: '/posts',
            name: 'posts',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/PostsView.vue'),
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.AUTH
            }
        },
        {
            path: '/profile',
            name: 'profile',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/ProfileView.vue'),
            meta: {
                layout: 'DefaultLayout',
                group: GROUPS.AUTH
            }
        },
    ],
})

router.beforeEach(authGuard)

export default router
