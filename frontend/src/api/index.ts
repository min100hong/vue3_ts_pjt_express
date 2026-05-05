// src/api/index.ts
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const api = axios.create({
  // Vite 환경 변수에서 베이스 URL을 가져옵니다.
  // 개발 시: '/api' (프록시 작동)
  // 운영 시: 'https://real-api.com' (실제 서버 주소)
  // baseURL: `${import.meta.env.VITE_API_TARGET}:${import.meta.env.VITE_PORT}`,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5초 제한
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러나 토큰 부재 시 자동 리다이렉트 로직이 있는지 확인
    if (error.response && error.response.status === 401) {
      // 로그인 API 호출 중 발생한 에러는 여기서 처리하지 않도록 예외 설정
      if (error.config.url !== '/api/account') {
        router.push({ name: 'Login' });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
