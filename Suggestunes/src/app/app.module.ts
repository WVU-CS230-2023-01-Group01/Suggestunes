import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountLayoutComponent } from './Layouts/account-layout/account-layout.component';
import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { AccountInfoComponent } from './Layouts/account-layout/account-info/account-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountLayoutComponent,
    NavBarComponent,
    AccountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
