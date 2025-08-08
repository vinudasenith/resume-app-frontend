import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtService } from './jwt.service';

interface JwtPayload {
  sub: string; // Email
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private jwtService: JwtService) {
    // Restore login state from localStorage when the app starts
    const token = this.getToken();
    if (token && this.isTokenValid(token)) {
      this.loggedIn.next(true);
    }
  }

  // Simply checks if token is valid (can be decoded)
  private isTokenValid(token: string): boolean {
    try {
      this.jwtService.decode<JwtPayload>(token);
      return true;
    } catch {
      return false;
    }
  }

  // Call this when login is successful
  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn.next(true);
  }

  // Logs out and clears token
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  // Check login state from BehaviorSubject
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get current logged in user's info
  getCurrentUser(): { email: string; role: string } | null {
    const token = this.getToken();
    if (!token || !this.isTokenValid(token)) return null;

    try {
      const decoded = this.jwtService.decode<JwtPayload>(token);
      return {
        email: decoded.sub,
        role: decoded.role
      };
    } catch {
      return null;
    }
  }
}
