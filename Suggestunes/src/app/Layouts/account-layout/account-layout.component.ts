import { Component, Input, OnInit} from '@angular/core';
import { ProductModel } from './account-layout.component.product_model';
import {mock_friends_list} from './account-layout.component.mock_friends_list';
import { mock_list } from './card/mock_list';
import { CardModel } from './card/card.model';
import { Router, RouterModule, Routes } from '@angular/router';
import { Buffer } from 'buffer';

//Spotify Imports
import { getAuth } from '@firebase/auth';
import { ref, onValue} from '@firebase/database';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit{
  products: ProductModel[] = [];
  cards: CardModel [] = [];
  spotify_token : string|undefined

  constructor( private router: Router, private spotify:SpotifyService) {
    for (var product of mock_friends_list) {
      this.products.push(product);
    }

    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
    //need to be able to determine which user logs in
    //need to be able to update account elements to reflect the currently logged in user
    //need to be able to warn user that they will be logged out if they try to manually go to certain pages

  }

  generateRandomString(length : any) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < length; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: any) {
    function base64encode(string : any) {
      return Buffer.from(string).toString('base64');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  async spotifyAuth() {
    const pkce = await this.generateCodeChallenge(this.generateRandomString(128));
    document.cookie = 'pkce=' + pkce;

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: 'a183b7596de144229a97c4e6fae8d8eb',
      scope: 'user-read-private,user-modify-playback-state,user-read-playback-state,playlist-modify-public,playlist-modify-private',
      redirect_uri: 'https://suggestoons-app.web.app/spotify-auth',
    });

    window.location.href = 'https://accounts.spotify.com/authorize?' + args;
  }

  ngOnInit(): void {
    this.spotify_token = this.spotify.access_token;
  }
}
