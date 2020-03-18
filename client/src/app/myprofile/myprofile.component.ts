import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  menus: any = [];

  employee: any;
  role: any;



  constructor(private _service:EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {  }
    
  ngOnInit(): any {
    const token = localStorage.getItem('Authorization');
      
    // //Decode JWT and return the Payload in JSON Format
   const decodeToken= this.jsonDecoder(token);
    
   this.role = decodeToken.data.role[0];
   console.log(decodeToken);
   console.log(decodeToken.data.empId);

   if(this.role === "Admin")
    this.menus.push(
      {
        title: "Employees",
        icon: "fa fa-users",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Add New Employee",
            route: "/employee/create"
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
            title: "Add New Project",
            route: "/project/create"
          },
          {
            title: "Show All Projects",
            route: '/project'
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
            title: "Show All Timesheets",
            route: "/timesheetweek"
          }
        ]
      }
    );
    else if(this.role === "Project Manager"){
      this.menus.push({
        title: "Timesheets",
        icon: "fa fa-calendar",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Create Timesheet",
            route: "/create/timesheet"
          },
          {
            title: "Show Filled Timesheets",
            route: "/show/timesheet"
          },
          {
            title: "Review Timesheets",
            route: "/review"
          }
        
        ]
      });
    }
    else if(this.role === "C Level Manager"){
      this.menus.push(
        {
          title: "Employees",
          icon: "fa fa-users",
          active: false,
          type: "dropdown",
      
          submenus: [
            {
              title: "Show All Employees",
              route: '/admin'
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
                title: "Create New Timesheet",
                route: '/timesheetweek'
              },
              {
                title: "Show All Timesheets",
                route: '/timesheetweek'
              },
              {
                title: "Review All Timesheets",
                route: '/review'
      
              }
            ]
          }
      );
    }else{
      this.menus.push(
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
      );

   }
  
   return this._service.getEmployee(decodeToken.data.empId).subscribe((response: any) => {  
      return (this.employee = response.employee);
      });
}

jsonDecoder = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};
}
