import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private _service:ServicesService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean{
     // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    const token = localStorage.getItem('Authorization');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    console.log(expectedRole);
    console.log(tokenPayload.data.role);
    console.log(tokenPayload.data.role==expectedRole)
      if(token!=null  && tokenPayload.data.role == expectedRole )
         return true;
         this.router.navigate(['/login']);
   
  }
 
  
}
