<template>
  <div class="navbar">
    <nav class="deep-purple darke">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="brand-logo left">
          GeoChatty!
        </router-link>
        <ul class="right">
          <li v-if="!$route.meta.requiresAuth">
            <router-link :to="{ name: 'Signup' }">signup</router-link>
          </li>
          <li v-if="!$route.meta.requiresAuth">
            <router-link :to="{ name: 'Login' }">login</router-link>
          </li>
          <li v-if="$route.meta.requiresAuth">
            <a @click="logout">logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
    name: 'Navbar',
    methods: {
      logout () {
        firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
      }
    },
  }
</script>

<style lang="css" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  
}
</style>