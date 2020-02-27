import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const allowedRoles = next.data.allowedRoles;
      const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
  
      if (!isAuthorized) {
        this.router.navigate(['accessdenied']);
      }
  
      return isAuthorized;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['/accessdenied']);
    }

    return isAuthorized;
  }
  
}