import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    component: PlaylistHomeLayoutComponent
  },
  {
    path: "playlists/playlist",
    component: PlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
