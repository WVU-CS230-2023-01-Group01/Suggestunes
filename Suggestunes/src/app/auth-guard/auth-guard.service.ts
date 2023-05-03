//@author Jackson Monk
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { app } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  //canActivate() method determines whether or not a user is allowed to access a certain page. If they are not authorized, they should not be allowed to access certain pages
  async canActivate(): Promise<boolean> {
    const auth = getAuth(app);
    let result = false;
    //Waiting for a response from the promise
    await new Promise<void>((resolve) => {
        //Checking is the user is logged in
      auth.onAuthStateChanged((user) => {
        if (user) {
          result = true;
        } else {
          this.router.navigate(['/signin']);
          result = false;
        }
        //Resolving the promise
        resolve();
      });
    });
    //Returning the newly stored value of result
    return result;
  }
}
