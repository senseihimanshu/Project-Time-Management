import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectComponent } from "./project/project.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { EmployeeFormComponent } from "./main/employee-form/employee-form.component";
import { LoginComponent } from "./login/login.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { ReviewComponent } from "./review/review.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { NotFoundComponent } from "./404/notfound.component";
//import { AuthorizationGuard } from './authorization.guard';

const routes: Routes = [
  {
    path: "admindashboard",
    component: AdmindashboardComponent
  },
  {
    path: "sidebar",
    component: SidebarComponent
  },
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
    path: "projects",
    component: ProjectComponent
  },
  {
    path: "employee",
    component: TimesheetComponent
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
        path: ":projectId",
        component: ProjectFormComponent
      }
    ]
  },
  {
    path: 'timesheet',
    component: TimesheetComponent
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
