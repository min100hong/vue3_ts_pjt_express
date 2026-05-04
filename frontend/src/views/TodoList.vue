<template>
  <div class="todo_list">
    <TodoListGroup :status="TodoStatus.Pending"/>
    <TodoListGroup :status="TodoStatus.InProgress"/>
    <TodoListGroup :status="TodoStatus.Completed"/>
  </div>
</template>

<script setup lang="ts">
import { TodoStatus } from '@/types/todoType';
import TodoListGroup from '@/components/TodoListGroup.vue';


</script>

<style scoped>
.todo_list {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px
}
</style>
