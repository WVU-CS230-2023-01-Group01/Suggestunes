import { Component, Injectable, OnInit } from '@angular/core';
import { Genre } from './genre.model';
import { Artist } from './artist.model';
import { HttpClient } from '@angular/common/http'
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {SongModel} from "../../playlists/playlist/song/song.model";

@Injectable()

@Component({
  selector: 'app-stats-carousel',
  templateUrl: './stats-carousel.component.html',
  styleUrls: ['./stats-carousel.component.css']
})

export class StatsCarouselComponent implements OnInit {

  private songList: Array<SongModel>;
  private artistList: Array<Artist>;
  private genreList: Array<Genre>;

  private numElements: Number;
  private defaultMode: boolean;

  private topSongs: Array<SongModel>;
  private topArtists: Array<Artist>;
  private topGenres: Array<Genre>;



  constructor(private http: HttpClient,private db:AngularFireDatabase) {
    this.songList = [];
    this.artistList = [];
    this.genreList = [];

    this.numElements = 3;
    this.defaultMode = false;

    this.topSongs = [];
    this.topArtists = [];
    this.topGenres = [];

  }

  ngOnInit(): void {
    if (!this.defaultMode) {
      console.log("Sending a get request to the server");
      this.getSongs();
      this.getArtists();
      this.getGenres();
      console.log('Showing information');
      this.saveSongs();
      this.saveArtists();
      this.saveGenres();
    } else {
      this.topSongs = this.defaultSongs();
      this.topArtists = this.defaultArtists();
      this.topGenres = this.defaultGenres();
    }
  }

  getSongs() {
    return this.db.list<SongModel>('Songs').valueChanges()
  }

  getArtists() {
    return this.http.get<Artist[]>('https://suggestoons-app-default-rtdb.firebaseio.com/Artists.json')
  }

  getGenres() {
    return this.http.get<Genre[]>('https://suggestoons-app-default-rtdb.firebaseio.com/Genres.json')
  }

  saveSongs() {
    this.getSongs().subscribe(data => {
      console.log('Saving Songs');
      console.log(data);
      this.songList = data;
      this.topSongs = this.updateList(this.songList);

    })
  }

  saveArtists() {
    this.getArtists().subscribe((data: Artist[]) => {
      console.log('Saving Artists');
      console.log(data)
      this.artistList = data;
      this.topArtists = this.updateList(this.artistList);
    })
  }

  saveGenres() {
    this.getGenres().subscribe((data: Genre[]) => {
      console.log('Saving Genres');
      console.log(data)
      this.genreList = data;
      this.topGenres = this.updateList(this.genreList);

    })
  }

  updateList<t>(inputList: Array<t>): Array<t> {
    let tempSongs = Array<t>(Math.min(this.numElements.valueOf(), inputList.length));
    for (let i = 0; i < tempSongs.length; i++) {
      tempSongs[i] = inputList[i];
    }
    return tempSongs;
  }

  defaultSongs(): Array<SongModel> {
    let tempSongs = Array<SongModel>(this.numElements.valueOf());
    for (let i = 0; i < this.numElements.valueOf() || i < tempSongs.length; i++) {
      let song: SongModel = new SongModel("assets/music note img.png","Default Song_" + i,"Default Artist_", undefined,(this.numElements.valueOf() - i))
      tempSongs[i] = song;
      console.log(i);
    }
    return tempSongs;
  }

  defaultArtists(): Array<Artist> {
    let tempArtists = Array<Artist>(this.numElements.valueOf());
    for (let i = 0; i < this.numElements.valueOf() || i < tempArtists.length; i++) {
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
    for (let i = 0; i < this.numElements.valueOf() || i < tempGenres.length; i++) {
      let genre: Genre = {
        name: "Default Genre_" + i,
        popularity: (this.numElements.valueOf() - i)
      };
      tempGenres[i] = genre;
    }
    return tempGenres;
  }

  getTopSongs(): Array<SongModel> {
    return this.topSongs;
  }

  getTopArtists(): Array<Artist> {
    return this.topArtists;
  }

  getTopGenres(): Array<Genre> {
    return this.topGenres;
  }

}


