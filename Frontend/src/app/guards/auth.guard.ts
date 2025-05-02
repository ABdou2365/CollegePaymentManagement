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
export class authGuard{

  constructor(private authService: AuthService,private router: Router) {
  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (this.authService.isAuthenticated){
          return true;
        }else {
          this.router.navigateByUrl('/');
          return false;
        }
    }

}
