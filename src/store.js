import Vue from 'vue'
import axios from 'axios'
import router from './router'

const store = {
  todos: null,
  form: {
    titleText: '',
    projectText: '',
    isCreating: false
  },
  form1: {
    email: '',
    password: '',
    isCreating: false
  }
}

const API = {
  fetchTodos () {
    if (store.todos) return
    axios.get(process.env.URL + 'api/categories')
      .then((res) => {
        store.todos = res.data
        console.log(store.todos)
      })
  },
  postTodo (postBody) {
    axios.post(process.env.URL + 'api/categories', postBody).then(response => router.go(router.currentRoute))
  },
  putTodo (id, putBody) {
    axios.put(process.env.URL + 'api/categories/' + id, putBody).then(response => router.go(router.currentRoute))
  },
  deleteTodo (id) {
    axios.delete(process.env.URL + 'api/categories/' + id).then(response => router.go(router.currentRoute))
  },
  register (postBody) {
    axios.post(process.env.URL + 'api/auth/register', postBody).then(response => router.go(router.currentRoute))
  }
}

Vue.mixin({
  data () {
    return {
      store
    }
  },
  computed: {
    API () {
      return API
    }
  }
})

export default store
