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
  searchResults:SpotifyTrackObject[] | undefined;
  has_active_device = false;
  public is_spotify = false;

  constructor(private route: ActivatedRoute,private http:HttpClient, private db: AngularFireDatabase, private spotify:SpotifyService){}
show = true;

  updatePlaylist($event:PlaylistModel){

  }

  ngOnInit(): void {

    let auth = getAuth(app);

    auth.onAuthStateChanged((user)=>{

      if(user) {
        let playlist_id$: string
        this.route.paramMap.pipe(
          map((params: ParamMap) => params.get('spotify')!)
        ).forEach(value => this.is_spotify = value === "true");
        this.route.paramMap.pipe(
          map((params: ParamMap) => params.get('id')!)
        ).forEach(value => playlist_id$ = value);
        // @ts-ignore
        if (this.is_spotify!) {
          this.spotify.get<PlaylistModel>("https://api.spotify.com/v1/playlists/" + playlist_id$!).subscribe(data=>{
            this.playlist = data!;
            this.playlist.songs = [];
            this.playlist.image  = data.images![0].url;
          })
          this.spotify.get<SpotifyPlaylistObject>("https://api.spotify.com/v1/playlists/" + playlist_id$! + "/tracks").subscribe(data=>{
            for(let item of data.items){
              this.playlist!.songs!.push(new SongModel(item.track.album!.images![0].url,item.track.name,item.track.artists![0].name,item.track.uri));
            }
            console.log(this.playlist!.songs);
            this.reload()
          })
          this.spotify.get<DeviceResponse>('https://api.spotify.com/v1/me/player/devices').subscribe((data)=>{
            for(let device of data.devices) {
              if (device.is_active) {
                this.has_active_device = true;
              }
            }
          })
        } else {
          this.path = 'users/' + user!.uid + '/playlists'
          this.db.object<PlaylistModel>(this.path + '/' + playlist_id$!).valueChanges().subscribe((data) => {
            this.playlist = data!;
            if(!this.playlist.songs){
              this.playlist.songs = [];
            }
          });
        }
      }
    })
    this.playlist!.songs = this.playlist!.songs
  }
  reload(){
   this.show = false;
   console.log("reloading...")
    setTimeout(()=>this.show=true);
  }

  public search(data: NgForm){
    this.songName = data.value.track;
    this.spotify.get<SearchResponse>("https://api.spotify.com/v1/search?q=" + this.songName + "&type=track").subscribe(data => {
      this.searchResults = data.tracks.items;
    })

  }

  public add(track:SpotifyTrackObject){
    if(this.is_spotify){
      this.http.post(
        "https://api.spotify.com/v1/playlists/" + this.playlist?.id + "/tracks",{
          'uris':[track.uri]
        },{
          headers: {
            'Authorization': 'Bearer ' + this.spotify.access_token
          }
        }
      ).subscribe()
    }
      this.playlist!.songs!.push(new SongModel(track.album.images[0].url,track.name,track.artists[0].name,track.uri));
    this.reload();
  }

  play(track_uri?:string){
    if(track_uri){
      this.http.put('https://api.spotify.com/v1/me/player/play',
        {
          "context_uri": this.playlist!.uri,
          "offset": {
            "uri": track_uri
          },
          "position_ms": 0
        },{
          headers: {
            'Authorization': 'Bearer ' + this.spotify.access_token
          }
        })
        .subscribe();
    }
    else{
      this.http.put('https://api.spotify.com/v1/me/player/play',
        {
          "context_uri": this.playlist!.uri,
          "position_ms": 0
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.spotify.access_token
          }
        })
        .subscribe();
    }
console.log("playing: " + track_uri);

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

}
