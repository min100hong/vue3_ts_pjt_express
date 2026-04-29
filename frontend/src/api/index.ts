// src/api/index.ts
import axios from 'axios';

const api = axios.create({
  // Vite 환경 변수에서 베이스 URL을 가져옵니다.
  // 개발 시: '/api' (프록시 작동)
  // 운영 시: 'https://real-api.com' (실제 서버 주소)
  baseURL: `${import.meta.env.VITE_API_TARGET}:${import.meta.env.VITE_PORT}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5초 제한
});

export default api;
