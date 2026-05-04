<template>
  <div>
    <!-- <h1>Funny Vue3</h1>
    <div class="user_info">
      <span>{{ account.userName }}님 안녕하세요.</span>
      <span @click="userLogout" class="user_logout">로그아웃</span>
    </div> -->
    <div class="p-3 mb-2 bg-black text-white">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col-2 text-center text-white">
          <h2><RouterLink class="logo" to="/">Funny Vue3</RouterLink></h2>
        </div>
        <div class="col-10 d-flex justify-content-end align-items-center">
            <span class="user" @click="handleOpenPopup">{{ user.userName }}</span><span>님 안녕하세요.</span>
            <button type="button" class="btn btn-dark" @click="userLogout">로그아웃</button>
        </div>
      </div>
    </div>
    <div class="nav-scroller py-1 mb-3 ms-5 me-5 border-bottom top-menu">
      <nav class="nav nav-underline justify-content-between">
        <RouterLink class="nav-item nav-link link-body-emphasis" :to="{name: 'Todo'}" active-class="active">Todo</RouterLink>
        <RouterLink class="nav-item nav-link link-body-emphasis" to="/company" active-class="active">LNB (중첩라우팅)</RouterLink>
        <RouterLink class="nav-item nav-link link-body-emphasis" to="/user" active-class="active">User Info</RouterLink>
        <RouterLink class="nav-item nav-link link-body-emphasis" to="/products" active-class="active">상품</RouterLink>
      </nav>
    </div>
    <div v-if="isOpenUserPopup">
      <UserInfoPopup @close="handleClose"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/account';
import { ref, toRefs } from 'vue';
import UserInfoPopup from '../UserInfoPopup.vue';

const isOpenUserPopup = ref(false);

const authStore = useAuthStore()
const { user } = toRefs(authStore)
user.value.userName = 'Default User'

const userLogout = async () => {
  authStore.logout()
}

const handleOpenPopup = () => isOpenUserPopup.value = true
const handleClose = () => isOpenUserPopup.value = false
</script>

<style scoped>
  .logo {
    color: #fff !important;
    font-weight: bold;
    text-decoration: none !important;
    cursor: pointer;
  }
  .user {
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
  .btn {
    margin-left: 15px;
  }
</style>
