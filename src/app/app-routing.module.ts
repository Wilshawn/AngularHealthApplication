import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { ViewPatientComponent } from './components/view-patient/view-patient.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './services/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'ViewPatient/:patientId', component: ViewPatientComponent, canActivate:[AuthGuard] },
  { path: 'AddPatient', component: AddPatientComponent, canActivate:[AuthGuard] },
  { path: 'EditPatient/:patientId', component: EditPatientComponent, canActivate:[AuthGuard] },
  { path: 'SignIn', component: LoginFormComponent },
  { path: 'Search', component: SearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
