import { Component, OnInit, Input ,ViewChild} from '@angular/core';
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { SendHttpRequestService } from "../send-http-request.service";
import swal from'sweetalert2'

import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss','../main/employee-form/employee-form.component.scss',
  '../main/main.component.scss']
})
export class ProjectFormComponent implements OnInit {
  
  projectManagerList:string[]=[];
  projectMemberList: string[]=[];
  projectManagerNamesArray:string[]=[];
  projectMemberNamesArray:string[]=[];
  employee: any;
  project:any;
  
  selectedItems = [];
 
   formType:string;
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
    public model: any;
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
        
          return this.employeeService.getProject(params.projectId);
        })
      )
      .subscribe((response: any) => {

        return (this.project = response);
      });
  }
  projectCreateOrUpdate(obj, formType): any {
    
     this.employeeService
       .projectCreateOrUpdate(obj, formType)
       .subscribe((res: any) => {
         this.message=res.payload.message;
        
         swal.fire({
          icon: 'success',
          title: this.message,
          showConfirmButton: true
        }) 



    },  err => {
      this.message = err.error.payload.message;
      swal.fire({
        icon: 'error',
        title: this.message,
        showConfirmButton: true
      }) 
      }
    ); 
    this.router.navigate(['/projects']);
}

   getemployees() {

    let obj = this._service.showEmployeesByRole().subscribe(res => {
      this.projectManagerList = res.payload.data.projectManagerList;
      
      this.projectMemberList=res.payload.data.projectMemberList;
      console.log(this.projectMemberList);
      this.namesProjectManager(this.projectManagerList);
      this.namesProjectMember(this.projectMemberList);
    });
  }
  addProjectManager(employeeArr: any)
  {
    if(employeeArr){
      employeeArr.map((employee) => {
        this.projManager.push(employee._id);
      });
      
    }
  }
  addProjectMember(employeeArr: any)
  {
    if(employeeArr){
      employeeArr.map((employee) => {
        this.projMembers.push(employee._id);
      });
     
    }


  }
  formatter = (result: string) => result.toUpperCase();
  searchProjectManager = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectManagerList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    namesProjectMember(projectManagerList) {
   
      projectManagerList.map((employee) => {
        this.projectManagerNamesArray.push(employee.name);
      });
    }
    searchProjectMember = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectMemberNamesArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  
}