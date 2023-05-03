import { NgModule } from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './Layouts/register-layout/register-layout.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component'
import { PlaylistHomeLayoutComponent} from './layouts/playlist-home-layout/playlist-home-layout.component'
import { SpotifyAuthLayoutComponent } from './layouts/spotify-auth-layout/spotify-auth-layout.component'
import {ChangeUpLayoutComponent} from "./layouts/change-up-layout/change-up-layout.component";
import {ForgotPasswordComponent} from "./layouts/forgot-password-layout/forgot-password.component";
import {LandingPageComponent} from "./layouts/landing-page/landing-page.component";
import {SongsLayoutComponent} from "./layouts/songs-layout/songs-layout.component";
import { AuthGuard } from './auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'AccountLayout',
    component: AccountLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'ChangeUpLayout',
    component: ChangeUpLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "playlists",
    component: PlaylistHomeLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'playlists/playlist/:spotify/:id',
    component:PlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'signin',
    component: SignInLayoutComponent
  },
  {
    path:'register',
    component: RegisterLayoutComponent
  },
  {
    path: 'spotify-auth',
    component: SpotifyAuthLayoutComponent,
    canActivate: [AuthGuard]
    },{
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },{
  path:'songs',
    component:SongsLayoutComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot([
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
          return {
            consumed: url,
            posParams: {
              playlist_id: new UrlSegment(url[0].path.slice(1), {})
            }
          };
        }

        return null;
      },
      component: PlaylistComponent
    }
  ])],

  exports: [RouterModule]
})

export class AppRoutingModule {

}


