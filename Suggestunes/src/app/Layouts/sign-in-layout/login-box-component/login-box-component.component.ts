import { Component } from '@angular/core';
import { signInWithEmailAndPassword, signOut, getAuth } from '@firebase/auth';
import { getDatabase, ref, update, onValue } from '@firebase/database'
import { Router } from '@angular/router';
import {app} from "../../../app.component";

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


// const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)



// export { app , database}

function login(_router : Router){
  var email = (<HTMLInputElement>document.getElementById("email")).value
  var password = (<HTMLInputElement>document.getElementById("password")).value
  var result:boolean = true;

  signInWithEmailAndPassword(auth, email, password)
  .then(function () {
     var user = auth.currentUser

      var database_ref = ref(database, 'users/' + user!.uid)

      // Create user data
      var user_data = {
        last_login: Date.now()
      }

      update(database_ref, user_data)

      console.log(auth.currentUser!.uid);
      _router.navigate(['/AccountLayout'])


      return true
    })
    .catch(function (error) {
      var error_code = error.code
      var error_message = error.message

      alert(error_message)

    })
}
