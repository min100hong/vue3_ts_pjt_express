# === FrontEnd ===

This template should help get you started developing with Vue 3 in Vite.
- .env.development : 개발환경
- .env.production  : 운영환경
  
- npm install dotenv

- compileOption 설정 : tsconfig.json  

- proxy 설정
  - vite.config.ts 파일에서 설정

- cd frontend
- npm run start

## 구성내용
 - 중첩 라우터
  - GNB를 클릭하고 하위그룹의 Route를 옮겨다녀도 GNB는 Active 되어 있는 장점.
    active-class="active" -> css a.active 내용을 기술 
  - LNB를 포함하는 화면
    - 해당 그룹을 감싸는 Layoutview를 만들고 좌측: LNB 컴포넌트 우측: <RouterView />
  - 팝업레이아웃
    - 팝업을 감싸는 Layout을 만들어 <slot></slot> 화 시켜서 공통화 시킴.

## 간단하지만 실수때문에 고생한것
  - <'form'>태그 안쪽에 <'button' type="button" class="btn btn-primary" @click="userLogin">로그인<'/button'>" type을 button으로
  - 또는 <form @sumit.prevent="userLogin"></form> 이렇게 해주어야 login API 호출뒤에 브라우저가 리로딩 되지 않고 다음 행이 실행됨.


# === BackEnd ===

### 설치 모듈
- "express": "^5.2.1",
- "body-parser": "^2.2.2",
- "cookie-parser": "^1.4.7",
- "jsonwebtoken": "^9.0.3"

- api-server.js : controller /service



### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
