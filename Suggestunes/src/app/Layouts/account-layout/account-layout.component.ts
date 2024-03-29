//@author Jackson Monk, Connor Herfurth

import { Component, Input, OnInit} from '@angular/core';
import { CardModel } from './card/card.model';
import { Router, RouterModule, Routes } from '@angular/router';
import { Buffer } from 'buffer';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {app} from "../../../environment/environment.prod";
import { getDatabase } from 'firebase/database';
import {PlaylistModel} from "../../playlists/playlist/playlist.model";
import {Observable} from "rxjs";

//Spotify Imports
import { getAuth, User } from '@firebase/auth';
import { ref, onValue} from '@firebase/database';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit{
  cards: CardModel[] = [];
  spotify_token : string|undefined

  constructor(private db:AngularFireDatabase, public spotify:SpotifyService, private router:Router) {
    var auth = getAuth(app);
    var database = getDatabase(app);
    //Get the current user if there is one
    auth.onAuthStateChanged((user) => {
      if (user) {
        //get and subscribe to the playlist data
        this.getPlaylistData(user).subscribe((items) => {
          //This will be a variable to keep track of the # of playlists displayed in the widget. This should not exceed 5.
          var playlistsDisplayed = 0;
          //loop through the data
          for (var item of items) {

            if (playlistsDisplayed < 5) {
              //creating an object with the data from each item
              var cardInst:CardModel = {
                img: item.payload.val()?.image ?? "assets/music note img.png",
                name: item.payload.val()?.name ?? "No Name",
                link: "playlists/playlist/false/" + item.key
              }
              //push the cards to the card list
              this.cards.push(cardInst);
              playlistsDisplayed++;
            }
            else break;
          }
        });
      }
    });
  }
  //making a request to get the list of the user playlists
  getPlaylistData(user:User) {
    return this.db.list<PlaylistModel>("users/" + user.uid + "/playlists").snapshotChanges();
  }

  //Generates a random string that can be used for the PKCE extension for Spotify.
  //Not currently used unless using PKCE is necessary.
  generateRandomString(length : any) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //Valid characters

    for(let i = 0; i < length; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //Generates the full code challenge for PKCE, including the code and the encoding.
  async generateCodeChallenge(codeVerifier: any) {
    function base64encode(string : any) {
      return Buffer.from(string).toString('base64');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  //Authenticates with the spotify program and receives a code, redirecting to the necessary page.
  //Is set up to be used with PKCE with minimal change in the code, although this option
  //is not currently used.
  async spotifyAuth() {
    const pkce = await this.generateCodeChallenge(this.generateRandomString(128));
    document.cookie = 'pkce=' + pkce;

    //Parameters for the GET request.
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
