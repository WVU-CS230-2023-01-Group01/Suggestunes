import {SpotifyArtist} from "./spotify.artist";
import {ImageResponse} from "./image.response";

export interface SpotifyAlbum {
  href:string
  id:string
  name:string
  uri:string
  images:ImageResponse[]
  image:string
  artists:SpotifyArtist[]

}
