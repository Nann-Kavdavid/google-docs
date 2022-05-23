import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_xDnKFbyNjsx2tMh10HfURsapDGd4YxI",
  authDomain: "docs-33b7e.firebaseapp.com",
  projectId: "docs-33b7e",
  storageBucket: "docs-33b7e.appspot.com",
  messagingSenderId: "95885496925",
  appId: "1:95885496925:web:bb73fef67b1b704d8173b4"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);