import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('ENV URL >>>', `${env.VITE_API_TARGET}`)
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    // 이제 프론트엔드 코드 내에서는 import.meta.env.VITE_API_TARGET으로,
    // 설정 파일 내에서는 env.VITE_API_TARGET으로 동일한 값을 관리할 수 있습니다.
    server: {
      proxy: {
        '/api': {
          // port: env.VITE_PORT || 8080, // 환경 변수에서 포트 설정
          target: `${env.VITE_API_TARGET}:${env.VITE_PORT}`,     // .env에서 가져온 타겟 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        }
      }
    }
  }
})
