import firebase from "firebase/app";
import "firebase/auth";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAztyX9X8RCjhh518TOyTsYiCSeChi59F8",
    authDomain: "ecom-42b8b.firebaseapp.com",
    projectId: "ecom-42b8b",
    storageBucket: "ecom-42b8b.appspot.com",
    messagingSenderId: "859355654557",
    appId: "1:859355654557:web:748706b812176c9e18a774"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  export const auth = firebase.auth();

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();