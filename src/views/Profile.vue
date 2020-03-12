<template>
  <div class="profile container">
    <div v-if="profile" class="card">
        <h3 class="deep-purple-text center">
            {{ profile.alias }}'s Wall
        </h3>
        <ul class="comments collection">
          <li v-for="(comment, index) in comments" :key="index">
            <div class="deep-purple-text">
              {{ comment.from }}
            </div>
            <div class="grey-text text-darken">
              {{ comment.content }}
            </div>
          </li>
        </ul>
        <form @submit.prevent="addComment">
          <label for="comment">Add a comment</label>
          <input v-model="newComment" name="comment" type="text">

          <p v-if="feedback" class="red-text center">
            {{ feedback }}
          </p>
        </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase/config'
import firebase from 'firebase'
  export default {
    name: 'Profile',
    data() {
      return {
        profile: null,
        newComment: null,
        feedback: null,
        user: null,
        comments: []
      }
    },
    methods: {
      addComment() {
        if (this.newComment) {
          this.feedback = null
          db.collection('comments').add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          }).then(() => {
            this.newComment = null
          })
        } else {
          this.feedback = 'Must enter a comment!'
        }
      }
    },
    created () {
      let ref = db.collection("users")
      // fetch logged in user
      ref.where('user_id', '==', firebase.auth().currentUser.uid)
      .get().then((snap) => {
        snap.forEach(doc => {
          this.user = doc.data()
          this.user.id = doc.id
        })
      })
      // profile data
      ref.doc(this.$route.params.id).get()
      .then((user) => {
        this.profile = user.data()
      })
      // comments
      db.collection('comments').where('to', '==', this.$route.params.id)
      .onSnapshot((snap) => {
        snap.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            })
          }
        })
      })
    },
  }
</script>

<style lang="css" scoped>
.profile {
  margin-top: 70px;
  padding: 10px;
}
.card {
  padding: 20px;
  margin-top: 60px;
}
h3 {
  font-size: 20pt;
  margin-top: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>