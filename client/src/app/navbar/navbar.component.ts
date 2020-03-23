import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { jsonDecoder } from '../utils/json.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  menus: any=[];
  dashboard: string;

  constructor(private router: Router) { }

  ngOnInit() {
    const decodeToken = jsonDecoder();
    if(decodeToken.role == "Admin"||decodeToken.role == "admin"){
    this.dashboard = "Admin Dashboard";
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
  }
    else if(decodeToken.role == "Project Manager"||decodeToken.role == "project-manager"){
      this.dashboard = "Manager Dashboard";
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
      this.dashboard = "C-level Manager Dashboard";
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
    }
    else{
      this.dashboard = "Employee Dashboard";
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
  }

  home(title){
    if(title=='Admin Dashboard')
    this.router.navigate(['/admin']);
    else if(title=='Manager Dashboard')
    this.router.navigate(['/manager']);
    else  if(title=='Employee Dashboard')
    this.router.navigate(['/timesheetweek']);
    else if(title=='C-level Manager Dashboard')
    this.router.navigate(['/clevel']);
    else
    this.router.navigate(['/accessdenied']);
  }
  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(["/login"]);
  }
}
