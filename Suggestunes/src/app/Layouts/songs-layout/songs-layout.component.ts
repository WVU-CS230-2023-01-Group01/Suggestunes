import {Component, OnInit} from '@angular/core';
import {SongModel} from "../../playlists/playlist/song/song.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-songs-layout',
  templateUrl: './songs-layout.component.html',
  styleUrls: ['./songs-layout.component.css']
})
export class SongsLayoutComponent implements OnInit{
songs:SongModel[]|undefined
  constructor(private db:AngularFireDatabase,public spotify:SpotifyService) {
  }

  ngOnInit(): void {
    this.getSongs().subscribe(data=>{
      this.songs = data;
    })
  }
  getSongs() {
    return this.db.list<SongModel>('Songs').valueChanges()
  }

}
