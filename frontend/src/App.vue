<template>
  <div class="container-fluid">
     <RouterView />
  </div>
</template>

<script setup lang="ts">
// import axios from 'axios';
// import { onMounted, toRefs } from 'vue';
// import { toRefs } from 'vue';
// import api from '@/api';
// import HeaderGNB from './components/HeaderGNB.vue';
// import { useAuthStore } from './stores/account';

// const authStore = useAuthStore()
// const { isAuth } = toRefs(authStore)
// const fetchUser = async () => {
//   try {
//     // 실제 경로는 '/api/account' 이지만
//     // Vite 프록시 설정에 의해 'http://localhost:3000 전달됨
//     const res = await api.get('/api/account')
//     accountStore.setAccount({userId: res.data.userId, userName: res.data.userName})
//     accountStore.setIsLogin(true)
//   } catch (error) {
//     alert(`API 호출 에러: ${error}`);
//     accountStore.setIsLogin(false)
//   }
// };

// onMounted(() => {
//   fetchUser()
// })
</script>

<style scoped>
</style>
