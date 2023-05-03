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
import {Database, getDatabase, ref, remove, set} from "@angular/fire/database";
import {SpotifyService} from '../../../services/spotify.service';
import {SpotifyPlaylistResponse} from "../../spotify-elements/spotify.playlist.response";
import { Buffer } from 'buffer';
import {Router, RouterModule} from "@angular/router";
import {Hasher} from "../../../services/hasher";

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
  spotifyPlaylists: Map<string,PlaylistModel> = new Map<string, PlaylistModel>();
  has_spotify = false;

  public show = true;
  constructor(cdr:ChangeDetectorRef,private hasher:Hasher, private db:AngularFireDatabase, public spotify:SpotifyService,public router:Router){
    this.database = getDatabase(app);
  }
  addLink($event:any){
    let playlist:PlaylistModel = $event;
    console.log("in add link");
    const db_ref = ref(this.database, this.path + '/' + this.hasher.playlistHash(playlist));

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
              let hash = this.hasher.playlistHash(playlist);
              this.playlists.set(this.hasher.playlistHash(playlist),playlist)
            }
          }
        )
      }
    })
    let spotify_token = this.spotify.getAccessToken();
    console.log(this.spotify.access_token);
    if(this.spotify.access_token){
      this.has_spotify = true;

      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + spotify_token)

      let response = this.spotify.get<SpotifyPlaylistResponse>("https://api.spotify.com/v1/me/playlists?limit=50&offset=0").subscribe(data =>{
        console.log(data.items);
        for(let playlist of data.items){
          if(playlist.images![0]){
          playlist.image = playlist.images![0].url;}
          else{
            playlist.image = "assets/music note img.png"
          }
          this.spotifyPlaylists.set(playlist.id!,playlist);
        }
      })
    }
    console.log('initializing playlist home component')
    // while(!this.path){}



  }
  getEntries(){
    return Array.from(this.playlists.entries());
  }

  getSpotifyEntries() {
    return Array.from(this.spotifyPlaylists.entries());
  }

  remove(itemElement: string) {
    let confirmation = confirm("Delete this playlist?")
    if(confirmation) {
      this.playlists.delete(itemElement);
      let db_ref = ref(this.database, this.path + '/' + itemElement)
      remove(db_ref);
    }
  }
}
