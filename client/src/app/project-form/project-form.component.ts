import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { SendHttpRequestService } from "../send-http-request.service";
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss','../main/employee-form/employee-form.component.scss','../main/main.component.scss']
})
export class ProjectFormComponent implements OnInit {
  formType: string;
  employee: any;
  project:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  empList: string[];
  projManager:string[]=[];
  projMembers:string[]=[];
  message:any;
  name = "Angular";
  page = 1;
  pageSize = 6;
  items = [];
  pager={};
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
    this.route.params.subscribe((data: Params) => {
      console.log(data);
    });
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);
          this.formType = params.type;
            // debugger;
          console.log(this.formType);

          if (!params.projectId) {
            console.log("here");
            return this.employeeService.getProject(null);
          }
       //   this.formType = "get";
          console.log(this.formType);
          return this.employeeService.getProject(params.projectId);
        })
      )
      .subscribe((response: any) => {
        return (this.project = response);
      });
  }

  projectCreateOrUpdate(obj, formType): any {
    console.log(obj, formType);
     this.employeeService
       .projectCreateOrUpdate(obj, formType)
       .subscribe((res: any) => {
         this.message=res.payload.message;
         console.log(res.payload.message)
       });
   }
   getemployees() {

    let obj = this._service.showEmployees().subscribe(res => {
      this.empList = res;
      console.log(res);
    });
    console.log("employeelist",this.empList);
    console.log(obj);
  }
  addProjectManager(employeeArr: any)
  {
    if(employeeArr){
      console.log('Abha Rana', employeeArr);
      employeeArr.map((employee) => {
        this.projManager.push(employee._id);
      });
      console.log(this.projManager);
    }
    
  }
  addProjectMember(employeeArr: any)
  {
    if(employeeArr){
      console.log('Abha Rana', employeeArr);
      employeeArr.map((employee) => {
        this.projMembers.push(employee._id);
      });
      console.log(this.projMembers);
    }
    
  }
  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
}