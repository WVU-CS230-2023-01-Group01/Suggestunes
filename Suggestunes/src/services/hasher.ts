import {PlaylistModel} from "../app/playlists/playlist/playlist.model";
import {SongModel} from "../app/playlists/playlist/song/song.model";
import {Buffer} from "buffer";

export class Hasher {
  playlistHash(playlist:PlaylistModel){
    var p = 11;
    let message = playlist.name + playlist.description;
    var hash = 0;
    for(let i =0;i<message.length;i++){
      hash += message.charCodeAt(i)
    }
    return hash.toString(16);
  }
  songHash(song:SongModel){
    let message = song.name + song.artist + song.uri;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const digest = window.crypto.subtle.digest('SHA-256', data);

    return Buffer.from(message).toString('base64');
  }
}
