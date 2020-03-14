//import { AddUserComponent } from './add-user/add-user.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { __param } from 'tslib';
import { HttpClientModule} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
 
  private log(message: string) {
    console.log(message);
  }

  header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem("Authorization"));

  jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  isAuthenticated(){
    if(localStorage.getItem("Authorization") != null && this.isValid){
      return true;
    }
  }

  isValid(){
    if(this.jsonDecoder(localStorage.getItem("Authorization")).exp <= Date.now()){
      return false;
    }
    else{
      return true;
    }
  }
  }
  