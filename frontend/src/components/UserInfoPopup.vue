<template>
  <ModalLayout>
    <div class="header-area">
      <div class="title">User Info</div>
      <div class="btn-close" @click="handleClose"></div>
    </div>
    <div class="body-area">
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>홍길동</td>
          </tr>
          <tr>
            <td>부서</td>
            <td>MES그룹</td>
          </tr>
          <tr>
            <td>직급</td>
            <td>수석</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>hongGilDong@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer-area">
      <button class="btn btn-primary" @click="handleClose">Close</button>
    </div>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from './modal/ModalLayout.vue';

const emits = defineEmits(['close'])

const handleClose = () => {
  emits('close')
}
</script>

<style scoped>
.header-area {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(202, 202, 202);


  .title {
    font-size: 1.5em;
    font-weight: bold;
  }
  .btn-close {
    cursor: pointer;
  }
}
.body-area {
  padding: 15px;
}
.footer-area {
  padding-top: 10px;
  border-top: 1px solid rgb(202, 202, 202);
}
</style>
