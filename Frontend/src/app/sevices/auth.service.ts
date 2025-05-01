import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username!:any;
  public isAuthenticated:boolean = false;
  public roles:any = [];

  private users:any = {
    admin: {password: '1234', roles: ['STUDENT', 'ADMIN']},
    user: {password: '1234', roles: ['STUDENT']}
  }

  constructor() { }

  login(username: string,password : string): boolean{
    if ( this.users[username] && this.users[username].password == password ){
      this.isAuthenticated = true
      this.username = username;
      this.roles = this.users[username]['roles']
      return true
    }else {
      return false
    }
  }



}
