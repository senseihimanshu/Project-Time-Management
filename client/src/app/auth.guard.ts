import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';
// import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router:Router,private _service:ServicesService
    ){}
  // canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot):  boolean{
     // this will be passed from the route config
    // on the data property
    // const expectedRole = next.data.expectedRole;
    // const token = localStorage.getItem('Authorization');
    // decode the token to get its payload
    //  const tokenPayload = decode(token);
    
      now = Date.now().valueOf() / 1000;
      // if((token!=null && tokenPayload.data.role == expectedRole) &&tokenPayload.exp>=now )
      //    return true;
      //    this.router.navigate(['/login']);
   
  }
 
  
