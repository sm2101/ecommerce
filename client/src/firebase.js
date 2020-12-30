import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBlyqYq22gjZXbJIvlNu796D1LjLvh1v-4",
    authDomain: "aura-26.firebaseapp.com",
    projectId: "aura-26",
    storageBucket: "aura-26.appspot.com",
    messagingSenderId: "681094918831",
    appId: "1:681094918831:web:e298f9cd90b1f4ac735a5a"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }



  export const auth = firebase.auth();

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();