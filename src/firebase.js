// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración que te dio Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBndMhwUIz3VkiLWV0OlUcLBqCrNu9yM14",
  authDomain: "cine-classic-app.firebaseapp.com",
  projectId: "cine-classic-app",
  storageBucket: "cine-classic-app.appspot.com",
  messagingSenderId: "387956710366",
  appId: "1:387956710366:web:113f5d7d47aace6bb09b4f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Inicializa Auth
export const auth = getAuth(app);
