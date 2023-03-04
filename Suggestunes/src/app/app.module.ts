import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { AccountInfoComponent } from './Layouts/account-layout/account-info/account-info.component';
import { AccountFriendsComponent } from './Layouts/account-layout/account-friends/account-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountLayoutComponent,
    NavBarComponent,
    AccountInfoComponent,
    AccountFriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
