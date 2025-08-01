import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  selectedFile: File | null = null;
  userEmail: string = '';

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    if (!this.userEmail) {
      alert("Please enter your email.");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userEmail', this.userEmail);

    this.http.post<any>(`${environment.apiBaseUrl}/resume/upload`, formData, { responseType: 'text' as 'json' }).subscribe({
      next: (response) => {
        console.log("File uploaded successfully", response);
        alert("✅ File uploaded successfully" + response);
      },
      error: (error) => {
        console.log("File upload failed", error);
        alert("File upload failed");
      }
    })
  }
}


