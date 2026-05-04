<template>
  <div class="modal-layout">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-layout {
  position: fixed; /* 화면 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  z-index: 1000; /* 상위 레이어 */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* 크기는 콘텐츠에 맞게 설정하거나 고정 */
  width: 500px;
  max-width: 90%;
}
</style>
