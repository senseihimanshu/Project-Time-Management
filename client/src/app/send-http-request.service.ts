import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from "@angular/common/http";

import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { HOST } from "./config/host";

const PROJECT_API = `${HOST}/project`;

@Injectable({
  providedIn: "root"
})
export class SendHttpRequestService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization")
  });

  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) {}

  private log(message: string) {}
  header_token: HttpHeaders = new HttpHeaders().set(
    "token",
    localStorage.getItem("Authorization")
  );

  //Decode JWT and return the Payload in JSON Format
  jsonDecoder = token => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);

  };

  showEmployees(): Observable<any> {
    const token = localStorage.getItem("Authorization");
    //Decode JWT and return the Payload in JSON Format
    const decodeToken = this.jsonDecoder(token);
    const empId = decodeToken.data.empId;
    const params = new HttpParams().set("empId", empId);
    if (!empId) {
      return this.http.get<any>("http://localhost:3000/employees", {
        ...this.httpOptions
      });
    }
    return this.http
      .get<any>("http://localhost:3000/employees", {
        ...this.httpOptions,
        params
      })
      .pipe(
        tap(_ => this.log("Log In")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }
  acceptRequest(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/timesheet", obj, {
        headers: this.header_token
      })
      .pipe(
        tap(_ => this.log("Log In")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }
  reviewRequest(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/api/review", obj, { headers: this.header_token })
      .pipe(
        tap(_ => this.log("Review  Completed")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }

  logMeIn(obj): Observable<any> {
    return this.http
      .post("http://localhost:8080/login", obj, { responseType: "text" })
      .pipe(
        tap(_ => this.log("Log In")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }
  showReviews(): Observable<any> {
    return this.http
      .get("http://localhost:3000/timesheet", { headers: this.header_token })
      .pipe(
        tap(_ => this.log("Reviews")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }
  
  clevelDataTimesheets(graphicaldata: any): Observable<any> {
    const params = new HttpParams().set("graphicaldata", graphicaldata);
    return this.http
      .get("http://localhost:3000/timesheet/graphicaldata", { params })
      .pipe(
        tap(_ => this.log("timesheets data")),
        catchError(this.handleError<any>("Some Error Occurred"))
      );
  }

  deletetoken() {
    localStorage.removeItem("Authorization");
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
