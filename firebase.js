// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPWWriz4BvGDgn4aZheGAzKWl4Nx_C2XY",
  authDomain: "instagram-clone-6b033.firebaseapp.com",
  projectId: "instagram-clone-6b033",
  storageBucket: "instagram-clone-6b033.appspot.com",
  messagingSenderId: "760224874345",
  appId: "1:760224874345:web:a908c49bbad50d0db1c7f8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db= getFirestore();
const storage= getStorage();

export { app, db, storage };