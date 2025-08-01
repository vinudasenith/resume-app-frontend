import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  users: any[] = [];
  loading: boolean = true;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  //fetch all users
  fetchUsers() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/users/all`).subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
      },
      error: (error) => {
        console.log("Failed to fetch users", error);
      }
    })
  }

  //handle block user
  handleBlockUser(email: string) {
    this.http.put(`${environment.apiBaseUrl}/users/block/${email}`, null).subscribe({
      next: () => {
        console.log(`User status toggled: ${email}`);
        this.fetchUsers();
      },
      error: (err) => {
        console.error(`Failed to toggle user status for ${email}:`, err);
      }
    });
  }


}
