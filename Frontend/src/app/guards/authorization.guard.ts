import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../sevices/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class authorizationGuard{

  constructor(private authService: AuthService,private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let dataRoles = route.data['roles']
    let serviceRoles = this.authService.roles
    if (serviceRoles.includes(dataRoles)){
      return false
    }else {
      return true;
    }
  }
}
