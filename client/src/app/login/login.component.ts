import { SendHttpRequestService } from '../services/send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements AfterViewInit{
  
  constructor(
    private sendReq: SendHttpRequestService,
    // private jwtHelperService: JwtHelperService,
    private router: Router) { }


  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  res: any;

  loginFunction() { 
    let userObj = {
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }
  
    console.log(userObj);
    this.sendReq.logMeIn(userObj).subscribe((res)=> {
      console.log(res);
      //debugger
      if(res != null){
        window.localStorage.setItem('Authorization', res.jwtToken);
        
          // get token from local storage or state management
          const token = localStorage.getItem('Authorization');
      
           // //Decode JWT and return the Payload in JSON Format
          const decodeToken= this.jsonDecoder(token);
          console.log(decodeToken);
          console.log(decodeToken.data.role[0]);
      
          // check if it was decoded successfully, if not the token is not valid, deny access
          if (!decodeToken) {
            console.log('Invalid token');
          }
          else{
            const role=decodeToken.data.role[0];
            console.log(role);
            if(role=='Employee'||role=='employee'){
                this.router.navigate(['/employee']);
            }
            else if (role=='Admin'||role=='admin'){
              this.router.navigate(['/admin']);
            }
            else if( role=='C-level Manager'||role=='c-level manager'){
              this.router.navigate(['/clevel']);
            }
            else if(role=='Project Manager'||role=='project manager'){
              this.router.navigate(['/manager']);
            }
            else 
              this.router.navigate(['/accessdenied']);
          }
        }      
    });
  }
  
    jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  ngAfterViewInit(){

  }

}

