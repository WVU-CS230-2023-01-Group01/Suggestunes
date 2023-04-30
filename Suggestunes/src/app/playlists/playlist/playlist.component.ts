import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {async, Observable, switchMap} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {getAuth} from "@angular/fire/auth";
import {app} from "../../app.component";
import {PlaylistModel} from "./playlist.model";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
@Injectable()
export class PlaylistComponent implements OnInit {
  playlist: PlaylistModel | null = new PlaylistModel('assets/music note img.png',"loading...","loading...",[]);
  path: string | undefined;
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase){}
show = true;

  ngOnInit(): void {

    let auth = getAuth(app);
    auth.onAuthStateChanged((user)=>{

      if(user) {
        let playlist_id$:string
        this.route.paramMap.pipe(
          map((params: ParamMap) => params.get('id')!)
        ).forEach(value => playlist_id$ = value);
        // @ts-ignore
        console.log(playlist_id$)
        this.path = 'users/' + user!.uid + '/playlists'
        this.db.object<PlaylistModel>(this.path + '/' + playlist_id$!).valueChanges().subscribe((data)=>{
          console.log(data)
          this.playlist = data;
          console.log(this.playlist);
        });
      }
    })
  }
  reload(){
   this.show = false;
    setTimeout(()=>this.show=true);
  }
}
