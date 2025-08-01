import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { AdminComponent } from './pages/admin/admin.component';
import { WorkFeatureComponent } from './pages/work-feature/work-feature.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'feature', component: FeatureComponent },
    { path: 'work', component: WorkFeatureComponent },











    { path: 'admin', component: AdminComponent },
];
