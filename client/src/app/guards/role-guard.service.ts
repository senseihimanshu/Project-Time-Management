import { ServicesService } from './../services.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private _service: ServicesService, private _router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._service.jsonDecoder(localStorage.getItem("Authorization")).data.role;
    console.log(user,"user dekhoo");

    if (user == next.data.role) {
      console.log("bhdjcbdsjcndskjcnhdss",next.data.role);
      return true;
    }
    else{
      if(user == "Intern" || user == "Associate 1" || user == "Associate 2" || user == "Consultant 1" || user == "Consultant 1"){
        let tempUser = "User";
        console.log("ellllseeee",next.data.role);
        if(tempUser == next.data.role){
          return true;
        }
      }
    }

    // navigate to not found page
    this._router.navigate(['404']);
    return false;
  }
}