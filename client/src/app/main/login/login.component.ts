import { SendHttpRequestService } from '../../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements AfterViewInit{
  
  constructor(
    private sendReq: SendHttpRequestService,
    private _router: Router) { }


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
      if(res != null){
        window.localStorage.setItem('Authorization', `Bearer ${res.body.payload['x-auth-token']}`);
        console.log(res.body);
        this._router.navigate(['/home']);
      }
    });
  }
  
  ngAfterViewInit(){

  }

}

