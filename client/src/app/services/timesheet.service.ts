import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

const TIMESHEET_API: string = "http://localhost:3000/api/timesheet";

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
  getTimesheet(empObjId: any, type: string = null, page: string = null, limit: string = null, desc: string = null): Observable<any> {
    const params: HttpParams = new HttpParams().set("empObjId", empObjId).set("type", type).set("page", page).set("limit", limit).set("desc", desc);

    return this.http.get("http://localhost:3000/timesheet", {
      ...this.httpOptions,
      params
    });
  }

  getTimesheetUsingRouteParams(timesheetId: string): Observable<any>{
    return this.http.get(`http://localhost:3000/api/timesheet/${timesheetId}`);
  }

  createTimesheet(timesheet: any): Observable<any> {
    return this.http.post(
      TIMESHEET_API,
      timesheet,
      this.httpOptions)
  }

  getAllTimesheet(): Observable<any> {
    return this.http.get("http://localhost:3000/timesheet").pipe(
      tap(_ => this.log("All timesheets")),
      catchError(this.handleError<any>("Some Error Occurred"))
    );
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

  getSpecificTimesheets(empId: string, startDate: any): Observable<any>{
    const params: HttpParams = new HttpParams().set('empId', empId).set('startDate', `${startDate.year}-${startDate.month}-${startDate.day}`);
    return this.http.get(`${TIMESHEET_API}/filter`, { params, ...this.httpOptions });
  }
}
