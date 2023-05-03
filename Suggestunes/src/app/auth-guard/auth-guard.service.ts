import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { app } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const auth = getAuth(app);
    let result = false;

    await new Promise<void>((resolve) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          result = true;
        } else {
          this.router.navigate(['/signin']);
          result = false;
        }
        resolve();
      });
    });

    return result;
  }
}
