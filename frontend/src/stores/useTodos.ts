import { TodoStatus, type Todo } from "@/types/todoType";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useTodostore = defineStore("todoList", () => {
  interface TodoStore {
    [TodoStatus.Pending]: Todo[],
    [TodoStatus.InProgress]: Todo[],
    [TodoStatus.Completed]: Todo[],
  }

  const defaultValue = {
    [TodoStatus.Pending]: [{
      id: 1,
      title: 'Vue3',
      description: 'Lecture1',
      status: TodoStatus.Pending
    }],
    [TodoStatus.InProgress]: [],
    [TodoStatus.Completed]: []
  }
  const todoLists = reactive<TodoStore>(defaultValue);

  const getTodoByStatus = (todoStatus: TodoStatus) => {
    return computed(() => todoLists[todoStatus])
  }

  const setTodoByStatus = (todo: Todo) => {
    todoLists[todo.status].push(todo)
  }

  const delTodoByStatus = (todoDelete: Todo) => {
    todoLists[todoDelete.status] = todoLists[todoDelete.status].filter((todo) =>
      todo.id !== todoDelete.id
    )
  }

  return {todoLists, getTodoByStatus, setTodoByStatus, delTodoByStatus}
})
