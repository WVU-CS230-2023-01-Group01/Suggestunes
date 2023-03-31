import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { AccountInfoComponent } from './Layouts/account-layout/account-info/account-info.component';
import { AccountFriendsComponent } from './Layouts/account-layout/account-friends/account-friends.component';
import { CardComponent } from './Layouts/account-layout/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
import { ChangeUpLayoutComponent } from './Layouts/change-up-layout/change-up-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountLayoutComponent,
    NavBarComponent,
    AccountInfoComponent,
    AccountFriendsComponent,
    CardComponent,
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
    ChangeUpLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
