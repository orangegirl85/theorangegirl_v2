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
            <input name="email" v-model="store.form1.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors && errors.has('email') }" type='text'>
            <i v-show="errors && errors.has('email')" class="fa fa-warning"></i>
            <span v-show="errors && errors.has('email')" class="help is-danger">{{ errors && errors.first('email') }}</span>
          </div>
          <div class='field'>
            <label>Password</label>
            <input name="password" v-model="store.form1.password" type='password' v-validate="'required'" :class="{'input': true, 'is-danger': errors && errors.has('password') }">
            <i v-show="errors && errors.has('password')" class="fa fa-warning"></i>
            <span v-show="errors && errors.has('password')" class="help is-danger">{{ errors && errors.first('password') }}</span>
          </div>
          <div class='field'>
            <label>Confirm Password</label>
            <input name="password_confirmation" v-model="store.form1.confirm_password" type='password' v-validate="'required|confirmed:password'" data-vv-as="password" :class="{'input': true, 'is-danger': errors && errors.has('password_confirmation') }">
            <i v-show="errors && errors.has('password_confirmation')" class="fa fa-warning"></i>
            <span v-show="errors && errors.has('password_confirmation')" class="help is-danger">{{ errors && errors.first('password_confirmation') }}</span>
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
