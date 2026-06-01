import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqh01ZnK5GRVqaKp01QDMxkgOXJ2WZqrk",
  authDomain: "practicafirebase-312b2.firebaseapp.com",
  projectId: "practicafirebase-312b2",
  storageBucket: "practicafirebase-312b2.firebasestorage.app",
  messagingSenderId: "1082360825189",
  appId: "1:1082360825189:web:56f9cbdddc72c1f83b4d8c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };