<template>
  <div class="content">
    <div v-if="isLogin" class="header">
      <div class="user_info">
        <span>{{ loginInfo.userName }}님 안녕하세요.</span>
        <span @click="userLogout" class="user_logout">로그아웃</span>
      </div>
      <RouterView />
    </div>
    <div class="login" v-else>
      <div>Login</div>
      <hr>
      <form @submit.prevent="userLogin()">
        <label for="loginId">
          <span>아이디</span>
          <input
            type="text"
            id="loginId"
            v-model="account.userId"
            placeholder="아이디를 입력하세요"
            required
          >
        </label>
        <label for="loginPwd">
          <span>비밀번호</span>
          <input
            type="password"
            id="loginPwd"
            v-model="account.userPwd"
            placeholder="비밀번호를 입력하세요"
            required
          >
        </label>
        <button type="submit" class="loginBtn">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import api from '@/api'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

interface Account {
  userId: string,
  userPwd: string,
  userName?: string
}


const isLogin = ref<boolean>(false)
// const account = reactive<Account>({ userId: '', userName: '' })
const account = ref<Account>({ userId: '', userPwd: '' })
const loginInfo = reactive<Account>({ userId: '', userPwd: '' })

const userLogin = async () => {
  try {
    const payload = {id :account.value.userId, pw: account.value.userPwd}

    const res = await axios.post('/api/account', payload);
    if(res.data.status === 200) {
      // account.value = {...account.value, ...res.data}
      loginInfo.userId = res.data.userId
      loginInfo.userName = res.data.userName
      isLogin.value = true
      alert("로그인 성공")
    } else {
      alert(`로그인 실패 : ${res.data.message}`)
    }
  } catch(err) {
    alert(`API 호출 실패: ${err}`)
  }
}

const userLogout = async () => {
  try {
    await axios.delete('/api/delete')
    alert("로그아웃 되었습니다.")
    // Object.assign(account, response.data) // reactive로 선언시 변경 방법
      account.value.userId = ''
      account.value.userName = ''
      account.value.userPwd = ''
      // account.value = {...account.value, ...res.data}  // ref로 선언시 변경 방법(빈번하게 교체할때)
    isLogin.value = false
  } catch (error) {
    alert(`API 호출 실패: ${error}`)
  }
  isLogin.value = false
}

const fetchUser = async () => {
  try {
    // 실제 경로는 '/api/account' 이지만
    // Vite 프록시 설정에 의해 'http://localhost:3000 전달됨
    const res = await axios.get('/api/account')
    if(res.data.status === 200) {
      isLogin.value = true
    } else {
      isLogin.value = false
    }
  } catch (error) {
    alert(`API 호출 에러: ${error}`);
  }
};

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
  .content {
    display: flex;
    justify-content: center;

    width: 100%;

    .header {
      width: 100%;
      .user_info {
        float: right;

        .user_logout {
          padding-left: 20px;
          font-weight: bold;
          cursor: pointer;
          color: blue;
        }
      }
    }

    .login {
      border: 1px solid gray;
      border-radius: 10px;
      padding: 20px;

      label {
        display: flex;
        justify-content: space-between;

        width: 100%;
        margin-bottom: 5px;
        input {
          margin-left: 10px;
        }
      }
      .loginBtn {
        width: 100%;
      }
    }

}
</style>
