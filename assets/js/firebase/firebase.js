// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_oMgsHdgVq8JcuIyXjJZPvZB8ALyzjqA",
    authDomain: "prueba-firebase-3e8b9.firebaseapp.com",
    projectId: "prueba-firebase-3e8b9",
    storageBucket: "prueba-firebase-3e8b9.appspot.com",
    messagingSenderId: "133253178675",
    appId: "1:133253178675:web:8024affc95b775c7758a46",
    measurementId: "G-8BK7M1JLGN"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

// Funciones del CRUD
export const createTask = (title, description) => addDoc(collection(db, "tasks"), {title, description});

export const getTask = id => getDoc(doc(db, "tasks", id));

export const updateTask = (id,newFields ) => updateDoc(doc(db, "tasks" , id), newFields);

export const onGetTask = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db, "tasks", id));