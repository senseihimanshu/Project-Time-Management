import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { SendHttpRequestService } from "../send-http-request.service";
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
  empList: string[];

  constructor(
    private _service: SendHttpRequestService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }
    menus: any = [
      {
        title: "Employees",
        icon: "fa fa-users",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Add New Employee"
          },
          {
            title: "Show All Employees"
          }
        ]
      },
      {
        title: "Projects",
        icon: "fa fa-book",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Add New Project"
          },
          {
            title: "Show All Projects"
          }
        ]
      },
      {
        title: "Timesheets",
        icon: "fa fa-calendar",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Show All Timesheets"
          }
        ]
      }
    ];
  
    loading = false;
  ngOnInit():any {
     this.getemployees();
    console.log("ngOnInit");
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);
          this.formType = params.type;
            // debugger;
          console.log(this.formType);
          console.log("employees dhundu");

          if (!params.empId) {
            console.log("here");
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

  projectCreateOrUpdate(obj, formType, form): any {
    console.log(obj, formType);
     this.employeeService
       .projectCreateOrUpdate(obj, formType)
       .subscribe((res: any) => {
         console.log(res.payload.message)
       });
   }
   getemployees() {
    let obj = this._service.showEmployees().subscribe(res => {
      this.empList = res;
      console.log(res);
    });
    console.log(obj);
  }
  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
}