import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { AccountInfoComponent } from './Layouts/account-layout/account-info/account-info.component';
import { CardComponent } from './Layouts/account-layout/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignInLayoutComponent } from './layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './layouts/register-layout/register-layout.component';
import { LoginBoxComponentComponent } from './layouts/sign-in-layout/login-box-component/login-box-component.component';
import { RegisterBoxComponentComponent } from './layouts/register-layout/register-box-component/register-box-component.component';


import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { SongComponent } from './playlists/playlist/song/song.component';
import { CreatePlaylistComponent } from './playlists/create-playlist/create-playlist.component';
import { CreatePlaylistModalComponent } from './playlists/create-playlist/create-playlist-modal/create-playlist-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { InfoCardComponent } from './landing-page/info-card/info-card.component';
import { LoginSignupComponent } from './landing-page/login-signup/login-signup.component';
import { LandingNavbarComponent } from './landing-page/landing-navbar/landing-navbar.component';
import { HomepageFooterComponent } from './landing-page/homepage-footer/homepage-footer.component';
import { StatsCarouselComponent } from './landing-page/stats-carousel/stats-carousel.component';
import { PlaylistHomeLayoutComponent } from './layouts/playlist-home-layout/playlist-home-layout.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {initializeApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import { SpotifyAuthLayoutComponent } from './layouts/spotify-auth-layout/spotify-auth-layout.component';
import { ForgotPasswordComponent } from './layouts/forgot-password-layout/forgot-password.component';
import { EditPlaylistModalComponent } from './playlists/playlist/edit-playlist-modal/edit-playlist-modal.component';
import {LandingPageComponent} from "./layouts/landing-page/landing-page.component";
import {ChangeUpLayoutComponent} from "./layouts/change-up-layout/change-up-layout.component";
import {SpotifyService} from "../services/spotify.service";
import {Hasher} from "../services/hasher";
import {AlgoliaSearcher} from "../services/algolia.searcher";

import { CardComponent } from './layouts/account-layout/card/card.component';

import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { AccountInfoComponent } from './layouts/account-layout/account-info/account-info.component';
import { AccountFriendsComponent } from './layouts/account-layout/account-friends/account-friends.component';
import { SuggestionAiComponent } from './suggestion-ai/suggestion-ai.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountLayoutComponent,
    NavBarComponent,
    AccountInfoComponent,
    CardComponent,
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
    ChangeUpLayoutComponent,
    PlaylistHomeLayoutComponent,
    PlaylistComponent,
    AccountLayoutComponent,
    NavBarComponent,
    AccountInfoComponent,
    ForgotPasswordComponent,
    EditPlaylistModalComponent,
    SpotifyAuthLayoutComponent,
    ForgotPasswordComponent,
    SuggestionAiComponent
    SongsLayoutComponent,
    AuthGuardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
  ],
  providers: [SpotifyService,Hasher,AlgoliaSearcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
