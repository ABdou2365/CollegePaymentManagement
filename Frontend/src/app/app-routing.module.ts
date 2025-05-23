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
import {authGuard} from "./guards/auth.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {AddNewComponentComponent} from "./add-new-component/add-new-component.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";

const routes: Routes = [

  {path : '',component: LoginComponent},
  {path : 'admin',component: AdminTemplateComponent, canActivate: [authGuard],
    children : [
      {path : 'payments',component: PaymentsComponent},
      {path: 'add-new-payment/:code',component: AddNewComponentComponent},
      {path : 'students',component: StudentsComponent},
      {path : 'profile',component: ProfileComponent},
      {path : 'home',component: HomeComponent},
      {path : 'dashboard',component: DashboardComponent},
      {path: 'student-details/:code', component: StudentDetailsComponent},
      {path: 'payment-details/:id',component: PaymentDetailsComponent},
      {path : 'load-payments',component: LoadPaymentsComponent,
        canActivate : [authorizationGuard], data : {roles : ['ADMIN']}},
      {path : 'load-Students',component: LoadStudentsComponent,
        canActivate : [authorizationGuard], data : {roles : ['ADMIN']}},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
