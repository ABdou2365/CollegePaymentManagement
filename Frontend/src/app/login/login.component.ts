import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../sevices/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm!:FormGroup;

  // The purpose of using FormBuilder in Angular is to simplify and shorten
  // the code needed to create form controls and form groups in reactive forms.



  constructor(private fb: FormBuilder,private authService: AuthService,private router:Router) {
  }

  // We need to create form controls in Angular to track, manage, and
  // validate the state and value of individual form fields in a structured and reactive way.

  ngOnInit(): void {
      this.loginForm = this.fb.group(
        {
          username : this.fb.control(''),
          password : this.fb.control('')
        }
      )
  }

  login(){
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    let authResult : boolean = this.authService.login(username,password)
    if (authResult){
      this.router.navigateByUrl('/admin/home')
    }
  }

}
