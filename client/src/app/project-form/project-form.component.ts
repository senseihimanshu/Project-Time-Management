import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  formType: string;
  employee: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  emp = new FormControl();
  empList: string[] = ['Abha', 'Kritika', 'Himanshu', 'Deepanshu', 'Deepak'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit():any {
  
    console.log("ngOnInit");
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);
          this.formType = params.type;
            // debugger;
          console.log(this.formType);

          if (!params.empId) {
            return this.employeeService.getEmployee(null);
          }
          this.formType = "get";
          console.log(this.formType);
          return this.employeeService.getEmployee(params.empId);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.payload.employee);
        return (this.employee = response.payload.employee);
      });
  }

  employeeCreateOrUpdate(obj, formType): any {
    this.employeeService
      .employeeCreateOrUpdate(obj, formType)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}