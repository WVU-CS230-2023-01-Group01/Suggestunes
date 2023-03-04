import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';

const routes: Routes = [
  {
    path: 'AccountLayout',
    component: AccountLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
