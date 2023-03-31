import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { ChangeUpLayoutComponent } from './Layouts/change-up-layout/change-up-layout.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}


