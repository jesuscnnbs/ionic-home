import { createRouter, createWebHistory } from '@ionic/vue-router';
import { getCurrentUser } from 'vuefire'
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/HomesPage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/MonthsPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/PaymentsPage.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/UserPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if(to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
      return {
        path: '/',
        query: {
          redirect: to.fullPath,
        }
      }
    }
  }
})

export default router
