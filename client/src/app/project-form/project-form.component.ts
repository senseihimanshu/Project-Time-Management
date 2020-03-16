import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { SendHttpRequestService } from "../send-http-request.service";
import swal from'sweetalert2'
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss','../main/employee-form/employee-form.component.scss',
  '../main/main.component.scss']
})
export class ProjectFormComponent implements OnInit {
 
 
  formType: string;
  employee: any;
  project:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  projectManagerList: string[];
  projectMemberList: string[];
  projManager:string[]=[];
  projMembers:string[]=[];
  message:string;
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
   
    dashboard:string="Admin Dashboard";
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
    //this function adds the class was-validated when the user submits the form
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
   
    
     
    this.getemployees();
   
    this.route.params.subscribe((data: Params) => {

    });
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.formType = params.type;

          if (!params.projectId) {
            return this.employeeService.getProject(null);
          }
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
         console.log(res);
         swal.fire({
          icon: 'success',
          text: this.message,
          showConfirmButton: true,
          timer: 3000
        }) 
      },  err => {
      this.message = err.error.payload.message;
        swal.fire({
          icon: 'error',
          text: this.message,
          showConfirmButton: true,
          timer: 3000
        }) 
      }
    ); 
    this.router.navigate(['/projects']);
}
   getemployees() {

    let obj = this._service.showEmployeesByRole().subscribe(res => {
      this.projectManagerList = res.payload.data.projectManagerList;
      this.projectMemberList=res.payload.data.projectMemberList;

    });
  }
 
  addProjectManager(employeeArr: any)
  {
    if(employeeArr){
      employeeArr.map((employee) => {
        this.projManager.push(employee._id);
      });
      console.log(this.projManager);
    }
  }
  addProjectMember(employeeArr: any)
  {
    if(employeeArr){
      employeeArr.map((employee) => {
        this.projMembers.push(employee._id);
      });
      console.log(this.projMembers);
    }
  }
}