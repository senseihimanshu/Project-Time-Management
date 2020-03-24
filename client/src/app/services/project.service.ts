import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HOST } from "../config/host";
import { IPagination } from "../models/pagination.model";
import { IResponse } from "../models/response.model";
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

  projectCreateOrUpdate(
    obj: any,
    type: any,
    projectId: string
  ): Observable<IResponse> {
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
    return this.http.get("http://localhost:3000/project/graphicaldata", {
      ...this.httpOptions,
      params
    });
  }

  showProjects(paginationObj): Observable<IResponse> {
    const httpParamsObj = new HttpParams();
    let params: HttpParams = httpParamsObj
      .set("page", paginationObj.page)
      .set("limit", paginationObj.limit)
      .set("searchInput", paginationObj.searchInput)
      .set("isSortDecreasing", paginationObj.isSortDecreasing);

    if (paginationObj.sort) {
      console.log("I was here");
      params = httpParamsObj
        .set("page", paginationObj.page)
        .set("limit", paginationObj.limit)
        .set("searchInput", paginationObj.searchInput)
        .set("isSortDecreasing", paginationObj.isSortDecreasing)
        .set("sort", paginationObj.sort);
      console.log(params);
    }
    return this.http.get<IResponse>(PROJECT_API, {
      ...this.httpOptions,
      params
    });
  }
}
