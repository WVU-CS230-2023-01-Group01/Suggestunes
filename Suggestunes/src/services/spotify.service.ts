import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Buffer } from 'buffer';
import {SongModel} from "../app/playlists/playlist/song/song.model";
import {PlaylistModel} from "../app/playlists/playlist/playlist.model";
@Injectable()
export class SpotifyService{
  access_token:string | undefined;
  constructor(private http:HttpClient) {
    this.access_token = this.getAccessToken();
  }
  getAccessToken() {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `access_token=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return undefined;
  }
  public get<T>(endpoint:string){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token)

    return this.http.get<T>(endpoint,{'headers' : headers});
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
      redirect_uri: 'https://suggestoons-app.web.app/#/spotify-auth',
    });

    window.location.href = 'https://accounts.spotify.com/authorize?' + args;
  }

  play(is_spotify:boolean,playlist?:PlaylistModel,song?:SongModel){
    if(song){
      if(is_spotify) {
        this.http.put('https://api.spotify.com/v1/me/player/play',
          {
            "context_uri": playlist!.uri,
            "offset": {
              "uri": song.uri
            },
            "position_ms": 0
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.access_token
            }
          })
          .subscribe();
      }
      else{
        console.log(song.album_uri)
        console.log(song.uri)
        this.http.put('https://api.spotify.com/v1/me/player/play',
          {
            "context_uri": song.album_uri,
            "offset": {
              "uri": song.uri
            },
            "position_ms": 0
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.access_token
            }
          })
          .subscribe();

      }
    }
    else{
      this.http.put('https://api.spotify.com/v1/me/player/play',
        {
          "context_uri": playlist!.uri,
          "position_ms": 0
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.access_token
          }
        })
        .subscribe();
    }
  }
}
