import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//CUSTOMS
import * as config from '../config/host';

interface ILogin {
    email: String;
    password: String;
}

const LOGIN_API = `${config.HOST}/api/login`;

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };

    constructor(private http: HttpClient){}

    login(login: ILogin): Observable<IResponse>{
        return this.http.post<IResponse>(LOGIN_API, { ...login }, { ...this.httpOptions });
    }

}