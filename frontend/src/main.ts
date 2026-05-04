import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { useAuthStore } from './stores/account'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

// 핵심: 마운트 전 인증 확인
// const authStore = useAuthStore();
// authStore.checkAuth().then(() => {
  // 인증 체크가 끝나면 라우터와 앱 마운트
  app.use(router);
  app.mount('#app');
// });
