import { Component } from "@angular/core";
import { ISidebarMenus } from '../models/sidebar-menus.interface';

@Component({
  selector: "app-project-manager",
  styleUrls: ["./project-manager.component.scss"],
  templateUrl: "./project-manager.component.html"
})
export class ProjectManagerComponent {
  menus: ISidebarMenus[] = [
    {
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
          route: "/review/timesheet"
        }
      ]
    }
  ];;
}
