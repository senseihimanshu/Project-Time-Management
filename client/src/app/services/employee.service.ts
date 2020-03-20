import { IResponse } from './../models/response.model';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { HOST } from '../config/host';
import { IPagination } from '../models/pagination.model';
const EMPLOYEE_API: string = `${HOST}/api/employee`;

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization")
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {}

  showAllEmployees(paginationObj: IPagination): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set("page", paginationObj.page)
      .set("limit", paginationObj.limit)
      .set("criteria", paginationObj.criteria)
      .set("columns", paginationObj.columns)
      .set("sort", paginationObj.sort);

    return this.http.get<IResponse>(`${HOST}/api/employee`, {
      ...this.httpOptions,
      params
    });
  }
  employeeCreateOrUpdate(obj: any, type: any): Observable<IResponse> {
    if (type === "create")
      return this.http.post<IResponse>(EMPLOYEE_API, obj, this.httpOptions);

    if (type === "update")
      return this.http.put<IResponse>(
        `${EMPLOYEE_API}/${obj.empId}`,
        obj,
        this.httpOptions
      );
  }

  getEmployee(empId: string): Observable<IResponse> {
    if (!empId) {
      return this.http.get<IResponse>(`${EMPLOYEE_API}/${empId}`, {
        ...this.httpOptions
      });
    }
    return this.http.get<IResponse>(`${EMPLOYEE_API}/${empId}`, {
      ...this.httpOptions
    });
  }

  deleteEmployee(empObjId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${EMPLOYEE_API}/${empObjId}`, {
      ...this.httpOptions
    });
  }
}
