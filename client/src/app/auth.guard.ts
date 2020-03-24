import { jsonDecoder } from 'src/app/utils/json.util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean{
     // this will be passed from the route config on the data property
    const token=localStorage.getItem('Authorization');
    const expectedRole = next.data.expectedRole;
    const expectedRole1 = next.data.expectedRole1;
   // decode the token to get its payload
     const now = Date.now().valueOf() / 1000
         if(token!=null && now<=jsonDecoder().exp )
         {
            if(jsonDecoder().role==expectedRole || (expectedRole1 && jsonDecoder().role==expectedRole1))
             return true
            else
          this.router.navigate(['/404']);
          }
          else{
          this.router.navigate(['/login']);
      }
  }
}
