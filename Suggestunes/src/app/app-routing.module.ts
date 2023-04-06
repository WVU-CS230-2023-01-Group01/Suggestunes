import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInLayoutComponent } from './Layouts/sign-in-layout/sign-in-layout.component';
import { RegisterLayoutComponent } from './Layouts/register-layout/register-layout.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { PlaylistHomeLayoutComponent} from './layouts/playlist-home-layout/playlist-home-layout.component'
import {PlaylistComponent} from "./playlists/playlist/playlist.component";
const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "playlists",
    component: PlaylistHomeLayoutComponent,
    children: [{
      path:'playlist',
      component:PlaylistComponent
    }]
  },
  {
    path:'signin',
    component: SignInLayoutComponent
  },
  {
    path:'register',
    component: RegisterLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
