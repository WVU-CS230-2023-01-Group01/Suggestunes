import { Component, Input, OnInit } from '@angular/core';
import { database, app } from '../../login-box-component/login-box-component.component';
import { getAuth } from '@firebase/auth';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-spotify-auth-layout',
  templateUrl: './spotify-auth-layout.component.html',
  styleUrls: ['./spotify-auth-layout.component.css']
})
export class SpotifyAuthLayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router : Router) {
  };

  getCookie(cName : any) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }

  //Checking to see if a user exists
  ngOnInit(): void {
    let tokenCode = '';
    this.route.queryParams.subscribe(params => {
      tokenCode = params['code'];
    });

    console.log('https://us-central1-suggestoons-app.cloudfunctions.net/getTokens?code=' + tokenCode)

    const response = fetch('https://us-central1-suggestoons-app.cloudfunctions.net/getTokens?code=' + tokenCode, {
                            method: 'GET'
    }).then(response => {
      if(!response.ok) {
        console.log(response);
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      document.cookie = "access_token=" + data.access_token;

      this.router.navigate(['account']);
    })
  }
}