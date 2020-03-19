import { IResponse } from './../models/response.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST } from '../config/host';
const PROJECTMANAGER_API = `${HOST}/api/projectmanager`

@Injectable({
    providedIn: 'root'
})
export class ProjectManagerService{
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem('Authorization')
        })
    }

    constructor(private http: HttpClient){}

    getProjectsForCurrentStaffId(staffObjId: string): Observable<IResponse>{
        return this.http.get<IResponse>(`${PROJECTMANAGER_API}/project/${staffObjId}`, this.httpOptions);
    }
}