import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from "@angular/common/http";
import { HOST } from '../config/host';

const EMPLOYEE_API: string = `${HOST}/api/employee`;
const PROJECT_API:string="http://localhost:3000/api/project";
const SHOW_PROJECTAPI:string="http://localhost:3000/project";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("Authorization")
  });
  
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {}

  showAllEmployees(paginationObj):Observable<IResponse>{
    const params: HttpParams = new HttpParams().set("page", paginationObj.page).set("limit", paginationObj.limit).set("desc", paginationObj.isSortDesc).set("criteria", JSON.stringify(paginationObj.criteria));
    return this.http.get<IResponse>(`${HOST}/api/employee` , { ...this.httpOptions, params }); 
  }

  employeeCreateOrUpdate(obj: any, type: any): Observable<IResponse> {
    if (type === "create")
      return this.http.post<IResponse>(EMPLOYEE_API, obj, this.httpOptions);

    if (type === "update")
      return this.http.put<IResponse>(`${EMPLOYEE_API}/${obj.empId}`, obj, this.httpOptions);
  }
  projectCreateOrUpdate(obj: any, type: any):Observable <any> {
    if (type === "create")
      return this.http.post<any>(PROJECT_API, obj, this.httpOptions);

    if (type === "update")
      return this.http.put<any>(PROJECT_API, obj, this.httpOptions);
  }
  getEmployee(empId: string): Observable<IResponse> {
    if (!empId) {
      return this.http.get<IResponse>(`${EMPLOYEE_API}/${empId}`, { ...this.httpOptions });
    }
    return this.http.get<IResponse>(`${EMPLOYEE_API}/${empId}`, { ...this.httpOptions });
  }
  
  getProject(projectId: string): any {
    const params = new HttpParams().set("projectId", projectId); 
      return this.http.get<any>(SHOW_PROJECTAPI, { ...this.httpOptions,params });
    
  }

  deleteEmployee(empId: string): Observable<IResponse>{
    return this.http.delete<IResponse>(`${EMPLOYEE_API}/${empId}`, { ...this.httpOptions });
  }
  deleteProject(id: string): any{
    const params = new HttpParams().set("id", id);
    return this.http.delete<any>(PROJECT_API, { ...this.httpOptions, params });
  }
  searchEmp(name:any):Observable<any>
  {  const params = new HttpParams().set("name", name);
    return this.http.get<any>("http://localhost:3000/employees/search",{ ...this.httpOptions, params });
  }
  searchProjects(name:any):Observable<any>
  {
    const params = new HttpParams().set("projectName", name);
    return this.http.get<any>("http://localhost:3000/projects/search",{ ...this.httpOptions, params });
  }
}