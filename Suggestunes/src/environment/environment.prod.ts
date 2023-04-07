export const environment = {
  production : true
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu0Y5ImYX-isiDYT7A3aIPjCIJeoM0yhw",
  authDomain: "suggestoons-app.firebaseapp.com",
  databaseURL: "https://suggestoons-app-default-rtdb.firebaseio.com",
  projectId: "suggestoons-app",
  storageBucket: "suggestoons-app.appspot.com",
  messagingSenderId: "241615938941",
  appId: "1:241615938941:web:4336c2b32cfa1c6a2f5814",
  measurementId: "G-EZ8HPMX0KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
