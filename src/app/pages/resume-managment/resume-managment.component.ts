import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

interface Resume {
  id: number;
  fileName: string;
  atsCompatibility?: number;
  user: {
    name: string;
    email: string;
  }
  hasFeedback: boolean;
}

@Component({
  selector: 'app-resume-managment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ToastrModule],
  templateUrl: './resume-managment.component.html',
  styleUrls: ['./resume-managment.component.css']
})


export class ResumeManagmentComponent implements OnInit {
  resumes: Resume[] = [];
  loading = true;
  error: String | null = null;

  // Feedback modal state
  showFeedbackModal = false;
  selectedResume: Resume | null = null;
  feedbackText: string = "";
  sendingFeedback = false;

  apiBaseUrl = environment.apiBaseUrl;

  uploadsBaseUrl = 'http://localhost:9090/uploads';

  private apiUrl = `${environment.apiBaseUrl}/resume`;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllResumes();
  }

  //get all resumes
  getAllResumes() {
    this.http.get<Resume[]>(`${this.apiUrl}/all`).subscribe({
      next: (data) => {
        this.resumes = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    })
  }

  //get resume by user email
  getResumeByUserEmail(email: String) {
    this.http.get<Resume[]>(`${this.apiUrl}/user/${email}`).subscribe({
      next: (data) => {
        this.resumes = data;
      },
      error: (error) => {
        console.error("Error fetching resume", error);
      }
    })
  }

  //get resume by file name
  getResumeByFileName(fileName: String) {
    this.http.get<Resume[]>(`${this.apiUrl}/file/${fileName}`).subscribe({
      next: (data) => {
        console.log("Resume:", data)
      },
      error: (error) => {
        console.error("Error fetching resume", error);
      }
    })
  }

  // Open modal for a specific resume
  openFeedbackModal(resume: Resume) {
    this.selectedResume = resume;
    this.feedbackText = "";
    this.showFeedbackModal = true;
  }

  // Close modal
  closeFeedbackModal() {
    this.showFeedbackModal = false;
    this.selectedResume = null;
    this.feedbackText = "";
  }

  // Send feedback
  sendFeedback() {
    if (!this.selectedResume) return;

    this.sendingFeedback = true;

    const params = new HttpParams()
      .set('resumeId', this.selectedResume.id.toString())
      .set('feedbackText', this.feedbackText);

    this.http.post(`${this.apiBaseUrl}/feedback/send`, null, { params }).subscribe({
      next: () => {
        this.toastr.success("Feedback sent successfully!");
        this.sendingFeedback = false;

        const index = this.resumes.findIndex(r => r.id === this.selectedResume?.id);
        if (index !== -1) {
          this.resumes[index].hasFeedback = true;
        }
        this.closeFeedbackModal();
      },
      error: (error) => {
        console.error("Error sending feedback", error);
        this.sendingFeedback = false;
      }
    });
  }

}




