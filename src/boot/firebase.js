import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCj1JNWTP9jFNDjmkDw_gcdFqQqlKbr5eY",
  authDomain: "lyst-b595f.firebaseapp.com",
  projectId: "lyst-b595f",
  storageBucket: "lyst-b595f.appspot.com",
  messagingSenderId: "468175159274",
  appId: "1:468175159274:web:8722831a65f09757dafc93"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()


export default db