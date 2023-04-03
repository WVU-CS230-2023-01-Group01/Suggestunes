import {ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {PlaylistModel} from "../../playlists/playlist/playlist.model";
import {playlist_list} from "./playlists_list";
import {SongModel} from "../../playlists/playlist/song/song.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable()
@Component({
  selector: 'app-playlist-home-layout',
  templateUrl: './playlist-home-layout.component.html',
  styleUrls: ['./playlist-home-layout.component.css']
})
export class PlaylistHomeLayoutComponent {
  firebaseConfig = {
    apiKey: "AIzaSyAu0Y5ImYX-isiDYT7A3aIPjCIJeoM0yhw",
    authDomain: "suggestoons-app.firebaseapp.com",
    databaseURL: "https://suggestoons-app-default-rtdb.firebaseio.com",
    projectId: "suggestoons-app",
    storageBucket: "suggestoons-app.appspot.com",
    messagingSenderId: "241615938941",
    appId: "1:241615938941:web:4336c2b32cfa1c6a2f5814",
    measurementId: "G-EZ8HPMX0KB"
  };
  app = initializeApp(this.firebaseConfig);
  database = getDatabase(this.app);
  indexes:number[] = [
    1,
    2,
    3,
    4,
    5
  ];

  playlists:PlaylistModel[] = [];
  public show = true;
  constructor(private db:AngularFireDatabase,private cdr:ChangeDetectorRef){
    for(var playlist of playlist_list){
      console.log(playlist);
      this.playlists.push(playlist);
    }
  }
  addLink($event:any){
    let playlist:PlaylistModel = $event;
    console.log("in add link");
    this.playlists.push(playlist);
    this.reload();
    // this.database.app.list('https://suggestoons-app-default-rtdb.firebaseio.com/playlists.json').push(playlist)
  }
  reload(){
    console.log("reloading...");
    this.show = false;
    setTimeout(()=>this.show=true);
  }
}
