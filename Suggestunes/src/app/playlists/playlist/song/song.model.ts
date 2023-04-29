export class SongModel{
  image:string;
  name:string;
  artist:string;
  uri:string | undefined;
  constructor(image:string,name:string,artist:string,uri?:string) {
    this.image = image;
    this.name = name;
    this.artist = artist;
    this.uri = uri;
  }

}
