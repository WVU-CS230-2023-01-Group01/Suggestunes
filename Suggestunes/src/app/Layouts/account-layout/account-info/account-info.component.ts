import { Component, Input, OnInit } from '@angular/core';
import { database, app } from '../../../login-box-component/login-box-component.component';
import { getDatabase, get, ref, update, onValue, DatabaseReference } from '@firebase/database';
import { getAuth } from '@firebase/auth';


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit{
  @Input() username: string;
  @Input() favGenres: string[];
  @Input() bio: string;

  constructor() {
    this.favGenres = [];
    this.favGenres.push("Rock");
    this.favGenres.push(" Hip-Hop");
    this.favGenres.push(" Alternative Rock");
    this.username = "";
    this.bio = "";

  }

ngOnInit(): void {
  var auth = getAuth(app);
  //onAuthStateChanged fires when user logs in or out
  auth.onAuthStateChanged((user) => {
    //if user, then user is logged in
    if (user) {
      var userId = user.uid;
      var database_ref = ref(database, 'users/' + userId);
      //onValue obtains data from the specified database reference via a snapshot
      onValue(database_ref, (snapshot) => {
        const data = snapshot.val();
        this.bio = data.bio;
        this.username = data.username;
      })
    }
  });
}
}

