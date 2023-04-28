import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { ChangeUpLayoutComponent } from './layouts/change-up-layout/change-up-layout.component';
import { SignInLayoutComponent } from './layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './layouts/register-layout/register-layout.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component'
import { PlaylistHomeLayoutComponent} from './layouts/playlist-home-layout/playlist-home-layout.component'
import { SpotifyAuthLayoutComponent } from './layouts/spotify-auth-layout/spotify-auth-layout.component'
import { ForgotPasswordComponent } from './layouts/forgot-password-layout/forgot-password.component';

const routes: Routes = [
  {
    path: 'AccountLayout',
    component: AccountLayoutComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'ChangeUpLayout',
    component: ChangeUpLayoutComponent
  },
  {
    path: "playlists",
    component: PlaylistHomeLayoutComponent
  },
  {
    path:'playlists/playlist/:spotify/:id',
    component:PlaylistComponent
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
    path: 'account',
    component: AccountLayoutComponent
  },
  {
    path: 'spotify-auth',
    component: SpotifyAuthLayoutComponent
    },{
    path: 'forgotPassword',
    component: ForgotPasswordComponent
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


