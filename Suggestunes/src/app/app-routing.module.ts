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
    component: LandingPageComponent
  },
  {
    path: 'ChangeUpLayout',
    component: ChangeUpLayoutComponent
  },
  {
    path: "playlists",
    component: PlaylistHomeLayoutComponent,
    children: [{
      path:'playlist',
      component:PlaylistComponent
    }]},
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
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}


