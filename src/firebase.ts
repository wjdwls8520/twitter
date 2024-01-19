import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrkwKb7PrCkda81s4y_sYNHdg2og1Ka8M",
  authDomain: "yung-and-watch.firebaseapp.com",
  projectId: "yung-and-watch",
  storageBucket: "yung-and-watch.appspot.com",
  messagingSenderId: "921045589051",
  appId: "1:921045589051:web:b8461f4d9867825193901e",
  measurementId: "G-1M2ME9QGKC"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore (app);

