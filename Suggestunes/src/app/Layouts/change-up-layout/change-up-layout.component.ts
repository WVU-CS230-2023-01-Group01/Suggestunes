import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-change-up-layout',
  templateUrl: './change-up-layout.component.html',
  styleUrls: ['./change-up-layout.component.css']
})

export class ChangeUpLayoutComponent implements OnInit{

  textFields = document.getElementsByClassName("textField");
  submitButtons = document.getElementsByClassName("submitButton");

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    //Clear default text the first time one of the fields is clicked on
    for (var i = 0; i < this.textFields.length; i++) {

      this.textFields[i].addEventListener('click', function(e: Event) {
        if (e.target != null) {
          console.log(e.target);
          var element = e.target as HTMLInputElement;
          element.value = "";
        }
      }, {once:true});

    }

    //Functionality for the Change Username submit button
    var newUserField = this.textFields[0];

    this.submitButtons[0].addEventListener('click', function(e: Event) {

      if ((newUserField as HTMLInputElement).value == "") {
        alert("You cannot submit an empty username");
        return;
      }
      var confirmation = confirm("Are you sure you want to submit this new username? This will change your permanent username.");
      if (confirmation) {
        var newUsername = (newUserField as HTMLInputElement).value;
        //get list of existing usernames and search through comparing them with newUsername
        //if newUsername already exists in the database, alert the user and quit
        //otherwise, replace the username associated with this account with newUsername
      }
    });

    //Functionality for the Change Password submit button
    var newPassField = this.textFields[1];
    var confirmNewPassField = this.textFields[2];
    this.submitButtons[1].addEventListener('click', function(e: Event) {

      var newPass = (newPassField as HTMLInputElement);
      var confirmNewPass = (confirmNewPassField as HTMLInputElement);
      if (newPass.value == "" || confirmNewPass.value == "") {
        alert("Please fill out both fields");
        return;
      }
      if (newPass.value != confirmNewPass.value) {
        alert("Password and Confirm Password fields must match (case sensitive)");
        return;
      }
      var confirmation = confirm("Are you sure you want to submit this new password? This will change your permanent password.");
      //encrypt newPass in the same way all other passwords are encrypted
      //replace the current password associated with this account with newPass
    });

  }
}