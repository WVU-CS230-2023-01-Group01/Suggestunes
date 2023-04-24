import { Component, OnInit } from '@angular/core';
//Further imports are for testing purposes, can be deleted during merge
import { getAuth } from '@firebase/auth';
import { onValue, ref } from '@firebase/database';
import { database, app } from '../../login-box-component/login-box-component.component';

@Component({
  selector: 'app-sign-in-layout',
  templateUrl: './sign-in-layout.component.html',
  styleUrls: ['./sign-in-layout.component.css']
})
export class SignInLayoutComponent{
  constructor() {

  }
}