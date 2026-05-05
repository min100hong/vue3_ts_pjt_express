<template>
  <div>
    <ul>
      <li><router-link :to="{name: 'Intro'}" active-class="active">회사소개</router-link></li>
      <li><router-link :to="{name: 'Location'}" active-class="active">오시는길</router-link></li>
      <li><router-link :to="{name: 'History'}" active-class="active">회사연혁</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
  /* 1. 기본 스타일 초기화 */
  ul {
      list-style: none; /* 점 제거 */
      padding: 0;
      margin: 0;
      width: 100%; /* 메뉴 가로 폭 설정 */
      border: 1px solid #ccc;
  }

  /* 2. 리스트 항목 스타일 */
  li {
      border-bottom: 1px solid #eee; /* 구분선 */
  }

  /* 3. 링크 스타일 (핵심) */
  li a {
      display: block; /* a태그를 블록 형태로 만들어 전체 클릭 가능하게 함 */
      padding: 15px 20px;
      text-decoration: none; /* 밑줄 제거 */
      color: #333;
      background-color: #fff;
      transition: background 0.3s; /* 호버 효과 부드럽게 */
  }

  /* 4. 마우스 호버 효과 */
  li a:hover {
      background-color: #f4f4f4;
      color: #000;
  }

  /* 5. Active 효과 주기 */
  li a.active {
    font-weight: bold;
    color: #fff;
    background-color: #333;
  }
</style>
