
import { ServicesService } from './services.service';
import { AuthGuardService } from './guards/auth-guard.service';
// import { NewwComponent } from './neww/neww.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ReviewRowComponent } from './review/reviewrow/reviewrow.component';
import { ProjectRowComponent } from './project/projectrow/projectrow.component';
import { TableRowComponent } from './admindashboard/tablerow/tablerow.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectComponent } from "./project/project.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { EmployeeFormComponent } from "./main/employee-form/employee-form.component";
import { LoginComponent } from "./login/login.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReviewComponent } from "./review/review.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { NotFoundComponent } from "./404/notfound.component";
//import { AuthorizationGuard } from './authorization.guard';
import { from } from 'rxjs';
import {RoleGuardService} from "./guards/role-guard.service"
import { ProjectManagerComponent } from './project-manager/project-manager.component'

const routes: Routes = [
  {
    path: "", redirectTo: "login", pathMatch: "full"
  },
  {
    path:"timesheet",
    component:TimesheetComponent
  },
  
  {
    path: "admindashboard",
    component: AdmindashboardComponent
  },
  {
    path: "sidebar",
    component: SidebarComponent
  },
  // {
  //   path: "newtimesheet",
  //   component: NewwComponent
  // },
      {
        path: "myProfile",
        component: MyprofileComponent
      },
  {
    path: "review",
    component: ReviewComponent
  },
  { path: "", component: LoginComponent },
  {
    path: "manager",
    component: ReviewComponent
  },
  {
    path: 'projectmanager',
    component: ProjectManagerComponent
  },
  {
    path: "projects",
    component: ProjectComponent
  },
  {
    path: "employee",
    component: EmployeedashboardComponent
  },
  {
    path: "clevel",
    component: DashboardComponent
  },
  {
    path: "admin",
    component: AdmindashboardComponent
  },
  {
    path: "accessdenied",
    component: AccessDeniedComponent,
    data: {}
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "employeeform",
    children: [
      {
        path: ":type",
        component: EmployeeFormComponent
      },
      {
        path: "details/:empId",
        component: EmployeeFormComponent
      },
      {
        path: ":type/:empId",
        component: EmployeeFormComponent
      }
    ]
  },
  {
    path: "projectform",
    children: [
      {
        path: "create/:type",
        component: ProjectFormComponent
      },
      {
        path: "update/:type",
        component: ProjectFormComponent
      },
      {
        path: ":details/:projectId",
        component: ProjectFormComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
 

// const routes: Routes = [
//   {
//     path: "", redirectTo: "login", pathMatch: "full"
//   },
//   { path: "login", component: LoginComponent },
//   { path: "404", component:NotFoundComponent},
//   { path: "admin", canActivate: [AuthGuardService, RoleGuardService], data: {role: "Admin"},component: AdmindashboardComponent, children: [
//     {
//       path: "projects", component: ProjectComponent
//     },
//     {
//       path:"admin/timesheet",
//       component:TimesheetComponent
//     },
//     {
//       path: "admindashboard",
//       component: AdmindashboardComponent
//     },
//     {
//       path: "sidebar",
//       component: SidebarComponent
//     },
//     {
//       path: "myProfile",
//       component: MyprofileComponent
//     },
// {
//   path: "review",
//   component: ReviewComponent
// },
// { path: "", component: LoginComponent },
// {
//   path: "manager",
//   component: ReviewComponent
// },
// {
//   path: 'projectmanager',
//   component: ProjectManagerComponent
// },
// {
//   path: "employee",
//   component: EmployeedashboardComponent
// },
// {
//   path: "clevel",
//   component: DashboardComponent
// },
// // {
// //   path: "admin",
// //   component: AdmindashboardComponent,
// //   canActivate: [RoleGuardService],
// //   data: {role: 'Admin'}
// // },
// {
//   path: "accessdenied",
//   component: AccessDeniedComponent,
//   data: {}
// },
// {
//   path: "login",
//   component: LoginComponent
// },
// {
//   path: "employeeform",
//   children: [
//     {
//       path: ":type",
//       component: EmployeeFormComponent
//     },
//     {
//       path: "details/:empId",
//       component: EmployeeFormComponent
//     },
//     {
//       path: ":type/:empId",
//       component: EmployeeFormComponent
//     }
//   ],}
//   ]
// },
// //  nmbnm 
// { path: "clevel", canActivate: [AuthGuardService, RoleGuardService], data: {role: "C Level Manager"},component: DashboardComponent, children: [
//   {
//     path: "", redirectTo: "projects", pathMatch: 'full'
//   },
//   {
//        path: "review",
//        component: ReviewComponent
//      },
//   {
//     path: "projects", component: ProjectComponent
//   },
//   {
//     path:"timesheet",
//     component:TimesheetComponent
//   },
//   {
//     path: "sidebar",
//     component: SidebarComponent
//   },
//   {
//     path: "myProfile",
//     component: MyprofileComponent
//   },
// { path: "", component: LoginComponent },
// {
// path: 'projectmanager',
// component: ProjectManagerComponent
// },
// {
// path: "projects",
// component: ProjectComponent
// },
// // {
// //   path: "admin",
// //   component: AdmindashboardComponent,
// //   canActivate: [RoleGuardService],
// //   data: {role: 'Admin'}
// // },
// {
// path: "accessdenied",
// component: AccessDeniedComponent,
// },
// {
// path: "login",
// component: LoginComponent
// },
// {
// path: "employeeform",
// children: [
//   {
//     path: ":type",
//     component: EmployeeFormComponent
//   },
//   {
//     path: "details/:empId",
//     component: EmployeeFormComponent
//   },
//   {
//     path: ":type/:empId",
//     component: EmployeeFormComponent
//   }
// ]
// },
// {
//   path: "projectform",
//   children: [
//     {
//       path: "create/:type",
//       component: ProjectFormComponent
//     },
//     {
//       path: "update/:type",
//       component: ProjectFormComponent
//     },
//     {
//       path: ":projectId",
//       component: ProjectFormComponent
//     },
//     {
//       path: "**",
//       component: NotFoundComponent
//     }
//   ],}
// ]
// },

// // bfjmnmedfcbmjednn

// { path: "projects", canActivate: [AuthGuardService, RoleGuardService], data: {role: "Project Manager"},component: ProjectComponent, children: [
//   {
//     path: "", redirectTo: "projects", pathMatch: 'full'
//   },
//   {
//     path: "projects", component: ProjectComponent,pathMatch:'prefix'
//   },
//   {
//     path:"timesheet",
//     component:TimesheetComponent
//   },
//   {
//     path: "sidebar",
//     component: SidebarComponent
//   },
//   {
//     path: "myProfile",
//     component: MyprofileComponent
//   },
// { path: "", component: LoginComponent },
// {
// path: 'projectmanager',
// component: ProjectManagerComponent
// },
// {
// path: "projects",
// component: ProjectComponent
// },
// // {
// //   path: "admin",
// //   component: AdmindashboardComponent,
// //   canActivate: [RoleGuardService],
// //   data: {role: 'Admin'}
// // },
// {
// path: "accessdenied",
// component: AccessDeniedComponent,
// data: {}
// },
// {
// path: "login",
// component: LoginComponent
// },
// {
// path: "employeeform",
// children: [
//   {
//     path: ":type",
//     component: EmployeeFormComponent
//   },
//   {
//     path: "details/:empId",
//     component: EmployeeFormComponent
//   },
//   {
//     path: ":type/:empId",
//     component: EmployeeFormComponent
//   }
// ]
// },
// {
//   path: "projectform",
//   children: [
//     {
//       path: "create/:type",
//       component: ProjectFormComponent
//     },
//     {
//       path: "update/:type",
//       component: ProjectFormComponent
//     },
//     {
//       path: ":projectId",
//       component: ProjectFormComponent
//     }
//   ]
// },
// {
//   path: "**",
//   component: NotFoundComponent
// }
//   ],
// },
// {
//   path:"admin/projects",
//   component:ProjectComponent

// },
// {
//   path:"admin/timesheet",
//   component:TimesheetComponent
// },
// {
//   path:"projects",
//   component:ProjectComponent
// }
// ];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}