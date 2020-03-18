import { ServicesService } from "./services.service";
import { AuthGuardService } from "./guards/auth-guard.service";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { ReviewRowComponent } from "./review/reviewrow/reviewrow.component";
import { ProjectRowComponent } from "./project/projectrow/projectrow.component";
import { TableRowComponent } from "./admindashboard/tablerow/tablerow.component";
import { EmployeedashboardComponent } from "./employeedashboard/employeedashboard.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
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
import { from } from "rxjs";
import { RoleGuardService } from "./guards/role-guard.service";
import { ProjectManagerComponent } from "./project-manager/project-manager.component";
import { TimesheetWeekComponent } from './timesheet/timesheet-week/timesheet-week.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "timesheet",
    children: [
      {
        path: '',
        component: TimesheetComponent,
        pathMatch: 'full'
      },
      {
        path: ':timesheetId',
        component: TimesheetComponent 
      
      }
    ]
  },
  {
    path: "timesheetweek",
    component: TimesheetWeekComponent,
   
  },
  {
    path: "sidebar",
    component: SidebarComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "myProfile",
    component: MyprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "review",
    component: ReviewComponent,
    canActivate:[AuthGuard],
    data: { 
      expectedRole: 'project manager'
    } 
  },
  {
    path: "manager",
    component: ReviewComponent,
    canActivate:[AuthGuard],
    data: { 
      expectedRole: 'project manager'
    } 
  },
  {
    path: "projectmanager",
    component: ProjectManagerComponent,
    canActivate:[AuthGuard],
    data: { 
      expectedRole: 'project manager'
    } 
  },
  {
    path: "projects",
    component: ProjectComponent,
    canActivate:[AuthGuard],
   
  },
  {
    path: "employee",
    component: EmployeedashboardComponent,
    canActivate:[AuthGuard],
    data: { 
      expectedRole: 'employee'
    } 
  },
  {
    path: "clevel",
    component: DashboardComponent,
     canActivate:[AuthGuard],
    data: { 
      expectedRole: 'c-level'
    }  
  },
  {
    path: "admin",
    component: AdmindashboardComponent,
    canActivate:[AuthGuard],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: "accessdenied",
    component: AccessDeniedComponent,
    data: {},
    canActivate:[AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "employee",
    children: [
      {
        path: ":type",
        component: EmployeeFormComponent,
        
        
      },
      {
        path: "details/:empId",
        component: EmployeeFormComponent,
        
      },
      {
        path: ":type/:empId",
        component: EmployeeFormComponent,
      }
    ],
    canActivate:[AuthGuard],
        data: { 
          expectedRole: 'admin'
        } 
  },
  {
    path: "project",
    children: [
      {
        path: "",
        component: ProjectComponent,
        pathMatch: 'full'
      },
      {
        path: ":type",
        component: ProjectFormComponent
      },
      {
        path: "details/:projectId",
        component: ProjectFormComponent
      },
      {
        path: ":type/:projectId",
        component: ProjectFormComponent,
       
      }
    ],
    canActivate:[AuthGuard],
    data:{
        expectedRole:"admin"
    }
  },
  {
    path: "**",
    component: NotFoundComponent,
    
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
