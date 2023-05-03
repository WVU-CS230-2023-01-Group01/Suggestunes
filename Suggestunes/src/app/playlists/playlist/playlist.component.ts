import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {async, Observable, switchMap} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {getAuth} from "@angular/fire/auth";
import {app} from "../../app.component";
import {PlaylistModel} from "./playlist.model";
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {SpotifyService} from "../../../services/spotify.service";
import {PlaylistTrackObject} from "../../spotify-elements/playlist.track.object";
import {SongModel} from "./song/song.model";
import {SpotifyPlaylistObject} from "../../spotify-elements/spotify.playlist.object";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {DeviceObject} from "../../spotify-elements/device.object";
import {DeviceResponse} from "../../spotify-elements/device.response"
import { SearchResponse } from 'src/app/spotify-elements/search.response';
import { SpotifyTrackObject } from 'src/app/spotify-elements/spotify.track.object';
import {Database, getDatabase, ref, set} from "@angular/fire/database";
import {Hasher} from "../../../services/hasher";
import {AlgoliaSearcher} from "../../../services/algolia.searcher";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
@Injectable()

export class PlaylistComponent implements OnInit {
  playlist: PlaylistModel | undefined = new PlaylistModel('assets/music note img.png',"loading...","loading...",[]);
  path: string | undefined;
  private songName:string = "default";
  private spotifyString:string = "";
  searchResults:SongModel[] | undefined;
  has_active_device = false;
  public is_spotify = false;
  database:Database
  playlist_id$:string|undefined

  constructor(private route: ActivatedRoute,private hasher:Hasher,private http:HttpClient, private db: AngularFireDatabase, public spotify:SpotifyService,private searcher:AlgoliaSearcher){
    this.database = getDatabase(app);
  }
show = true;

  updatePlaylist($event:PlaylistModel){

  }

  ngOnInit(): void {

    let auth = getAuth(app);
    this.playlist = new PlaylistModel('assets/music note img.png',"loading...","loading...",[]);
    auth.onAuthStateChanged((user)=>{

      if(user) {
        this.route.paramMap.pipe(
          map((params: ParamMap) => params.get('spotify')!)
        ).forEach(value => this.is_spotify = value === "true");
        this.route.paramMap.pipe(
          map((params: ParamMap) => params.get('id')!)
        ).forEach(value => this.playlist_id$ = value);
        // @ts-ignore
        if (this.is_spotify) {
          this.spotify.get<PlaylistModel>("https://api.spotify.com/v1/playlists/" + this.playlist_id$!).subscribe(data=>{
            this.playlist = data!;
            this.playlist.songs = [];
            this.playlist.image  = data.images![0].url;
          })
          this.spotify.get<DeviceResponse>('https://api.spotify.com/v1/me/player/devices').subscribe((data)=>{
            for(let device of data.devices) {
              if (device.is_active) {
                this.has_active_device = true;
              }
            }
          })
          const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.spotify.access_token)
          this.http.get<SpotifyPlaylistObject>("https://api.spotify.com/v1/playlists/" + this.playlist_id$! + "/tracks",{'headers':headers}).subscribe(data=>{

            for(let item of data.items){
              let song = new SongModel(item.track.album!.images![0].url,item.track.name,item.track.artists![0].name,item.track.uri,item.track.popularity)
              song.album_uri = item.track.album.uri
              let db_ref = ref(this.database,'Songs/'+this.hasher.songHash(song).replaceAll('/',''))
              set(db_ref,song);
              this.searcher.add(song);
              this.playlist!.songs!.push(song);
            }

            this.reload()
          })
        } else {
          this.path = 'users/' + user!.uid + '/playlists'
          this.db.object<PlaylistModel>(this.path + '/' + this.playlist_id$!).valueChanges().subscribe((data) => {
            this.playlist = data!;
            if(!this.playlist.songs){
              this.playlist.songs = [];
            }
          });
        }
      }
    })
  }
  reload(){
   this.show = false;
    setTimeout(()=>this.show=true);
    for(let song of this.playlist!.songs!){
      console.log(song);
    }
  }

  public search(data: NgForm){
    console.log("searching...")
    this.searchResults = []
    if(this.is_spotify){
      this.songName = data.value.track;
      this.spotify.get<SearchResponse>("https://api.spotify.com/v1/search?q=" + this.songName + "&type=track").subscribe(data => {
        for(let item of data.tracks.items){
          let song = new SongModel(item.album!.images![0].url!,item.name,item.artists![0].name,item.uri!,item.popularity)
          song.album_uri = item.album.uri
          this.searchResults!.push(song)
          let db_ref = ref(this.database,'Songs/'+this.hasher.songHash(song))
          set(db_ref,song);
          this.searcher.add(song)
        }
      })
    }
    else{
      //@ts-ignore
      this.searcher.search(data.value.track).then(({hits})=>{
        //@ts-ignore
        hits.forEach((hit)=>{
          this.searchResults!.push(hit.song!)
        })
      })
    }

  }

  public add(song:SongModel){
    this.playlist!.songs!.push(song);
    if(this.is_spotify){
      this.http.post(
        "https://api.spotify.com/v1/playlists/" + this.playlist?.id + "/tracks",{
          'uris':[song.uri]
        },{
          headers: {
            'Authorization': 'Bearer ' + this.spotify.access_token
          }
        }
      ).subscribe()
    }
    else{
      const db_ref = ref(this.database, this.path + '/' + this.playlist_id$);
      set(db_ref, this.playlist);
    }

    this.reload();
    this.searchResults = []
  }
  playSearchItem(track:SpotifyTrackObject){
    this.http.put('https://api.spotify.com/v1/me/player/play',
      {
        "context_uri": track.album.uri,
        "offset": {
          "uri": track.uri
        },
        "position_ms": 0
      },
      {
        headers: {
          'Authorization': 'Bearer ' + this.spotify.access_token
        }
      })
      .subscribe();
  }

  remove(song : SongModel) {
    if(this.is_spotify){
      this.http.delete(`https://api.spotify.com/v1/playlists/${this.playlist_id$}/tracks`,
        {
          headers: {
            'Authorization': 'Bearer ' + this.spotify.access_token
          },
          body:{
            "tracks": [
              {
                "uri": song.uri!
              }
            ],
            "snapshot_id": this.playlist!.snapshot_id
          }
        }
        ).subscribe()
    }
    else{
      const db_ref = ref(this.database, this.path + '/' + this.playlist_id$);
      set(db_ref, this.playlist);
    }
    const index = this.playlist!.songs!.indexOf(song);
    if (index > -1) {
      this.playlist!.songs!.splice(index, 1);
    }
  }

  getSongIds(){
    let regex = /spotify:track:([0-9a-z]*)/ig
    let ids: (string)[] = [];
    this.playlist!.songs!.forEach(song=>{
      ids.push(regex.exec(song.uri!)![1]);
    })
    return ids
  }
}
