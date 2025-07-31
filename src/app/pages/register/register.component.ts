import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  username: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  handleRegister() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      username: this.username,
      role: 'customer',
      enabled: true
    };

    this.http.post<any>(`${environment.apiBaseUrl}/users/register`, data).subscribe({
      next: (response) => {
        console.log("Registration successful", response);
        alert("✅ Registration successful");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("Registration failed", error);
        alert("Registration failed");

      }

    }

    )
  }
}


