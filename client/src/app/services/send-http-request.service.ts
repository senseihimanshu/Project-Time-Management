import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})

export class SendHttpRequestService {

  constructor( private http: HttpClient) { }

 
  // //Decode JWT and return the Payload in JSON Format
  jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  showEmployees(): Observable<any>{
    return this.http.get("http://localhost:3000/api/employees").pipe(
      tap(_ => this.log("Log In")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }


  //header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem('Authorization'));
  logMeIn(obj): Observable<any>{
    
    console.log(obj);
    
    return this.http.post("http://localhost:3000/login", obj, {responseType: 'json'});
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
      };
    }
    private log(message: string) {
      console.log(message);
    }
  }


  
