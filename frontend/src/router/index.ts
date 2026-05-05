import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/account';

const routes = [
  {
    path: '/auth',
    component: () => import('@/views/layout/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/layout/MainLayout.vue'),
    children: [
      {
        path: '', // '/' 접근시 Default Page
        name: 'Home',
        component: () => import(`@/views/HomeView.vue`),
      },
      {
        path: 'todo',
        name: 'Todo',
        component: () => import(`@/views/TodoList.vue`),
      },
      {
        path: 'products',
        component: () => import(`@/views/layout/ProductLayout.vue`),
        children: [
          {
              path: '',  // Default Page
              name: 'ProductList',
              component: () => import(`@/views/ProductView.vue`),
          },
          {
              path: ':id',
              name: 'ProductDetail',
              component: () => import(`@/views/ProductDetail.vue`),
          }
        ]
      },
      {
        path: 'company',
        component: () => import('@/views/layout/CompanyLayout.vue'),
        redirect: '/company/intro',
        children: [
          {
            path: 'intro',
            name: 'Intro',
            component: () => import('@/views/IntroView.vue')
          },
          {
            path: 'location',
            name: 'Location',
            component: () => import('@/views/LocationView.vue')
          },
          {
            path: 'history',
            name: 'History',
            component: () => import('@/views/HistoryView.vue')
          }
        ]
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(`@/views/UserInfo.vue`),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 전역 네비게이션 가드

router.beforeEach(async(to) => {
  const authStore = useAuthStore();
  const token = Cookies.get('token');

  console.log(`[Guard] 이동: ${String(to.name)}, 토큰: ${token}`);

  // 로그인 페이지 이동 시
  if (to.name === 'Login') {
    if (token) {

      return { name: 'Home' }; // 토큰 있으면 홈으로
    }
    return true; // 없으면 로그인 페이지 진입 허용
  }

  // 로그인 안 된 상태로 다른 페이지 접근 시
  if (!token) {
    console.warn('토큰 없음 -> 로그인 이동');
    return { name: 'Login' };
  }
  if(token) {
    try{
      await authStore.checkAuth()
      return true; // 그 외 통과
    } catch(err) {
      console.warn('토큰 유효하지 않음 -> 로그인 이동');
      console.error('Login Error:', err);
      return { name: 'Login' };
    }
  }
});

export default router
