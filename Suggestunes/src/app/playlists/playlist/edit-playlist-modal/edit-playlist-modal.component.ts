import {ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import {PlaylistModel} from "../../playlist/playlist.model";
import { SongModel } from '../../playlist/song/song.model';
import {playlist_list} from "../../../layouts/playlist-home-layout/playlists_list";
import {PlaylistHomeLayoutComponent} from "../../../layouts/playlist-home-layout/playlist-home-layout.component";
import { getDatabase, ref, set } from 'firebase/database';
import {Database, remove} from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth } from 'firebase/auth';
import { app } from 'src/app/app.component';
import {Hasher} from "../../../../services/hasher";
import {Router} from "@angular/router";

@Injectable()

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.css']
})
export class EditPlaylistModalComponent implements OnInit{
  @Input() target_playlist:PlaylistModel | undefined;
  @Input() id:string|undefined
  auth = getAuth(app);
  database:Database;
  path: string | undefined;
  playlists: Map<string,PlaylistModel> = new Map<string, PlaylistModel>();
  public show = true;
oldHash:string|undefined;
  constructor(cdr:ChangeDetectorRef, private db:AngularFireDatabase, private hasher:Hasher,private router:Router){
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
    console.log(this.id);
    let db_ref = ref(this.database, this.path + '/' + this.id);
    playlist.image = this.imageUrl.value!;
    remove(db_ref)
    let newHash = this.hasher.playlistHash(playlist)
    console.log(newHash);
    db_ref = ref(this.database, this.path + '/' + newHash)
    set(db_ref, playlist);
    this.router.navigate(['playlists/playlist/false/' + newHash]);
    this.reload();

  }

  reload(){
    console.log("reloading...");
    this.show = false;
    setTimeout(()=>this.show=true);
  }


}
