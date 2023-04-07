import { Component, Input , OnInit} from '@angular/core';
import { database, app } from '../../login-box-component/login-box-component.component';
import { getDatabase, get, ref, update, onValue, DatabaseReference } from '@firebase/database';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';

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

  bioChanged(newBio: string): boolean {
    if (this.bio == newBio) {
      alert("Bio has not been changed");
      return false;
    }
    return true;
  }

  
  ngOnInit(): void {
    var auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid;
        var database_ref = ref(database, 'users/' + userId);
        onValue(database_ref, (snapshot) => {
          const data = snapshot.val();
          this.username = data.username;
          this.bio = data.bio;
        })
      }
      //else {
       // alert("Couldn't load nav data");
      //}
    });

    var submitBio = document.getElementsByClassName("submit-bio")[0];
    var newBio = (document.getElementsByClassName("bioField")[0] as HTMLInputElement);
    var changeBio = false;
    submitBio.addEventListener('click', (e:Event) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          var userId = user.uid;
          var database_ref = ref(database, 'users/' + userId);
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
    });
  }

  callLogout() {
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
