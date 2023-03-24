import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'AccountLayout',
    component: AccountLayoutComponent
  },
  {
    path: "",
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
