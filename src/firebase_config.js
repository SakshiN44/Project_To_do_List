import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBjC8bNJzBBv2Snntcn2Ri4qCAMFUhd7lk",
    authDomain: "project-todolist-bdb6c.firebaseapp.com",
    projectId: "project-todolist-bdb6c",
    storageBucket: "project-todolist-bdb6c.appspot.com",
    messagingSenderId: "119038211229",
    appId: "1:119038211229:web:c99b8312f44d4d25d99074"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export {db};