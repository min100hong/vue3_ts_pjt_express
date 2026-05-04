<template>
  <div class="todo_list_group">
    <h3>{{ groupLabel[props.status] }}</h3>
    <hr>
    <div class="drag-container">
      <VueDraggableNext
        v-model="todoLists"
        item-key="id"
        @change="onListChange"
      >
        <template #item="{ element }">
          <div class="drag-item">
            {{ element.title }} {{ element.description }}
          </div>
        </template>
      </VueDraggableNext>
    </div>
    <div v-for="element in todoLists" :key="element.id" class="todo_item">
        {{element.title}} <span :style="{float: 'right', cursor: 'pointer'}" @click="delTodoByStatus(element)">X</span>
        <div>
          <span class="description">{{ element.description }}</span>
        </div>
    </div>


    <CreateTodo :status="props.status"/>
  </div>
</template>

<script setup lang="ts">
import { useTodostore } from '@/stores/useTodos';
import { TodoStatus } from '@/types/todoType';
import CreateTodo from './CreateTodo.vue';
import { VueDraggableNext } from 'vue-draggable-next';

interface Props {
  status: TodoStatus
}
const props = defineProps<Props>()

const { getTodoByStatus, delTodoByStatus } = useTodostore() // store action 함수를 구조분해 하여 사용하기

const todoLists = getTodoByStatus(props.status)

const groupLabel = {
  [TodoStatus.Pending]: "Pending",
  [TodoStatus.InProgress]: "InProgress",
  [TodoStatus.Completed]: "Completed"
}
// Handle changes
const onListChange = (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('List changed:', event)
}
</script>

<style scoped>
  .todo_list_group {
    border-radius: 5px;
    border: 1px solid gray;
    padding: 15px;
    background-color: cadetblue;

    width: 100%;

    min-height: 80vh;

    /* .todo_item {
      list-style: none;
      padding: 5px;
      background-color: aliceblue;
      cursor: pointer;
      margin-bottom: 5px;

      .description {
        font-size: 12px;
      }
    } */
    .drag-container {
      min-height: 200px;
      padding: 20px;
    }

    .drag-item {
      padding: 10px;
      margin: 5px 0;
      background: #f0f0f0;
      border-radius: 4px;
      cursor: move;
      transition: background 0.2s;
    }

    .drag-item:hover {
      background: #e0e0e0;
    }
  }
</style>
