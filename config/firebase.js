'use strict'

import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB9hO_EQE1Wftp0kwxukgfCgtraHfRMu-Q",
  authDomain: "ia-semester.firebaseapp.com",
  databaseURL: "https://ia-semester.firebaseio.com/",
  projectId: "ia-semester",
  storageBucket: "ia-semester.appspot.com",
  messagingSenderId: "485802238692"
})

const db = firebaseApp.database()

module.exports = {
  firebaseApp,
  db
}