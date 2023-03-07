import {SongModel} from "./song/song.model";

export class PlaylistModel{
  image:string;
  name:string;
  description:string;
  songs:SongModel[];
  constructor(image:string,name:string,description:string,songs:SongModel[]) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.songs = songs;
  }
}
