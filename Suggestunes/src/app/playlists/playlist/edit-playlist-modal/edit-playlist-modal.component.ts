import {ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import {PlaylistModel} from "../../playlist/playlist.model";
import { SongModel } from '../../playlist/song/song.model';
import {playlist_list} from "../../../layouts/playlist-home-layout/playlists_list";
import {PlaylistHomeLayoutComponent} from "../../../layouts/playlist-home-layout/playlist-home-layout.component";
import { getDatabase, ref, set } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth } from 'firebase/auth';
import { app } from 'src/app/app.component';

@Injectable()

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.css']
})
export class EditPlaylistModalComponent implements OnInit{
  @Input() target_playlist:PlaylistModel | undefined;
  auth = getAuth(app);
  database:Database;
  path: string | undefined;
  playlists: Map<string,PlaylistModel> = new Map<string, PlaylistModel>();
  public show = true;

  constructor(cdr:ChangeDetectorRef, private db:AngularFireDatabase){
    this.database = getDatabase(app);
  }
  
  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.path = 'users/'+ user!.uid + '/playlists'
      }
    })
  }
  
  @Output() messageEvent = new EventEmitter<PlaylistModel>()
  imageUrl = new FormControl('assets/music note img.png');
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

  submitForm(playlist:PlaylistModel){
    console.log("in add link");
    playlist.image = this.imageUrl.value!;
    console.log(playlist.image);
    const db_ref = ref(this.database, this.path + '/' + this.getHash(playlist));

    set(db_ref, playlist);

    this.reload();

  }

  reload(){
    console.log("reloading...");
    this.show = false;
    setTimeout(()=>this.show=true);
  }

  getHash(playlist:PlaylistModel){
    var p = 11;
    let message = playlist.name + playlist.description;
    var hash = 0;
    for(let i =0;i<message.length;i++){
      hash += message.charCodeAt(i)
    }
    return hash.toString(16);
  }
}
