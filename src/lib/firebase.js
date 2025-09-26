import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6_UBb3-rQdBuHoKUNDodXBK2trkeguFU",
  authDomain: "bikemarket-4696c.firebaseapp.com",
  projectId: "bikemarket-4696c",
  storageBucket: "bikemarket-4696c.appspot.com",
  messagingSenderId: "248367749293",
  appId: "1:248367749293:web:73208952816e7baaefce24",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);   // 👈 Ny
