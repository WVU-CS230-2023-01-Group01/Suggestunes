import {PlaylistModel} from "../../playlists/playlist/playlist.model";

export interface SpotifyPlaylistResponse{
  href : string
  items: Array<PlaylistModel>
limit:number
next:undefined
offset:number
previous:undefined
total:string
}