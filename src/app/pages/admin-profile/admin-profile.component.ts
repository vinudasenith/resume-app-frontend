import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})


export class AdminProfileComponent implements OnInit {

  // store logged in user
  userData: any = null;
  loading: boolean = true;
  activeTab: string = 'profile';


  // store feedback message
  notifications: any[] = [];
  loadingNotifications = false;


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

        this.fetchNotifications();
      },
      error: (err) => {
        console.error('Failed to fetch user', err);
        this.loading = false;
      }
    });
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;

    if (tab === 'notifications') {
      this.fetchNotifications();
    }
  }


  // fetch notifications
  fetchNotifications() {
    if (!this.userData?.email) return;

    this.loadingNotifications = true;
    this.http.get<any[]>(`${environment.apiBaseUrl}/feedback/my-feedback`, {
      params: { email: this.userData.email }
    }).subscribe({
      next: (res) => {
        // convert createdAt to Date objects
        this.notifications = res.map(note => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
        this.loadingNotifications = false;
      },
      error: (err) => {
        console.error('Failed to fetch notifications', err);
        this.loadingNotifications = false;
      }
    });
  }

}
