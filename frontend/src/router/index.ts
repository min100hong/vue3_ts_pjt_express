import { createRouter, createWebHistory } from 'vue-router'
// import Cookies from 'js-cookie'
// import axios from 'axios'

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
        rediction: '/intro', // '/company/intro 형태로 url 표시하려는 의미
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

// router.beforeEach(async(to, from, next) => {
//   const token = Cookies.get('token')
//   // 1. 퍼블릭 페이지(로그인 등)는 바로 진입 허용
//   console.log('Token >>>>>>>>', token)

//   if (to.meta.public && !token && to.path === '/login') {
//     console.log('1')
//     return next();
//   }

//   // 2. 토큰이 없으면 로그인 페이지로 이동
//   // if (!token) {
//   //   next('/login');
//   // }

//   // router.beforeEach((to, from, next) => {
//   // if (to.name !== 'Login' && !isAuth.value) {
//   //   next({ name: 'Login' }); // Redirect to login
//   // } else {
//   //   next(); // Proceed as normal
//   // }
//   // });
//   if (!token) {
//       return next('/login')
//      // 인증이 필요하지만 토큰이 없으면 로그인으로
//   } else {
//     const res = await axios.get('/api/account', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     console.log('res >>>>>>', res.data)
//     // await authStore.checkAuth()
//     // console.log('>>>>>>>>', to.name, ' | ', authStore.isAuth, authStore.user)
//     if ( res.data.userId) {
//       return next(); // 인증 성공 시 사이트 진입
//     }
//   }

  // 3. 토큰이 있다면 서버 API를 통해 유효성 검증

  //   try {
  //     console.log('beforeEach', token)
  //     // 서버의 '내 정보' 또는 '세션 체크' API 호출
  //     // await axios.get('/api/account', {
  //     //   headers: { Authorization: `Bearer ${token}` }
  //     // });
  //     // const authStore = useAuthStore()

  //   // 3. 토큰이 있다면 서버 API를 통해 유효성 검증
  //     // 서버의 '내 정보' 또는 '세션 체크' API 호출
  //     const res = await axios.get('/api/account', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     console.log('res >>>>>>', res.data)
  //     // await authStore.checkAuth()
  //     // console.log('>>>>>>>>', to.name, ' | ', authStore.isAuth, authStore.user)
  //     if ( to.path !== '/login') {
  //       next(); // 인증 성공 시 사이트 진입
  //     }
  //   } catch (error) {
  //     // 토큰이 만료되었거나 변조된 경우
  //     Cookies.remove('token');
  //     alert(error)
  //     next('/login');
  //   }
  // });
  // const authStore = useAuthStore()
  // const { isAuth } = toRefs(authStore)
  // console.log('isAuth >>>', to.name, ' | ', isAuth.value)
  // if (to.name !== 'Login' && !isAuth.value) next({ name: 'Login' })
  // else next()
// })
// router.beforeEach((
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) => {
//   // const isAuthenticated = true; // 실제 인증 로직

//   const { a}

//   // if (to.meta.requiresAuth && !isAuthenticated) {
//   if (!auth) {
//     next({ name: 'Login' }); // 로그인 페이지로 리다이렉트
//   } else {
//     next(); // 탐색 승인
//   }
// });

export default router
