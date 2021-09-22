import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDDXxtUQI9Gz2GTWpRU9LEIDRt7H0Y6dDI",
    authDomain: "onlite-34daa.firebaseapp.com",
    databaseURL: "https://onlite-34daa.firebaseio.com" ,
    projectId: "onlite-34daa",
    storageBucket: "onlite-34daa.appspot.com",
    messagingSenderId: "679377621467",
    appId: "1:679377621467:web:deb1b1376fc60960e857fe"
  };

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()