import {SongModel} from "./song/song.model";

export class PlaylistModel{
  description:string;
  image:string;
  name:string;
  songs:SongModel[] | undefined;
  id:string|undefined;

  images:SpotifyImage[]|undefined
  constructor(image:string,name:string,description:string,songs?:SongModel[],id?:string,images?:SpotifyImage[]) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.songs = songs;
    if(id){
      this.id = id;
    }
    else{
      this.id = undefined;
    }
    if(images){
      this.image = images[0].url;
      console.log(images);
    }
  }

}
interface SpotifyImage{
  height:number
  url:string
  width:number;
}
