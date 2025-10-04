# 🧾 Resume Matcher Pro Frontend

![Home Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/home%20page.jpeg)

## 🧩 Overview 

This repository contains the frontend for **Resume Matcher Pro**, a web application designed to help users create, analyze, and optimize ATS-compatible resumes. Built with **Angular**, the frontend offers a user-friendly interface for user authentication, resume submission, ATS compatibility scoring, report downloading, and interaction with an AI-powered chatbot for resume improvement and query resolution. It integrates with a Java-based Spring Boot backend via RESTful APIs. Users can receive personalized, manual feedback on their resumes from admins to improve their CVs further.

## ✨ Features

- **Mobile-Friendly Interface**: Fully responsive design to allow seamless use on smartphones and tablets.
- **User Authentication**: Secure registration and login interface with JWT-based authentication.
- **Feature Page/Dashboard**: Centralized hub for accessing core features like resume upload, report viewing, and chatbot interaction.
- **Resume Submission & ATS Scoring**: Upload resumes (PDF/DOCX) to receive an ATS compatibility score with a detailed report.
- **Report Download**: Download ATS analysis reports in PDF format for job applications or reference.
- **AI Chatbot Assistance**: Integrated chatbot to:
  - Suggest improvements for resume content (e.g., phrasing, structure).
  - Answer user queries about resume building or job applications.

## 🛠️ Tech Stack 

- **Framework**: Angular 16+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Communication**: Angular HttpClient for REST API integration
- **Build Tool**: Angular CLI

## ⚙️ Prerequisites

Ensure the following are installed before setting up the project:

- Node.js (v16 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Git
- Access to the [Resume Matcher Pro Backend](https://github.com/vinudasenith/resume-app-backend) running at `http://localhost:8080` (or configured URL)

## 🚀 Setup Instructions 

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vinudasenith/resume-app-frontend.git
   cd resume-app-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Update the API base URL in `src/environments/environment.ts` to point to the backend:
     ```typescript
     export const environment = {
       production: false,
       apiBaseUrl: 'http://localhost:9090/api'
     };
     ```

4. **Run the Application** ▶️:
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

## 📖 Usage

1. **Register/Login**: Use the authentication pages to create an account or sign in.
2. **Access Dashboard**: Navigate to the feature page to upload resumes, view reports, or interact with the chatbot.
3. **Submit Resume**: Upload a PDF/DOCX resume to receive an ATS compatibility score and detailed report.
4. **Interact with Chatbot**: Use the chatbot interface to ask questions or get resume improvement suggestions.
5. **Download Report**: Save the ATS report as a PDF from the results page.

For production deployment:
```bash
ng build --prod
```

## 📂 Project Structure

```plaintext
root-folder/
├── .angular/                    # Angular CLI cache
├── .vscode/                     # VS Code settings
├── node_modules/                # Node.js dependencies
├── public/                      # Public assets
├── webapp-shots/                # Screenshots of the application
├── src/
│   ├── app/
│   │   ├── guards/              # Route guards for authentication
│   │   ├── pages/               # Pages
│   │   ├── services/            # API and utility services 
│   │   ├── shared/              # Shared components
│   │   ├── app.component.css    # Main app component styles
│   │   ├── app.component.html   # Main app component template
│   │   ├── app.component.spec.ts # Main app component tests
│   │   ├── app.component.ts     # Main app component logic
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.routes.ts        # Application routing
│   ├── environments/
│   │   ├── environment.ts       # Development environment config
│   │   └── environment.prod.ts  # Production environment config
│   ├── index.html               # Main HTML entry
│   ├── main.ts                  # App bootstrap
│   ├── styles.css               # Global styles
├── .editorconfig                # Editor configuration
├── .gitignore                   # Files ignored by Git
├── angular.json                 # Angular CLI configuration
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Dependency lock file
├── postcss.config.js            # PostCSS configuration for Tailwind
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.app.json            # TypeScript configuration for app
├── tsconfig.json                # TypeScript configuration
├── tsconfig.spec.json           # TypeScript configuration for tests
└── README.md                    # Project documentation
```

## 📸 Screenshots

- **User Login Page**  
  ![User Login Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/login%20page.jpeg)

- **Upload Resume Management Page**  
  ![Upload Resume Management Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/upload%20resume%20page.jpeg)

- **Resume Report Page**  
  ![Resume Report Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/resume%20report.png)

- **Admin Dashboard Page**  
  ![Admin Dashboard Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/admin%20dashboard.jpeg)

- **Admin Resume Management Page**  
  ![Admin Resume Management Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/admin%20resume%20managment.jpeg)

- **Admin User Management Page**  
  ![Admin User Management Page](https://github.com/vinudasenith/resume-app-frontend/blob/master/webapp-shots/admin%20user%20managment.jpeg)

## 🧪 Running Tests

Run unit tests with:
```bash
ng test
```

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions, feedback, or issues, contact [ha.vinudas@gmail.com](mailto:ha.vinudas@gmail.com) or open an issue on GitHub.
