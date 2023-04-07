import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {PlaylistModel} from "../../playlists/playlist/playlist.model";
import {playlist_list} from "./playlists_list";
import {SongModel} from "../../playlists/playlist/song/song.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {AngularFireDatabase, AngularFireDatabaseModule, PathReference} from "@angular/fire/compat/database";
import {Firestore} from "@angular/fire/firestore";
import {Reference} from "@angular/fire/compat/storage/interfaces";


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-playlist-home-layout',
  templateUrl: './playlist-home-layout.component.html',
  styleUrls: ['./playlist-home-layout.component.css']
})
export class PlaylistHomeLayoutComponent implements OnInit{

  playlists: Map<number,PlaylistModel> = new Map<number, PlaylistModel>();
  public show = true;
  constructor(cdr:ChangeDetectorRef, private db:AngularFireDatabase, private http: HttpClient){

  }
  addLink($event:any){
    let playlist:PlaylistModel = $event;
    console.log("in add link");

    this.db.list<PlaylistModel>('playlists').push(playlist);
  }
  reload(){
    console.log("reloading...");
    this.show = false;
    setTimeout(()=>this.show=true);
  }

  ngOnInit(): void {
    const l = this.db.list<PlaylistModel>('playlists').valueChanges().subscribe(

      data=>{
        console.log(data);
        console.log(data[0])
        let i = 0;
        for (let playlist of data) {
          console.log(playlist);
          this.playlists.set(i++,playlist)
        }
      }
    )

  }
  getEntries(){
    return Array.from(this.playlists.entries());
  }
}
