import { Component } from '@angular/core';
import {initializeApp} from "firebase/app";
import {environment} from "../environment/environment";
import {getAnalytics} from "firebase/analytics";
import {initializeAuth} from "@angular/fire/auth";
import {getDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Suggestunes';
}
const app = initializeApp(environment.firebase);

// const analytics = getAnalytics(app)
//
// const auth = initializeAuth(app)
//
// const database = getDatabase(app)

export {app}
