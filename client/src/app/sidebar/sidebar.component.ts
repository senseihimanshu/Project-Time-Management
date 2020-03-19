import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IMenu } from '../models/menu.model';
import { EmployeeService } from '../services/employee.service';
import { jsonDecoder } from '../utils/json.util';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: 'fit-content' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Input()
  menus: IMenu[] = [];
  constructor(public sidebarservice: SidebarService, private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {
   }
   
   routeLink(title){
     if(title=='Add New Employee')
   this.router.navigate(['/employee/create']);
   if(title=='Show All Employees')
   this.router.navigate(['/admindashboard']);
   if(title=='Add New Project')
   this.router.navigate(['/project/create']);
   if(title=='Show All Projects')
   this.router.navigate(['/project']);
   if(title=='Show All Timesheets')
   this.router.navigate(['/timesheetweek']);
   if(title=='Review All Timesheets')
   this.router.navigate(['/review']);
  }
  ngOnInit() {const decodeToken = jsonDecoder();
    if(decodeToken.role == "Admin"||decodeToken.role == "admin"){
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
      this.menus.push({
        title: "Timesheets",
        icon: "fa fa-calendar",
        active: false,
        type: "dropdown",
  
        submenus: [
          {
            title: "Create Timesheet",
            route: "/timesheetweek"
          },
          {
            title: "Review Timesheets",
            route: "/manager"
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
    }
    else{
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
  redirect(title){

    if(title=='Add New Employee')
      this.router.navigate(['/myProfile']);

  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}