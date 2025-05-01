import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../sevices/auth.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent{


  constructor(private router:Router, protected authService: AuthService) {
  }



  logout(){
    this.authService.roles = [];
    this.authService.isAuthenticated = false;
    this.authService.username=undefined;
    this.router.navigateByUrl("/")
  }

}
