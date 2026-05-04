<template>
  <div class="company-layout">
    <div class="layout-lnb">
      <CompanyLNB />
    </div>
    <div class="layout-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompanyLNB from '@/components/menus/CompanyLNB.vue';


</script>

<style scoped>
  .company-layout {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 100vh;

    .layout-lnb {
      width: 20%;
    }

    .layout-content {
      width: 70%;
    }
  }
</style>
