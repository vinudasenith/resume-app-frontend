import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  handleLogin() {
    const data = {
      email: this.email,
      password: this.password
    }

    this.http.post<any>(`${environment.apiBaseUrl}/users/login`, data).subscribe({
      next: (response) => {
        console.log("Login successful", response);

        const token = response.token;


        console.log("Token:", token);

        if (token) {
          this.authService.login(token);
          alert("✅ Login successful");

          const user = this.authService.getCurrentUser();
          console.log("Decoded User from JWT:", user);
          if (user?.role === 'admin') {
            this.router.navigate(['/admin']).catch((err) => console.error('Navigation failed', err));
          } else {
            this.router.navigate(['/']).catch((err) => console.error('Navigation failed', err));
          }
        } else {
          alert("Login failed");
        }

      },
      error: (error) => {
        console.log("Login failed", error);
        alert("Login failed");
      }
    })
  }

}
