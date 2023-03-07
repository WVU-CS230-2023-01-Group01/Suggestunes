import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginBoxComponentComponent } from './login-box-component/login-box-component.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './Layouts/register-layout/register-layout.component';
import { RegisterBoxComponentComponent } from './register-box-component/register-box-component.component';

import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { SongComponent } from './playlists/playlist/song/song.component';
import { CreatePlaylistComponent } from './playlists/create-playlist/create-playlist.component';
import { CreatePlaylistModalComponent } from './playlists/create-playlist/create-playlist-modal/create-playlist-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { InfoCardComponent } from './landing-page/info-card/info-card.component';
import { LoginSignupComponent } from './landing-page/login-signup/login-signup.component';
import { LandingNavbarComponent } from './landing-page/landing-navbar/landing-navbar.component';
import { HomepageFooterComponent } from './landing-page/homepage-footer/homepage-footer.component';
import { StatsCarouselComponent } from './landing-page/stats-carousel/stats-carousel.component';
import { PlaylistHomeLayoutComponent } from './layouts/playlist-home-layout/playlist-home-layout.component';
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponentComponent,
    SignInLayoutComponent,
    RegisterLayoutComponent,
    RegisterBoxComponentComponent,
    PlaylistComponent,
    SongComponent,
    CreatePlaylistComponent,
    CreatePlaylistModalComponent,
    LandingPageComponent,
    InfoCardComponent,
    LoginSignupComponent,
    LandingNavbarComponent,
    HomepageFooterComponent,
    StatsCarouselComponent,
    PlaylistHomeLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }