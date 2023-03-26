import { Component } from '@angular/core';
import { ReflectiveInjector } from '@angular/core';
import { InjectionToken } from '@angular/core';

type Song = {
  name: string;
  popularity: number;
};

type Artist = {
  name: string;
  popularity: number;
};

type Genre = {
  name: string;
  popularity: number;
};


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

  constructor (songList: Array<Song>, artistList: Array<Artist>, genreList: Array<Genre>, numElements: Number, defaultMode: Boolean){
    this.songList   = songList;
    this.artistList = artistList;
    this.genreList  = genreList;

    this.numElements = numElements;

    this.topSongs   = [];
    this.topArtists = [];
    this.topGenres  = [];

    this.updateCarousel(defaultMode.valueOf());
  }

  updateCarousel(defaultMode: boolean){
    if (!defaultMode) {
      this.topSongs = this.updateList(this.songList);
      this.topArtists = this.updateList(this.artistList);
      this.topGenres = this.updateList(this.genreList);
    } else {
      this.defaultSongs();
      this.defaultArtists();
      this.defaultGenres();
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
    for (let i = 0; i < tempSongs.length; i++){
      let song: Song = {
        name: "Default Song_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempSongs[i] = song;
    }
    return tempSongs;
  }

  defaultArtists(): Array<Artist> {
    let tempArtists = Array<Artist>(this.numElements.valueOf());
    for (let i = 0; i < tempArtists.length; i++){
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
    for (let i = 0; i < tempGenres.length; i++){
      let genre: Genre = {
        name: "Default Genre_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempGenres[i] = genre;
    }
    return tempGenres;
  }
  
}


