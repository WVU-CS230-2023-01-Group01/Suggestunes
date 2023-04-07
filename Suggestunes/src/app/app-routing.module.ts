import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
import { ChangeUpLayoutComponent } from './Layouts/change-up-layout/change-up-layout.component';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './Layouts/register-layout/register-layout.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component'

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
    path:'signin',
    component: SignInLayoutComponent
  },
  {
    path:'register',
    component: RegisterLayoutComponent
  },
  {
    path: 'playlist',
    component: PlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}


