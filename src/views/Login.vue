<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">
        Login
      </h2>
      <div class="field">
        <label for="email">Email:</label>
        <input v-model="email" type="email" name="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input v-model="password" type="password" name="password">
      </div>
      <p v-if="feedback" class="red-text center">
        {{ feedback }}
      </p>
      <div class="field">
        <button class="btn deep-purple">
          login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login() {
        if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: 'GMap' })
          })
          .catch((err) => {
            this.feedback = err.message
          })
          this.feedback = null
        } else {
          this.feedback = 'Empty fields'
        }
      }
    },
  }
</script>

<style lang="css" scoped>
.login {
  min-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
</style>