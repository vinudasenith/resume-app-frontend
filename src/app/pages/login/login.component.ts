import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  handleLogin() {
    const data = {
      email: this.email,
      password: this.password
    }

    this.http.post<any>(`${environment.apiBaseUrl}/users/login`, data).subscribe({
      next: (response) => {
        console.log("Login successful", response);
        alert("✅ Login successful");
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log("Login failed", error);
        alert("Login failed");
      }
    })
  }

}
