// database/firebaseDb.js

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBP4BbOhVyrd-3H53C8E12dxRPHNaW_LeA",
    authDomain: "ronu-81a70.firebaseapp.com",
    databaseURL: "https://ronu-81a70.firebaseio.com",
    projectId: "ronu-81a70",
    storageBucket: "ronu-81a70.appspot.com",
    messagingSenderId: "373083665239",
    appId: "1:373083665239:web:0389ec88c08ab8522ac412",
    measurementId: "G-R1Z6F631D4"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;