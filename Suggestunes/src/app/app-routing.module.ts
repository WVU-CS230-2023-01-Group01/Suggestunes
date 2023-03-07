import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component'
const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
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
