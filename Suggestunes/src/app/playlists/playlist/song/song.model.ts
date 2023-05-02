export class SongModel{
  image:string;
  name:string;
  artist:string;
  uri:string | undefined;
  popularity:number|undefined;
  objectID:string|undefined;
  album_uri: string|undefined;
  constructor(image:string,name:string,artist:string,uri?:string,popularity?:number) {
    this.image = image;
    this.name = name;
    this.artist = artist;
    this.uri = uri;
    this.popularity = popularity;
    this.objectID = uri;
  }

}
