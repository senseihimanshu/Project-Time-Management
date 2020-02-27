import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

const FEED_API: string = 'http://localhost:3000/api/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient) {}


    employeeCreateOrUpdate(obj: any, type: any): any{
        console.log(obj);
        if(type === 'create') return this.http.post<any>(FEED_API, obj, this.httpOptions);

        if(type === 'update') return this.http.put<any>(FEED_API, obj, this.httpOptions);
    }

    getEmployee(empId: string): any{
        if(!empId){
            return this.http.get<any>(FEED_API, {...this.httpOptions});
        }
        console.log(empId);
        const params = new HttpParams()
            .set('empId', empId);
            console.log(params);
        return this.http.get<any>(FEED_API, {...this.httpOptions, params});
    }
}