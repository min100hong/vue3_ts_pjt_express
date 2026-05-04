<template>
  <div>
    <h1>상품리스트 페이지</h1>
    <div class="product_list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
        @click="showProductDetail(product.id)"
      >
        <img :src="product.imageUrl" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}원</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/prodect';
import { useRouter } from 'vue-router';

const router = useRouter()

const products = ref<Product[]>([
  { id: 1, name: '상품 1', price: 10000, description: '상품 1 설명', imageUrl: '...' },
  { id: 2, name: '상품 2', price: 20000, description: '상품 2 설명', imageUrl: '...' },
]);

const showProductDetail = (id : number) => {
  router.push({name: 'ProductDetail', params: {id: id}})
}

</script>

<style scoped>
.product-item { cursor: pointer; border: 1px solid #ccc; margin: 10px; padding: 10px; }
</style>
