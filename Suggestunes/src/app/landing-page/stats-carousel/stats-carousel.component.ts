import { Component, ReflectiveInjector, InjectionToken } from '@angular/core';
import { Song } from './song.model';
import { Genre } from './genre.model';
import { Artist } from './artist.model';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-stats-carousel',
  templateUrl: './stats-carousel.component.html',
  styleUrls: ['./stats-carousel.component.css']
})

export class StatsCarouselComponent {

  private songList:   Array<Song>;
  private artistList: Array<Artist>;
  private genreList:  Array<Genre>;

  private numElements: Number;

  private topSongs:   Array<Song>;
  private topArtists: Array<Artist>;
  private topGenres:  Array<Genre>;



  constructor (private http: HttpClient){
    this.songList   = [];
    this.artistList = [];
    this.genreList  = [];

    this.numElements = 5;

    this.topSongs   = [];
    this.topArtists = [];
    this.topGenres  = [];


    this.updateCarousel(true)
  }

  ngOnInit(): void {
    console.log("Sending a get request to the server");
    this.getSongs();
    this.getArtists();
    this.getGenres();
    console.log('Showing information');
    this.showStats();
}

getSongs() {
  return this.http.get<Song[]>('https://suggestoons-app-default-rtdb.firebaseio.com/Songs.json')
}

getArtists() {
  return this.http.get<Artist[]>('https://suggestoons-app-default-rtdb.firebaseio.com/Artists.json')
}

getGenres() {
  return this.http.get<Genre[]>('https://suggestoons-app-default-rtdb.firebaseio.com/Genres.json')
}

showStats() {
  this.getSongs().subscribe((data: Song[]) => {
    console.log(data)
    this.songList = data;
})
  this.getArtists().subscribe((data: Artist[]) => {
    console.log(data)
    this.artistList = data;
  })
  this.getGenres().subscribe((data: Genre[]) => {
    console.log(data)
    this.genreList = data;
  })
}

  // constructor (songList: Array<Song>, artistList: Array<Artist>, genreList: Array<Genre>, numElements: Number, defaultMode: Boolean){
  //   this.songList   = songList;
  //   this.artistList = artistList;
  //   this.genreList  = genreList;

  //   this.numElements = numElements;

  //   this.topSongs   = [];
  //   this.topArtists = [];
  //   this.topGenres  = [];

  //   console.log("here");

  //   // this.updateCarousel(defaultMode.valueOf());
  // }

  updateCarousel(defaultMode: boolean){
    if (!defaultMode) {
      this.topSongs = this.updateList(this.songList);
      this.topArtists = this.updateList(this.artistList);
      this.topGenres = this.updateList(this.genreList);
    } else {
      this.topSongs = this.defaultSongs();
      this.topArtists = this.defaultArtists();
      this.topGenres = this.defaultGenres();
    }
  }

  updateList<t>(inputList: Array<t>): Array<t> {
    let tempSongs = Array<t>(this.numElements.valueOf());
    for (let i = 0; i < tempSongs.length; i++){
      tempSongs[i] = inputList[i];
    }
    return tempSongs;
  }

  defaultSongs(): Array<Song>{
    let tempSongs = Array<Song>(this.numElements.valueOf());
    for (let i = 0; i < this.numElements.valueOf(); i++){
      let song: Song = {
        name: "Default Song_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempSongs[i] = song;
      console.log(i);
    }
    return tempSongs;
  }

  defaultArtists(): Array<Artist> {
    let tempArtists = Array<Artist>(this.numElements.valueOf());
    for (let i = 0; i < this.numElements.valueOf(); i++){
      let artist: Artist = {
        name: "Default Artist_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempArtists[i] = artist;
    }
    return tempArtists;
  }

  defaultGenres(): Array<Genre> {
    let tempGenres = Array<Genre>(this.numElements.valueOf());
    for (let i = 0; i < this.numElements.valueOf(); i++){
      let genre: Genre = {
        name: "Default Genre_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempGenres[i] = genre;
    }
    return tempGenres;
  }

  getTopSongs(): Array<Song> {
    return this.topSongs;
  }

  getTopArtists(): Array<Song> {
    return this.topArtists;
  }

  getTopGenres(): Array<Song> {
    return this.topGenres;
  }
  
}


