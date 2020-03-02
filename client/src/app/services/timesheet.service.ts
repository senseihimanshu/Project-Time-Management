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
            
        })
    }
}