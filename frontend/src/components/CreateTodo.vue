<template>
  <div>
    <h3 v-if="!showForm" @click="showForm=!showForm">Add New</h3>
    <div v-else>
      <form @submit.prevent="setTodo">
        <div>
          <input type="text" placeholder="Title" v-model="newTodo.title" :style="{width: '100%'}">
        </div>
        <div>
          <textarea placeholder="Descriptioin" v-model="newTodo.description" :style="{width: '100%'}"></textarea>
        </div>
        <button type="submit">저장</button>
        <button type="button" @click="resetForm">취소</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodostore } from '@/stores/useTodos';
import { TodoStatus, type Todo } from '@/types/todoType';
import { reactive, ref } from 'vue';


interface Props {
  status: TodoStatus
}
const props = defineProps<Props>()
const showForm = ref(false)
const { setTodoByStatus } = useTodostore()

const newTodo = reactive<Omit<Todo, "id">>({
  title: '',
  description: '',
  status: props.status
})

const resetForm = () => {
  showForm.value = false
  newTodo.title = ''
  newTodo.description = ''
}

const setTodo = () => {
  setTodoByStatus({id: Math.random() * 1000000, ...newTodo})
  resetForm()
}

</script>

<style scoped>

</style>
