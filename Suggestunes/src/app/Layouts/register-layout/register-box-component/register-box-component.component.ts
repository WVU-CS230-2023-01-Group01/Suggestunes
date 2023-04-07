import { Component } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { getDatabase, ref, set } from '@firebase/database'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-box-component',
  templateUrl: './register-box-component.component.html',
  styleUrls: ['./register-box-component.component.css']
})
export class RegisterBoxComponentComponent {

  constructor(private _router: Router) { }

  public callRegister() {
    register(this._router)
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

function register(_router: Router) {
  // Getting input fields
  var email = (<HTMLInputElement>document.getElementById("email")).value
  var username = (<HTMLInputElement>document.getElementById("username")).value
  var password = (<HTMLInputElement>document.getElementById("password")).value
  var confirm_password = (<HTMLInputElement>document.getElementById("confirm_password")).value

  // Validate input fields
  if (validate_email(email) == false) {
    alert('Email is not valid.')
    return
  }
  if (validate_password(password) == false) {
    alert('Password must be greater than 6 characters.')
    return
  }
  if (validate_passwords(password, confirm_password) == false) {
    alert('Passwords must match.')
    return
  }

  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then(function () {

      var user = auth.currentUser

      // Add user to database
      var database_ref = ref(database, 'users/' + user!.uid)

      // Create user data
      var user_data = {
        email: email,
        username: username,
        last_login: Date.now(),
        bio: "No bio"
      }

      set(database_ref, user_data)

      alert('User Created!')

      _router.navigate(['signin'])
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errrors
      var error_code = error.code
      var error_message = error.message
      alert(error_message)
      return
    })
}

function validate_email(email: string) {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Not an email
    return false
  }
}

function validate_password(password: string) {
  // for now only checks if password is > 6 characters, can add validation if needed
  if (password.length < 6) {
    return false
  } else {
    return true
  }
}

function validate_passwords(password: string, confirm_password: string) {
  if (password == confirm_password) {
    return true
  } else {
    return false
  }
}

export { app } 
