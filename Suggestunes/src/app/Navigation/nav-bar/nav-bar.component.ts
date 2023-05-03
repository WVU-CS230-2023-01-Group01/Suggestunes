//@author Jackson Monk
import { Component, Input , OnInit} from '@angular/core';
import { getDatabase, get, ref, update, onValue, DatabaseReference } from '@firebase/database';
import { Router } from '@angular/router';
import { getAuth, User } from '@firebase/auth';

//This is the variable we will use to store the session user to avoid having to keep calling onAuthStateChanged. We will set this in ngOnInit.
var sessionUser: User;
import {app} from "../../app.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit{
  @Input() username: string;
  @Input() bio: string;

  constructor(private router:Router) {
    this.username = "";
    this.bio = "";
  }
  //Checking to see if the bio has been changed
  bioChanged(newBio: string): boolean {
    if (this.bio == newBio) {
      alert("Bio has not been changed");
      return false;
    }
    return true;
  }


  ngOnInit(): void {
    //When the page loads, check if the user is authenticated. If they are, load the data to the navbar
    var auth = getAuth(app);
    var database = getDatabase(app);
    auth.onAuthStateChanged((user) => {
      if (user) {
        sessionUser = user;
        var database_ref = ref(database, 'users/' + sessionUser.uid);
        onValue(database_ref, (snapshot) => {
          const data = snapshot.val();
          this.username = data.username;
          this.bio = data.bio;
        })
      }
    });
    
    var submitBio = document.getElementsByClassName("submit-bio")[0];
    var newBio = (document.getElementsByClassName("bioField")[0] as HTMLInputElement);
    var changeBio = false;
    submitBio.addEventListener('click', (e: Event) => {
      //Upon submitting the bio, if the user is logged in, check if the bio has changed. If it has, update the database with the new bio.
        if (sessionUser) {
          var database_ref = ref(database, 'users/' + sessionUser.uid);
          changeBio = this.bioChanged(newBio.value);
          if (changeBio) {
            this.bio = newBio.value;
            //change bio in the database
            var newData = {
              bio: newBio.value
            }
            update(database_ref, newData);
            alert("Changes saved!");
            (document.getElementsByClassName("btn-secondary")[0] as HTMLButtonElement).click();
          }
        }
        else {
          alert("Couldn't change bio");
        }
    });
  }

  callLogout() {
    //Confirm logout, check result of logout and redirect if true
    var confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
      var redirect = logout();
      if (redirect == true) {
        this.router.navigate(['/signin']);
      }
    }
  }
}

function logout() : boolean {
  //Get the current user if there is one and sign them out
  var auth = getAuth(app);
  console.log(auth.currentUser!.uid);
  if (auth.currentUser) {
    auth.signOut().then(() => {
      alert("User signed out");
      return true;
    }).catch((error) => {
      alert(error.message);
      return false;
    });
  }
  return true;
}
