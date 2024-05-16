import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkOMHNMffBq5gi4F88Ogu1Mxu7f0Xq-6E",
  authDomain: "auth-react-3cbcf.firebaseapp.com",
  projectId: "auth-react-3cbcf",
  storageBucket: "auth-react-3cbcf.appspot.com",
  messagingSenderId: "469539656163",
  appId: "1:469539656163:web:3d41827af07c18d7fbd0d6",
  measurementId: "G-3GMNN373BC",
  databaseURL: "https://auth-react-3cbcf-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);