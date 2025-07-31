import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resume-matcher-frontend';
  isLoginPage = false;
  isRegisterPage = false;
  isHome = false;
  isAdminPage = false;








  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.urlAfterRedirects;
      this.isLoginPage = path === '/login';
      this.isRegisterPage = path === '/register';
      this.isHome = path === '/';
      this.isAdminPage = path === '/admin';
    });
  }

}

