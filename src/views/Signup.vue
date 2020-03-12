<template>
  <div class="signup">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">
        Signup
      </h2>
      <div class="field">
        <label for="email">Email:</label>
        <input v-model="email" type="email" name="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input v-model="password" type="password" name="password">
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input v-model="alias" type="text" name="alias">
      </div>
      <p v-if="feedback" class="red-text center">
        {{ feedback }}
      </p>
      <div class="field center">
        <button class="btn deep-purple">
          Signup
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import { db } from '@/firebase/config'
import firebase from 'firebase'
  export default {
    name: 'Signup',
    data() {
      return {
        email: null,
        password: null,
        alias: null,
        feedback: null,
        slug: null
      }
    },
    methods: {
      signup() {
        if (this.alias && this.email && this.password) {
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          let ref = db.collection("users").doc(this.slug)
          ref.get().then((doc) => {
            if (doc.exists) {
              this.feedback = 'This alias already exists'
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                ref.set({
                  alias: this.alias.toString(),
                  geolocation: null,
                  user_id: cred.user.uid
                })
              }).then(() => {
                this.$router.push({ name: 'GMap' })
              })
              .catch((err) => {
                this.feedback = err.message
              })
              this.feedback = 'This alias is free to use!'
            }
          }).catch()
        } else {
          this.feedback = "can't be empty!"
        }
      }
    },
  }
</script>

<style lang="css" scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>