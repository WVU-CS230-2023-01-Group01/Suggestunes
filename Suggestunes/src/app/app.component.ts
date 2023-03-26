import { Component } from '@angular/core';
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Suggestunes';
}
