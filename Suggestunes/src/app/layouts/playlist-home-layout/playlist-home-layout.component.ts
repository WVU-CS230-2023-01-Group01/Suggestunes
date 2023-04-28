import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {PlaylistModel} from "../../playlists/playlist/playlist.model";
import {playlist_list} from "./playlists_list";
import {SongModel} from "../../playlists/playlist/song/song.model";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

import {AngularFireDatabase, AngularFireDatabaseModule, PathReference} from "@angular/fire/compat/database";
import {Firestore} from "@angular/fire/firestore";
import {Reference} from "@angular/fire/compat/storage/interfaces";
import {app} from "../../app.component";
import {getAuth, initializeAuth} from "@angular/fire/auth";
import {Database, getDatabase, ref, set} from "@angular/fire/database";
import {SpotifyService} from '../../../services/spotify.service';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-playlist-home-layout',
  templateUrl: './playlist-home-layout.component.html',
  styleUrls: ['./playlist-home-layout.component.css']
})
export class PlaylistHomeLayoutComponent implements OnInit{
  auth = getAuth(app);
  database:Database;
  path: string | undefined;
  playlists: Map<string,PlaylistModel> = new Map<string, PlaylistModel>();
  has_spotify = false;
  public show = true;
  constructor(cdr:ChangeDetectorRef, private db:AngularFireDatabase, private http:HttpClient, private spotify:SpotifyService){
    this.database = getDatabase(app);
  }
  addLink($event:any){
    let playlist:PlaylistModel = $event;
    console.log("in add link");
    const db_ref = ref(this.database, this.path + '/' + this.getHash(playlist));

    set(db_ref, playlist);
    // this.db.list<PlaylistModel>(this.path!).push(playlist);
    this.reload();
  }
  reload(){
    console.log("reloading...");
    this.show = false;
    setTimeout(()=>this.show=true);
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.path = 'users/'+ user!.uid + '/playlists'
        const l = this.db.list<PlaylistModel>(this.path!).valueChanges().subscribe(

          data=>{
            console.log(data);
            console.log(data[0])
            for (let playlist of data) {
              console.log(playlist);
              let hash = this.getHash(playlist);
              this.playlists.set(this.getHash(playlist),playlist)
            }
          }
        )
      }
    })
    let spotify_token = this.spotify.getAccessToken();
    console.log(spotify_token);
    if(spotify_token){
      this.has_spotify = true;

      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + spotify_token)

      let response = this.http.get("https://api.spotify.com/v1/me/playlists?limit=50&offset=0",{'headers' : headers}).forEach((data)=>console.log(data));
      console.log(response)
    }
    console.log('initializing playlist home component')
    // while(!this.path){}



  }
  getEntries(){
    return Array.from(this.playlists.entries());
  }
  getHash(playlist:PlaylistModel){
    var p = 11;
    let message = playlist.name + playlist.description;
    var hash = 0;
    for(let i =0;i<message.length;i++){
      hash += message.charCodeAt(i)
    }
    return hash.toString(16);
  }

  getSpotifyEntries() {
    return undefined;
  }
}
