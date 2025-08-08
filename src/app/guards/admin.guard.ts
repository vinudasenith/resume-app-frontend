import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // you need to implement this
    const role = user?.role;

    if (this.authService.isLoggedIn() && role === 'admin') {
      return true;
    }

    // Redirect to home if not authorized
    this.router.navigate(['/']);
    return false;
  }
}
