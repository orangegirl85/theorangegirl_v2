<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js TheOrangegirl App</h1>
    <router-link to="/" class="ui button">Home</router-link>
    <router-link to="/register" class="ui button">Register</router-link>
    <router-view></router-view>
    <div class='ui three column centered grid'>
      <div class='column'>
        <todo-list v-bind:todos="store.todos"></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script>
// import sweetalert from 'sweetalert'
import Register from './components/Register.vue'
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'
// import axios from 'axios'

export default {
  name: 'app',
  components: {
    Register,
    TodoList,
    CreateTodo
  },
  created () {
    this.API.fetchTodos()
  },
  methods: {
    createTodo (newTodo) {
      // this.todos.push(newTodo)
      window.sweetAlert('Success!', 'To-Do created!', 'success')
    }
  }
}
</script>
