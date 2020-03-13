import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
//import { SendHttpRequestService } from '../services/send-http-request.service';
import { SendHttpRequestService } from "./../send-http-request.service";
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.scss']
})
export class EmpTableComponent implements OnInit {

  constructor( private _service: SendHttpRequestService,
    private router: Router,
    private employeeService: EmployeeService) { }

    usersArray: MatTableDataSource<any>;
    displayedColumns: string[]= ['fullname'];
   // usersArray: any;
   data:any;
    tabularData() {
        this._service.showEmployees().subscribe(res => {
        let array=
        this.usersArray = res;
        console.log(res);
        this.usersArray=new MatTableDataSource(res);
      });
     // console.log(obj);
     // this.usersArray=new MatTableDataSource(this.res);
    }

  ngOnInit() {
    this.tabularData();

  }}
