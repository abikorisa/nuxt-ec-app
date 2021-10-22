import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBEPYiOEK5Y54uAnO7tCRCB9AHQdsVI2wo",
  authDomain: "nuxt-ec-app-64b0f.firebaseapp.com",
  projectId: "nuxt-ec-app-64b0f",
  storageBucket: "nuxt-ec-app-64b0f.appspot.com",
  messagingSenderId: "889675132486",
  appId: "1:889675132486:web:f3a3afc9ca1470a246e447"
};

firebase.initializeApp(config)

export default firebase;