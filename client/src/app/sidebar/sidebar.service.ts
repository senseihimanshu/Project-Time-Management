import { Routes } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  // menus = [
   
  //   {
  //     title: 'Employees',
  //     icon: 'fa fa-users',
  //     active: false,
  //     type: 'dropdown',
    
  //     submenus: [
  //       {
  //         title: 'Add New Employee',
         
  //       },
  //       {
  //         title: 'Show All Employees'
  //       },
  //     ]
  //   },
  //   {
  //     title: 'Projects',
  //     icon: 'fa fa-book',
  //     active: false,
  //     type: 'dropdown',
     
  //     submenus: [
  //       {
  //         title: 'Add New Project',
  //       },
  //       {
  //         title: 'Show All Projects'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Timesheets',
  //     icon: 'fa fa-calendar',
  //     active: false,
  //     type: 'dropdown',
     
  //     submenus: [
  
  //       {
  //         title: 'Show All Timesheets'

  //       }
  //     ]
  //   },
    
  // ];
  constructor() { }
  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  // getMenuList() {
  //   return this.menus;
  // }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }

}
