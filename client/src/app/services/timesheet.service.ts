import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpResponse,
    HttpParams
  } from "@angular/common/http";

@Injectable()
export class TimesheetService{
    httpOptions = {
        headers: new HttpHeaders({
            token: localStorage.getItem('Authorization')
        })
    }

    jsonDecoder = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    payload: any = this.jsonDecoder(localStorage.getItem('Authorization'));

    constructor(private http: HttpClient){}

    projectService(): any {
        this.http.get('/api/project')
    }
}