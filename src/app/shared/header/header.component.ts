import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

// Header component
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMobileMenuOpen = false;

  // Constructor
  constructor(public authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // Function to handle logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Function to toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Function to close mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

}
