<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button' v-on:click="openFormRegister">
      Register
    </button>
    <div class='ui centered card' v-show="store.form1.isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Email</label>
            <input v-model="store.form1.email" type='text'>
          </div>
          <div class='field'>
            <label>Password</label>
            <input v-model="store.form1.password" type='password'>
          </div>
          <div class='field'>
            <label>Password</label>
            <input v-model="store.form1.confirm_password" type='password'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openFormRegister () {
      this.store.form1.isCreating = true
    },
    closeForm () {
      this.store.form1.isCreating = false
    },
    sendForm () {
      if (this.store.form1.email.length > 0 && this.store.form1.password.length > 0) {
        const email = this.store.form1.email
        const password = this.store.form1.password
        this.API.register({email, password})
        // this.$emit('create-todo', {
          // title,
          // project,
          // done: false
        // })
        this.store.form1.email = ''
        this.store.form1.password = ''
        this.store.form1.isCreating = false
      }
    }
  }
}
</script>
