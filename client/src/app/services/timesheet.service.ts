import { IResponse } from './../models/response.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HOST } from "../config/host";
import { IPagination } from "../models/pagination.model";

const TIMESHEET_API: string = `${HOST}/api/timesheet`;

@Injectable({
  providedIn: "root"
})
export class TimesheetService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("Authorization")
    })
  };

  getTimesheet(paginationObj: IPagination): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set("criteria", paginationObj.criteria)
      .set("columns", paginationObj.columns)
      .set("page", paginationObj.page)
      .set("limit", paginationObj.limit)
      .set("sort", paginationObj.sort);

    return this.http.get<IResponse>(`${TIMESHEET_API}`, {
      ...this.httpOptions,
      params
    });
  }

  getTimesheetUsingRouteParams(timesheetId: string): Observable<any> {
    return this.http.get(`${TIMESHEET_API}/${timesheetId}`, this.httpOptions);
  }

  createTimesheet(timesheet: any): Observable<IResponse> {
    return this.http.post<IResponse>(TIMESHEET_API, timesheet, this.httpOptions);
  }

  getSpecificTimesheet(startDate: any): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set(
        "startDate",
        `${startDate}`
      );
    return this.http.get<IResponse>(`${TIMESHEET_API}/selectedweek`, {
      params,
      ...this.httpOptions
    });
  }

  getStaffTimesheets(paginationObj: IPagination): Observable<IResponse>{
    const params: HttpParams = new HttpParams().set("criteria", paginationObj.criteria).set("columns", paginationObj.columns).set("page", paginationObj.page).set("limit", paginationObj.limit).set("sort", paginationObj.sort);

    return this.http.get<IResponse>(`${TIMESHEET_API}`, { params, ...this.httpOptions });
  }

  updateStatus(status: Boolean, timesheetId: string): Observable<IResponse>{

    return this.http.patch<IResponse>(`${TIMESHEET_API}/review/${timesheetId}`, {status}, { ...this.httpOptions });
  }
}
