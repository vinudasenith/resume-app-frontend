import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { AdminComponent } from './pages/admin/admin.component';
import { WorkFeatureComponent } from './pages/work-feature/work-feature.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { UserManagmentComponent } from './pages/user-managment/user-managment.component';
import { AdminGuard } from './guards/admin.guard';
import { ResumeManagmentComponent } from './pages/resume-managment/resume-managment.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [

    // Public routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'feature', component: FeatureComponent },
    { path: 'work', component: WorkFeatureComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'uprofile', component: UserProfileComponent },


    // Admin routes
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'admin/users', component: UserManagmentComponent, canActivate: [AdminGuard] },
    { path: 'admin/resumes', component: ResumeManagmentComponent, canActivate: [AdminGuard] },
    { path: 'admin/profile', component: AdminProfileComponent, canActivate: [AdminGuard] },

    //wild card route
    { path: '**', component: ErrorComponent },

];
