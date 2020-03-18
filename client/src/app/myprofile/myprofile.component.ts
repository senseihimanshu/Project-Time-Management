import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { jsonDecoder} from 'src/app/utils/json.util';

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
    private route: ActivatedRoute) {}
    
  ngOnInit(): any {
    const token = localStorage.getItem('Authorization');
    const decodeToken = jsonDecoder(token);
    // if (!decodeToken) {
    //   console.log("Invalid token");
    // } else {
    //   const role = decodeToken.role;}

   if(decodeToken.role == "Admin"||decodeToken.role == "admin")
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
    else if(decodeToken.role == "Project Manager"||decodeToken.role == "project-manager"){
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
    else if(decodeToken.role == "C Level Manager"||decodeToken.role == "c-level"){
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
  
   return this._service.getEmployee(decodeToken.empId).subscribe((response: any) => {  
      return (this.employee = response.employee);
      });
}

}
