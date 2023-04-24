import { Component } from '@angular/core';
import { sendPasswordResetEmail, getAuth } from "firebase/auth"
import {app} from "../../app.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private _router: Router) { }

  public CallResetPassword(){
    ResetPassword(this._router)
  }
}

const auth = getAuth(app)

function ResetPassword(_router: Router){
 console.log('Resetting Password')
  var email = (<HTMLInputElement>document.getElementById("passwordReset")).value
  sendPasswordResetEmail(auth, email)
  .then(function(){
    alert('Check your email! We sent you a password reset message.')
    _router.navigate(['signin'])
  })
  .catch(function (error) {
    // Firebase will use this to alert of its errrors
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
  })

}
