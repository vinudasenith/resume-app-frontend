import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';

interface FeedbackItem {
  key: string;
  value: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ToastrModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent {

  selectedFile: File | null = null;
  userEmail: string = '';

  //api response to show
  atsCompatibility: number | null = null;
  feedback: Record<string, string> | null = null;

  isLoading = false;
  errorMessage = '';

  //ai assistence
  isChatOpen = false;
  userMessage = '';
  messages: { role: string; content: string }[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.trim().toLowerCase();
    return !!token
  }

  // handle file selection
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      this.resetResults();
    }
  }

  // upload file
  uploadFile(): void {

    if (!this.isLoggedIn()) {
      this.toastr.error(" Please login first");
      return;
    }

    if (!this.selectedFile) {
      this.toastr.warning("Please select a file to upload.");
      return;
    }

    if (!this.userEmail) {
      this.toastr.warning("Please enter your email.");
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.atsCompatibility = null;
    this.feedback = null;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userEmail', this.userEmail);

    this.http.post<any>(`${environment.apiBaseUrl}/resume/upload`, formData).subscribe({
      next: (response) => {
        console.log("Full response:", response);
        console.log("Feedback object:", response.feedback);

        this.isLoading = false;

        if (response.is_resume) {
          this.atsCompatibility = response.ats_compatibility;
          this.feedback = response.feedback;
          this.errorMessage = response.message;
        } else {
          this.atsCompatibility = null;
          this.feedback = null;
          this.errorMessage = response.message;
        }
      },

      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "File upload failed. Please try again.";
        console.error("File upload failed", error);
      }
    })
  }

  resetResults() {
    this.atsCompatibility = null;
    this.errorMessage = '';
    this.feedback = null;
  }

  getFeedbackItems(): FeedbackItem[] {
    if (!this.feedback) return [];

    return Object.entries(this.feedback).map(([key, value]) => ({
      key,
      value: value as string
    }));
  }

  //ai assistant logic
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const message = this.userMessage.trim();
    this.messages.push({ role: 'user', content: message });
    this.userMessage = '';

    this.http.post<any>('http://localhost:8000/api/v1/chat', { message }).subscribe({
      next: (res) => {
        this.messages.push({ role: 'assistant', content: res.response || 'No response' });
      },
      error: () => {
        this.messages.push({ role: 'assistant', content: 'No response' });
      }
    })
  }
}