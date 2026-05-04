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
      <button type="submit" class="btn btn-primary" @click="userLogin">로그인</button>
    </form>
  </ModalLayout>
</template>

<script setup lang="ts">
// import type { Auth } from '@/types/account';
import axios from 'axios';
// import { useAuthStore } from '@/stores/account';
// import { ref, toRefs } from 'vue';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import ModalLayout from '@/components/modal/ModalLayout.vue';

const userId = ref<string | null>(null)
const userPwd = ref<string | null>(null)
// const auth = reactive<Auth>({ userId: '', userPwd: ''})
// const authStore = useAuthStore()
// const { user, isAuth } = toRefs(authStore)


const router = useRouter()
const userLogin = async () => {
  try {
    const payload = {id : userId.value, pw: userPwd.value}

    const res = await axios.post('/api/account', payload);

    const { token } = res.data;
    // 쿠키에 토큰 저장 (유효기간 1일 설정 예시)
    Cookies.set('token', token, { expires: 1, secure: true });

    // 로그인 성공 후 메인으로 이동
    router.push({name: 'Home'});

    // user.value = {userId: res.data.userId, userName: res.data.userName}
    // isAuth.value = true
  } catch(err) {
    alert(`API 호출 실패: ${err}`)
  }
}

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
