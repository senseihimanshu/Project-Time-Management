import { Component, OnInit, OnChanges } from '@angular/core';
import { SendHttpRequestService } from "./../send-http-request.service";
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent implements OnInit,OnChanges {
  dashboard: string = "Employee Dashboard";

  menus: any = [
    {
      title: "Timesheets",
      icon: "fa fa-calendar",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Create New Timesheet",
          route: "/timesheetweek"
        },
        {
          title: "Show All Timesheets",
          route: "/timesheetweek"
        }

      ]
    }
  ];

  constructor(
    private _service: SendHttpRequestService,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  ngOnChanges(){

  }

  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
}
