import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
import { ChangeUpLayoutComponent } from './Layouts/change-up-layout/change-up-layout.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './Layouts/register-layout/register-layout.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component'
import { PlaylistHomeLayoutComponent} from './layouts/playlist-home-layout/playlist-home-layout.component'
import { SpotifyAuthLayoutComponent } from './layouts/spotify-auth-layout/spotify-auth-layout.component'

const routes: Routes = [
  {
    path: 'AccountLayout',
    component: AccountLayoutComponent
  },
  {
    path: '',
    component: PlaylistComponent
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
    path:'playlists/playlist/:id',
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


