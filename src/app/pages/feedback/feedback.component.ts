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

  //api response to show
  resumeScore: number | null = null;
  scoreGrade: string = "";
  atsCompatibility: number | null = null;
  smartTips: string[] = [];

  isLoading = false;
  errorMessage = '';


  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      this.resetResults();
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

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userEmail', this.userEmail);

    this.http.post<any>(`http://localhost:9090/api/resume/upload`, formData).subscribe({
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
}


