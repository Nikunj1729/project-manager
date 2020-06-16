import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAHvNnCsKwQbTyzb1Xc75DmyUt6gScVyOk",
  authDomain: "project-manager-6c4be.firebaseapp.com",
  databaseURL: "https://project-manager-6c4be.firebaseio.com",
  projectId: "project-manager-6c4be",
  storageBucket: "project-manager-6c4be.appspot.com",
  messagingSenderId: "484895120913",
  appId: "1:484895120913:web:ba2dc174d9a9f51b265bb0",
  measurementId: "G-55Y3DF3VQP",
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
