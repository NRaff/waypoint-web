// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKP-E_9bTor6jtCbG3IIDbZ-KnSsr70LY",
  authDomain: "waypoint-982e4.firebaseapp.com",
  projectId: "waypoint-982e4",
  storageBucket: "waypoint-982e4.appspot.com",
  messagingSenderId: "1066285797241",
  appId: "1:1066285797241:web:b4c059fdf3f81b558ae9a8",
  measurementId: "G-L2W9Y0N6C5"
};

export function setupFirebase() {
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);