<template>
  <div>
    <div class="product-header">
      <span class="go-back" @click="goBack">이전페이지</span>
      <h1>상품상세 페이지</h1>
    </div>
    <p>상품 : {{ $route.params }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.product-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;

  .go-back {
    cursor: pointer;
    margin-right: 20px;
    :hover {
      font-weight: bold;
      color: blue;
    }
  }
}
</style>
