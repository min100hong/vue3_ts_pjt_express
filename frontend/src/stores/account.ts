import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Auth } from '@/types/account';
import Cookies from 'js-cookie'
import axios from 'axios';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<Omit<Auth, "userPwd">>({userId: '', userName: ''})
  const isAuth = ref<boolean>(false);
  const isLoading = ref<boolean>(true); // 초기화 상태 관리

  // const { cookies } = useCookies()


  // 서버에 인증 상태 확인
  async function checkAuth() {
    isLoading.value = true;
    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('No token');

      // const response = await axios.get('/api/account'); // 사용자 정보 API
      const response =await axios.get('/api/account', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('token 유효성체크후 response : ', response.data)
      user.value.userId = response.data.userId;
      user.value.userName = response.data.userName;
      isAuth.value = true;
    } catch (error) {
      isAuth.value = false;
      user.value = {userId:'', userName: ''};
      console.log(error)
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    try {
      // 1. 서버 API 호출 (선택 사항이지만 권장)
      await axios.delete('/api/delete');
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      // 2. 클라이언트 상태 초기화 (API 성공 여부와 상관없이 실행)
      isAuth.value = false;
      user.value = {userId: '', userName: ''};

      // 3. 로컬 스토리지에 토큰을 저장했다면 삭제
      Cookies.remove('token');

      // 4. Axios 공통 헤더 등 초기화 필요 시 처리
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  return { isAuth, user, isLoading, checkAuth, logout };
});
// export const useAccountStore = defineStore('account', () => {

//   const account = reactive<Omit<Auth, "userPwd">>({userId: '', userName: ''})
//   const isLogin = ref(false)

//   const setAccount = (userInfo: Omit<Account, "userPwd">) => {
//     account.userId = userInfo.userId
//     account.userName = userInfo.userName
//   }
//   const setIsLogin = (isUserLogin: boolean) => isLogin.value = isUserLogin
//   return { isLogin, account,  setAccount, setIsLogin}
// })
