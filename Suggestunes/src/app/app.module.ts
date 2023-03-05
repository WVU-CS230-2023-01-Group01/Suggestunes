import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginBoxComponentComponent } from './login-box-component/login-box-component.component';
import { SignInLayoutComponent } from './layouts/sign-in-layout/sign-in-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponentComponent,
    SignInLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
