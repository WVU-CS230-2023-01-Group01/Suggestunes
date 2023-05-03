import {SpotifyArtist} from "./spotify.artist";
import {SpotifyAlbum} from "./spotify.album";

export interface SpotifyTrackObject {
  album : SpotifyAlbum
  artists :SpotifyArtist[]
  href : string
  id : string
  name : string
  uri:string
  popularity:number
}
