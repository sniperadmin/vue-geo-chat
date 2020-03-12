<template>
  <div class="map">
    <h2>Map</h2>
    <div id="map" class="google-map"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebase/config'
  export default {
    name: 'GMap',
    data() {
      return {
        lat: 53,
        lng: -2
      }
    },
    methods: {
      renderMap() {
        // eslint-disable-next-line no-undef
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: this.lat, lng: this.lng },
          zoom: 6,
          maxZoom: 15,
          minZoom: 3,
          streetViewControl: false
        })
        db.collection("users").get()
        .then((users) => {
          users.docs.forEach(doc => {
            let data = doc.data()
            if (data.geolocation) {
              // eslint-disable-next-line no-undef
              const marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              })
              // add click event
              marker.addListener('click', () => {
                this.$router.push({ name: 'Profile', params: { id: doc.id } })
              })
            }
          })
        })
      },
    },
    mounted () {
      let user = firebase.auth().currentUser

      // get user geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude

          // find user record
          db.collection("users").where('user_id', '==', user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).update({
                geolocation: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              })
            })
          })
          this.renderMap()
        }, () => {
          this.renderMap()
        }, { maximumAge: 60000, timeout: 3000 })
      } else {
        // center position
        this.renderMap()
      }
    },
  }
</script>

<style lang="css" scoped>
  .google-map {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: -1;
  }
</style>