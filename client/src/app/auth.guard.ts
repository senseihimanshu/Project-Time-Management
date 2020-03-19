import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

import {jsonDecoder} from './utils/json.util'
import { onErrorResumeNextStatic } from 'rxjs/internal/operators/onErrorResumeNext';
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
    const token = localStorage.getItem('Authorization');
    // decode the token to get its payload
    const decodeToken = jsonDecoder();
     
    
      const now = Date.now().valueOf() / 1000
      console.log(decodeToken.exp>=now)
      if((token!=null && decodeToken.role == expectedRole) /* &&decodeToken.exp>=now */ )
         return true;
         this.router.navigate(['/login']);
   
  }
 
  
}
