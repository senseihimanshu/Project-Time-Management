import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
// import { MenusService } from './menus.service';
import { SendHttpRequestService } from './../send-http-request.service';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Routes, RouterModule } from "@angular/router";
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
  menus = [];
  constructor(public sidebarservice: SidebarService, private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {
    // this.menus = sidebarservice.getMenuList();
   }
   
   routeLink(title){
     if(title=='Add New Employee')
    //this.router.navigate(this.routerLink);
   this.router.navigate(['/employee/create']);
   if(title=='Show All Employees')
   this.router.navigate(['/admindashboard']);
   if(title=='Add New Project')
   this.router.navigate(['/projectform/create/create']);
   if(title=='Show All Projects')
   this.router.navigate(['/projects']);
  //  if(title=='Show All Employees')
  //  this.router.navigate(['/employee/update']);
   if(title=='Show All Timesheets')
   this.router.navigate(['/timesheetweek']);
   if(title=='Review All Timesheets')
   this.router.navigate(['/review']);
  }
  ngOnInit() {
    // this.router.url();
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