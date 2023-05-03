import {StatsCarouselComponent} from "./landing-page/stats-carousel/stats-carousel.component";
import {LoginBoxComponentComponent} from "./layouts/sign-in-layout/login-box-component/login-box-component.component";
import {AlgoliaSearcher} from "../services/algolia.searcher";
import {InfoCardComponent} from "./landing-page/info-card/info-card.component";
import {AccountInfoComponent} from "./layouts/account-layout/account-info/account-info.component";
import {SpotifyService} from "../services/spotify.service";
import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./layouts/landing-page/landing-page.component";
import {MatInputModule} from "@angular/material/input";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardComponent} from "./layouts/account-layout/card/card.component";
import {SpotifyAuthLayoutComponent} from "./layouts/spotify-auth-layout/spotify-auth-layout.component";
import {AppRoutingModule} from "./app-routing.module";
import {PlaylistComponent} from "./playlists/playlist/playlist.component";
import {ForgotPasswordComponent} from "./layouts/forgot-password-layout/forgot-password.component";
import {SongComponent} from "./playlists/playlist/song/song.component";
import {MatButtonModule} from "@angular/material/button";
import {PlaylistHomeLayoutComponent} from "./layouts/playlist-home-layout/playlist-home-layout.component";
import {SuggestionAiComponent} from "./suggestion-ai/suggestion-ai.component";
import {SongsLayoutComponent} from "./layouts/songs-layout/songs-layout.component";
import {AccountLayoutComponent} from "./layouts/account-layout/account-layout.component";
import {AuthGuardComponent} from "./auth-guard/auth-guard.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegisterLayoutComponent} from "./layouts/register-layout/register-layout.component";
import {BrowserModule} from "@angular/platform-browser";
import {
  RegisterBoxComponentComponent
} from "./layouts/register-layout/register-box-component/register-box-component.component";
import {Hasher} from "../services/hasher";
import {SignInLayoutComponent} from "./layouts/sign-in-layout/sign-in-layout.component";
import {HomepageFooterComponent} from "./landing-page/homepage-footer/homepage-footer.component";
import {AppComponent} from "./app.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {AngularFireModule} from "@angular/fire/compat";
import {ChangeUpLayoutComponent} from "./layouts/change-up-layout/change-up-layout.component";
import {
  CreatePlaylistModalComponent
} from "./playlists/create-playlist/create-playlist-modal/create-playlist-modal.component";
import {CreatePlaylistComponent} from "./playlists/create-playlist/create-playlist.component";
import {LoginSignupComponent} from "./landing-page/login-signup/login-signup.component";
import {LandingNavbarComponent} from "./landing-page/landing-navbar/landing-navbar.component";
import {HttpClientModule} from "@angular/common/http";
import {NavBarComponent} from "./Navigation/nav-bar/nav-bar.component";
import {EditPlaylistModalComponent} from "./playlists/playlist/edit-playlist-modal/edit-playlist-modal.component";
import {environment} from "../environment/environment";


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
    SuggestionAiComponent,
    SongsLayoutComponent,
    AuthGuardComponent
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
