import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import {PlaylistModel} from "../../playlist/playlist.model";
import { SongModel } from '../../playlist/song/song.model';
import {playlist_list} from "../../../layouts/playlist-home-layout/playlists_list";
import {PlaylistHomeLayoutComponent} from "../../../layouts/playlist-home-layout/playlist-home-layout.component";
import {getBlob, getStorage, ref, uploadBytes} from "@angular/fire/storage";
import {app} from "../../../app.component";
import {getAuth} from "@angular/fire/auth";

@Injectable()

@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  styleUrls: ['./create-playlist-modal.component.css']
})
export class CreatePlaylistModalComponent {
  @Output() messageEvent = new EventEmitter<PlaylistModel>()
  imageUrl = new FormControl('assets/music note img.png');
  constructor(){}
  updateImageUrl(event: Event){
    const fileInput = document.getElementById("fileInput");
    // @ts-ignore
    console.log(fileInput.files instanceof FileList); // true even if empty

      // @ts-ignore
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        // @ts-ignore
        reader.onload = e => this.imageUrl.setValue(reader.result.toString());
        // @ts-ignore
      reader.readAsDataURL(event.target.files[0]);
      }


  }
  clear(event:Event){
    this.imageUrl.setValue("assets/music note img.png");
    // @ts-ignore
    document.getElementById("playlist-name").value="";
    // @ts-ignore
    document.getElementById("playlist-description").value="";
  }

  submitForm(playlist:PlaylistModel){
    const myModal = document.getElementById("popup");
    if(!playlist.name){
      alert("Playlist name cannot be empty");
      return;
    }
    // @ts-ignore
    let songs = new Array<SongModel>();
    //@ts-ignore
    // let playlist = new PlaylistModel(<string>this.imageUrl.value, <string>document.getElementById("playlist-name").value, <string>document.getElementById("playlist-description").value, songs);
    // @ts-ignore
    if(!this.imageUrl.value){
      console.log(playlist.image)
    }
    else{
      playlist.image = this.imageUrl.value!
    }

    playlist.songs = [];
    console.log(playlist);
    // @ts-ignore
    console.log("emitting message");
    this.messageEvent.emit(playlist);
    document.getElementById("close")!.click()
  }
}
