import { jsonDecoder } from 'src/app/utils/json.util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private _service:ServicesService
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean{
     // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    const decodeToken = jsonDecoder();
    
    const now = Date.now().valueOf() / 1000
    if((decodeToken!=null && decodeToken.role == expectedRole) && decodeToken.exp>=now ){
         return true;
    }
    else{
         this.router.navigate(['/login']);
    }
  }
}