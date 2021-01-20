import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCuwvam48Ed_oK4CshxpCNBQwnXdEjsOmo",
    authDomain: "wireless-library-210ab.firebaseapp.com",
    projectId: "wireless-library-210ab",
    storageBucket: "wireless-library-210ab.appspot.com",
    messagingSenderId: "815015381004",
    appId: "1:815015381004:web:8b94d440ac7db22ee94629"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();