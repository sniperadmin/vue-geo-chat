import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
// wait for fb auth to emit before rendering
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {  
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})