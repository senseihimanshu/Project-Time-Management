import { SendHttpRequestService } from '../services/send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { User } from  '../user';
import swal from 'sweetalert2';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit{
  isMessage: Boolean = false;

  constructor(
    private sendReq: SendHttpRequestService,
    // private jwtHelperService: JwtHelperService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  res: any;
  myform:FormGroup;
  submitted  =  false;
  ngOnInit() {
    this.myform  =  this.formBuilder.group({
       email: ['', [Validators.required,Validators.minLength(8)]],
        password: ['', [Validators.required,Validators.minLength(4)]],
    });
}
get f()
{
return this.myform.controls;
}
  loginFunction() { 
    this.submitted=true;
    if(this.password.nativeElement.value==""||this.email.nativeElement.value=="")
    {
     swal.fire({icon:'warning',
            title:"All fields are necessary"});  
      return;
    }
    
    if(this.myform.invalid)
    {
      let valLengthEmail = this.email.nativeElement.value.length;
        if(valLengthEmail<8){
        swal.fire({icon:'warning',
        title:"Email must be of minimum 8 characters"});  
        return;
       }
      let valLengthPassword=this.password.nativeElement.value.length; 
       if(valLengthPassword<4)
       swal.fire({icon:'warning',
       title:"Password must be of minimum 8 characters"});  
    return;
    }
     if(this.email.nativeElement.value == "" || this.password.nativeElement.value == ""){
      alert("Empty Fields !");
      return ;
    }
     // alert('SUCCESS!!'+JSON.stringify(this.myform.value));
      let userObj = {
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }
    if(this.email.nativeElement.value == "" || this.password.nativeElement.value == ""){
      alert("Empty Fields !");
      return ;
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
          // console.log(decodeToken.data.role[0]);
      
          // check if it was decoded successfully, if not the token is not valid, deny access
          if (!decodeToken) {
            console.log('Invalid token');
          }
          else if(!decodeToken.data){
            console.log('Wrong Credentials');
            this.isMessage = true;
            setTimeout(() => {
              this.isMessage = false;
            }, 5000);
          }
          else{
            const role=decodeToken.data.role[0];
            console.log(role);
            if(role=='Employee'||role=='employee'){
                this.router.navigate(['/timesheetweek']);
            }
            else if (role=='Admin'||role=='admin'){
              this.router.navigate(['/admin']);
            }
            else if( role=='C Level Manager'){
              this.router.navigate(['/clevel']);
            }
            else if(role=='Project Manager'||role=='project manager'){
              this.router.navigate(['/manager']);
            }
            else 
              this.router.navigate(['/accessdenied']);
          }
        }      
    },  (err) => {
      console.log(err);
        this.isMessage = true;
        setTimeout(() => {
          this.isMessage = false;
        }, 3000);
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

  
   


}

