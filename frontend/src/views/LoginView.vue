<template>
  <ModalLayout>
    <div class="title">Login</div>
    <form>
      <div class="mb-3">
        <label for="userId" class="form-label">아이디</label>
        <input type="text" class="form-control" id="userId" aria-describedby="emailHelp" v-model="userId" placeholder="비밀번호를 입력하세요" required>
      </div>
      <div class="mb-3">
        <label for="userPwd" class="form-label">비밀번호</label>
        <input type="password" class="form-control" id="userPwd" v-model="userPwd" placeholder="비밀번호를 입력하세요" required>
      </div>
      <button type="button" class="btn btn-primary" @click="userLogin">로그인</button>
    </form>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import ModalLayout from '@/components/modal/ModalLayout.vue';
import api from '@/api';

const userId = ref<string | null>(null)
const userPwd = ref<string | null>(null)

const router = useRouter()

// 로그인 실행
const userLogin = async () => {
  try {
    const payload = {id : userId.value, pw: userPwd.value}

    const res = await api.post('/account', payload);
    const { token } = res.data;

    if (token) {
      // 1. 쿠키 저장
      Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });

      // 2. 브라우저가 쿠키를 인지할 아주 짧은 시간을 벌거나,
      // 혹은 로그를 찍어 확인 (필요시)
      console.log('토큰 저장 완료:', Cookies.get('token'));

      // 3. push 대신 replace를 사용하여 히스토리를 덮어쓰는 것이 로그인 시 더 깔끔함
      await router.replace({ name: 'Home' });
    }
  } catch(err) {
    console.error('Login Error:', err);
    alert('로그인에 실패했습니다.');
  }
};
</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(202, 202, 202);
  margin-bottom: 10px;
}
</style>
