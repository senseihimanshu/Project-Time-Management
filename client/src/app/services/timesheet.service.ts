import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class TimesheetService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      token: localStorage.getItem("Authorization")
    })
  };

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

  payload: any = this.jsonDecoder(localStorage.getItem("Authorization"));

  projectService(): any {
    this.http.get("/api/project");
  }
  // getTimesheet(empId: string): any {
  //     if (!empId) {
  //       return this.http.get<any>("http://localhost:3000/timesheet", { ...this.httpOptions });
  //     }
  // }
  getTimesheet(): Observable<any> {
    return this.http.get("http://localhost:3000/timesheet").pipe(
      tap(_ => this.log("Log In")),
      catchError(this.handleError<any>("Some Error Occurred"))
    );
  }

  createTimesheet(timesheetData, empObjId): Observable<any>{
    return this.http.post("http://localhost:3000/api/timesheet", { ...timesheetData, empObjId }, this.httpOptions)
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
  private log(message: string) {
    console.log(message);
  }
}
