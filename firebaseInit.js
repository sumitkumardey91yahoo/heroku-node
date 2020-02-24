// import firebase from '@firebase/app';
// import '@firebase/firestore'
const firebase = require('@firebase/app').default;
require('@firebase/firestore');

const firebaseConfig  = require('./firebaseConfig')
const firebaseApp = firebase.initializeApp(firebaseConfig)
module.exports  = firebaseApp.firestore()