import { Component } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { signInWithEmailAndPassword, signOut, getAuth } from '@firebase/auth';
import { getDatabase, ref, update, onValue } from '@firebase/database'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box-component',
  templateUrl: './login-box-component.component.html',
  styleUrls: ['./login-box-component.component.css']
})
export class LoginBoxComponentComponent {

  constructor(private _router: Router) { }

  callLogin(){
    login(this._router)
  }
}

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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)

export { app }

function login(_router : Router){
  var email = (<HTMLInputElement>document.getElementById("email")).value
  var password = (<HTMLInputElement>document.getElementById("password")).value

  signInWithEmailAndPassword(auth, email, password)
  .then(function () { 
     var user = auth.currentUser

      var database_ref = ref(database, 'users/' + user!.uid)

      // Create user data
      var user_data = {
        last_login: Date.now()
      }

      update(database_ref, user_data)
      
      _router.navigate(['/AccountLayout'])

      return true
    })
    .catch(function (error) {
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    }) 
}