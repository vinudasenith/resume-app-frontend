import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Resume {
  id: number;
  fileName: string;
  atsCompatibility?: number;
  user: {
    name: string;
    email: string;
  }
}
@Component({
  selector: 'app-resume-managment',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './resume-managment.component.html',
  styleUrls: ['./resume-managment.component.css']
})


export class ResumeManagmentComponent implements OnInit {
  resumes: Resume[] = [];
  loading = true;
  error: String | null = null;

  apiBaseUrl = environment.apiBaseUrl;

  uploadsBaseUrl = 'http://localhost:9090/uploads';

  private apiUrl = `${environment.apiBaseUrl}/resume`;

  constructor(private http: HttpClient) { }

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

}


