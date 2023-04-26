import {SongModel} from "./song/song.model";

export class PlaylistModel{
  description:string;
  image:string;
  name:string;
  songs:SongModel[] | undefined;
  constructor(image:string,name:string,description:string,songs?:SongModel[]) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.songs = songs;
  }
}
