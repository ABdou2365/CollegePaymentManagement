import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {LoginComponent} from "./login/login.component";
import {PaymentsComponent} from "./payments/payments.component";
import {StudentsComponent} from "./students/students.component";
import {ProfileComponent} from "./profile/profile.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

const routes: Routes = [

  {path : '',component: LoginComponent},
  {path : 'admin',component: AdminTemplateComponent,children : [
      {path : 'payments',component: PaymentsComponent},
      {path : 'students',component: StudentsComponent},
      {path : 'profile',component: ProfileComponent},
      {path : 'home',component: HomeComponent},
      {path : 'dashboard',component: DashboardComponent},
      {path : 'load-payments',component: LoadPaymentsComponent},
      {path : 'load-Students',component: LoadStudentsComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
