
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
        path: ":type/:projectId",
        component: ProjectFormComponent
      },
      {
        path: ":type/:projectId",
        component: ProjectFormComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
 


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}