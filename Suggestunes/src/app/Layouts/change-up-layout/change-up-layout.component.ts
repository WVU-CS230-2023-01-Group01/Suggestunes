import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {app} from '../../app.component';
import { getDatabase, get, ref, update, onValue, DatabaseReference} from '@firebase/database';
import { getAuth, updatePassword } from '@firebase/auth';

@Component({
  selector: 'app-change-up-layout',
  templateUrl: './change-up-layout.component.html',
  styleUrls: ['./change-up-layout.component.css']
})

export class ChangeUpLayoutComponent implements OnInit{

  constructor(private router: Router) {

  }

  callSubmitUsername() {
    submitUsername();
    this.router.navigate(['/AccountLayout']);
  }

  callSubmitPassword() {
    submitPassword();
    this.router.navigate(['/AccountLayout']);
  }

  ngOnInit() {
    //Clear default text the first time one of the fields is clicked on
    for (var i = 0; i < textFields.length; i++) {

      textFields[i].addEventListener('click', function(e: Event) {
        if (e.target != null) {
          console.log(e.target);
          var element = e.target as HTMLInputElement;
          element.value = "";
        }
      }, {once:true});

    }
  }
}

  var textFields = document.getElementsByClassName("textField");
  var newUserField:string;

    //Functionality for the Change Username submit button
    function submitUsername() {

      var auth = getAuth(app);
      var database = getDatabase(app);
      var database_ref:DatabaseReference;
      auth.onAuthStateChanged( (user) => {
        if (user) {
          var userId = user.uid
          database_ref = ref(database, 'users/' + userId);

          newUserField = (<HTMLInputElement>document.getElementById("newUsername")).value;
          console.log(newUserField);
          if (newUserField == "") {
            alert("You cannot submit an empty username");
            return;
          }
          var confirmation = confirm("Are you sure you want to submit this new username? This will change your permanent username.");
          if (confirmation) {
            var newUsername = newUserField;
            //Change username in database
            var newData = {
              username: newUsername
            }
            update(database_ref, newData);
            alert("Username changed");
          }
        }
      });
    };

    //Functionality for the Change Password submit button
    function submitPassword() {
      var auth = getAuth(app);
      var password = (document.getElementsByClassName("textField")[1] as HTMLInputElement).value;
      var confirmPass = (document.getElementsByClassName("textField")[2] as HTMLInputElement).value;

      if (password != confirmPass) {
        alert("Password fields must match");
        return false;
      }

      var confirmation = confirm("Are you sure you want to submit this new password? This will change your permanent password");
      if (confirmation) {
        auth.onAuthStateChanged((user) => {
          if (user) {
            var newPass = password;
            updatePassword(user, newPass).then(() => {
              alert("Password changed succesfully");
              return true;
            }).catch(() => {
              alert("Something went wrong. Password could not be changed");
              return false;
            })
          }
        });
      }
      return false;
    }
