import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB16pKTtXEXJZcZSRUfYCr_dDmDDns0s90",
  authDomain: "coup-3bcbc.firebaseapp.com",
  projectId: "coup-3bcbc",
  storageBucket: "coup-3bcbc.appspot.com",
  messagingSenderId: "1069937951864",
  appId: "1:1069937951864:web:2955e151b0821bbc82998d",
  measurementId: "G-NRXG3W8NX3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
