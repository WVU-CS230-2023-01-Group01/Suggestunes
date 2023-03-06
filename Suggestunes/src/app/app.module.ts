import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { SongComponent } from './playlists/playlist/song/song.component';
import { CreatePlaylistComponent } from './playlists/create-playlist/create-playlist.component';
import { CreatePlaylistModalComponent } from './playlists/create-playlist/create-playlist-modal/create-playlist-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SongComponent,
    CreatePlaylistComponent,
    CreatePlaylistModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
