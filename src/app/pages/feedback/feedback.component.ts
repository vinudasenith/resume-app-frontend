import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';

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
  resumeScore: number | null = null;
  scoreGrade: string = "";
  atsCompatibility: number | null = null;
  smartTips: string[] = [];

  isLoading = false;
  errorMessage = '';

  //ai assistence

  isChatOpen = false;
  userMessage = '';
  messages: { role: string; content: string }[] = [];


  constructor(private http: HttpClient, private toastr: ToastrService) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.trim().toLowerCase();
    return !!token
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      this.resetResults();
    }
  }

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

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userEmail', this.userEmail);

    this.http.post<any>(`${environment.apiBaseUrl}/resume/upload`, formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.resumeScore = response.resume_score;
        this.scoreGrade = response.score_grade;
        this.atsCompatibility = response.ats_compatibility;
        this.smartTips = response.smart_tips || [];
        // console.log("File uploaded successfully", response);
        // alert("✅ File uploaded successfully" + response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "File upload failed. Please try again.";
        console.error("File upload failed", error);

        // console.log("File upload failed", error);
        // alert("File upload failed");
      }
    })
  }
  resetResults() {
    this.resumeScore = null;
    this.scoreGrade = '';
    this.atsCompatibility = null;
    this.smartTips = [];
    this.errorMessage = '';
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


