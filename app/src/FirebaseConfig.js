import firebase from "firebase";

var Config = {
  apiKey: "AIzaSyDDcaZXi4rkb3bL5UV2wD3WLOxZ3kj0awQ",
  authDomain: "reallos-app-78a3a.firebaseapp.com",
  projectId: "reallos-app-78a3a",
  storageBucket: "reallos-app-78a3a.appspot.com",
  messagingSenderId: "495147096103",
  appId: "1:495147096103:web:b0a2798e97f5cc40365602",
  measurementId: "G-S2FRTFQLJM",
};
// Initialize Firebase
firebase.initializeApp(Config);
export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
