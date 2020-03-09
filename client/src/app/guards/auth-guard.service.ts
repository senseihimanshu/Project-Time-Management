import { ServicesService } from './../services.service';
import { Injectable } from '@angular/core';
// import { AuthService } from './../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _service: ServicesService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._service.isAuthenticated()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}