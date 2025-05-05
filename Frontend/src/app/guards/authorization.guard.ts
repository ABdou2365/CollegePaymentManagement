import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class authorizationGuard{

  constructor(private authService: AuthService,private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // here we're taking the roles of the user and the role indicated on the route and check of the user have the role
    // needed to access to the route
    let dataRoles = route.data['roles']
    let serviceRoles = this.authService.roles
    if (serviceRoles.includes(dataRoles)){
      return false
    }else {
      return true;
    }
  }
}
