import firebase from 'firebase'
// import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsXgeDWX74CAv_Je1uuYonVeYj9373x5U",
  authDomain: "vue-geo-chat-25fbf.firebaseapp.com",
  databaseURL: "https://vue-geo-chat-25fbf.firebaseio.com",
  projectId: "vue-geo-chat-25fbf",
  storageBucket: "vue-geo-chat-25fbf.appspot.com",
  messagingSenderId: "243332225343",
  appId: "1:243332225343:web:5915f141d06fca2bfb1b8a",
  measurementId: "G-BW182YYQFZ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebaseApp.firestore()