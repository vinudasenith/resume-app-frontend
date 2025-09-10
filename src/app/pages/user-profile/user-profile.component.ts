import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any = null;
  loading: boolean = true;
  activeTab: string = 'profile';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchLoggedInUser();
  }

  // fetch logged in user
  fetchLoggedInUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loading = false;
      return;
    }

    this.http.get(`${environment.apiBaseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.userData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch user', err);
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
