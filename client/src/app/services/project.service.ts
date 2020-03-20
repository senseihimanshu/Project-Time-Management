import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HOST } from "../config/host";
import { IPagination } from '../models/pagination.model';
import {IResponse} from '../models/response.model';
const PROJECT_API: string = `${HOST}/api/project`;

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization")
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {}

  deleteProject(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${PROJECT_API}/${id}`, {
      ...this.httpOptions
    });
  }

  getProject(projectId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${PROJECT_API}/${projectId}`, {
      ...this.httpOptions
    });
  }

  projectCreateOrUpdate(obj: any, type: any, projectId: string): Observable<IResponse> {
    if (type === "create")
      return this.http.post<IResponse>(PROJECT_API, obj, this.httpOptions);

    if (type === "update")
      return this.http.put<IResponse>(
        `${PROJECT_API}/${projectId}`,
        obj,
        this.httpOptions
      );
  }
  clevelDataProjects(graphicaldata: any): Observable<any> {
    const params = new HttpParams().set("graphicaldata", graphicaldata);
    return this.http
      .get("http://localhost:3000/project/graphicaldata", {...this.httpOptions, params});
     }

  showProjects(paginationObj: IPagination): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set("page", paginationObj.page)
      .set("limit", paginationObj.limit)
      .set("criteria", paginationObj.criteria)
      .set("columns", paginationObj.columns)
      .set("sort", paginationObj.sort);

    return this.http.get<IResponse>(PROJECT_API, {
      ...this.httpOptions,
      params
    });
  }
}
