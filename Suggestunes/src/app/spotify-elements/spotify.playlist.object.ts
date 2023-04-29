import {PlaylistModel} from "../playlists/playlist/playlist.model";
import {SpotifySong} from "./spotify.song";
import {SpotifyTrackObject} from "./spotify.track.object";
import {PlaylistTrackObject} from "./playlist.track.object";

export interface SpotifyPlaylistObject{
  href : string
  limit:number
  next:undefined
  offset:number
  previous:undefined
  items:PlaylistTrackObject[]
  total:string
}
