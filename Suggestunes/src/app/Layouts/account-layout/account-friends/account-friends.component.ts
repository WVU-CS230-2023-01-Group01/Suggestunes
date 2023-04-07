import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-friends',
  templateUrl: './account-friends.component.html',
  styleUrls: ['./account-friends.component.css']
})
export class AccountFriendsComponent {
  @Input() friendName: string;

  constructor() {
    this.friendName = "Unnamed Friend";
  }
}
