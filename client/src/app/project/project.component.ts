import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss','../main/main.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {
  menus: any = [
    {
      title: "Employees",
      icon: "fa fa-users",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Employee"
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

  message: String;
  constructor(private _service:SendHttpRequestService,private router: Router, private employeeService: EmployeeService) { }

  projectsArray: any;
  tabularData() {
    let obj=this._service.showProjects().subscribe(res => {
      this.projectsArray=res;
      console.log(res);
      console.log(this.projectsArray);
    });
   console.log(obj);
    } 
  ngOnInit() {
    this.tabularData()
  }
  
  ngOnChanges(){
    this.tabularData()
  }
 
 
//   deleteEmployee(empId: any){
//     console.log(empId);
//     this.employeeService.deleteEmployee(empId).subscribe((res) => {
//       this.message = res.payload.message;
//       setTimeout(() => {
//         this.message = null;
//       }, 5000);
//       console.log(res);
//     });
//   }
  logout(){
    this._service.deletetoken();
     
        this.router.navigate(["/login"]);
     
  }
// }

}