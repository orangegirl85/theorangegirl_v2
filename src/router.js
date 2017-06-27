import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoList from './components/TodoList'
import Register from './components/Register'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: TodoList },
    { path: '/register', component: Register },
    { path: '*', redirect: '/' }
  ]
})

export default router
