import { ServicesService } from './services.service';
// import { NewwComponent } from './neww/neww.component';
// import { MbscModule } from '@mobiscroll/angular-lite';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { SendHttpRequestService } from "./services/send-http-request.service";
//import { AuthorizationService } from './services/authorization.service';
import { ChartsModule } from 'ng2-charts';
//Third Party Components
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  MDBBootstrapModule,
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
  TableModule,
 
} from "angular-bootstrap-md";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { ReviewComponent } from "./review/review.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { EmployeeFormComponent } from "./main/employee-form/employee-form.component";
import { EmployeeService } from "./services/employee.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { ClevelDashboardModule } from "./main/clevel-dashboard/clevel-dashboard.module";
import { ClevelDashboardComponent } from "./main/clevel-dashboard/clevel-dashboard.component";
import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ProjectComponent } from "./project/project.component";
import { ProjectFormComponent } from "./project-form/project-form.component";
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotFoundComponent } from "./404/notfound.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule
} from "@angular/material";
import { TableRowComponent } from "./admindashboard/tablerow/tablerow.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectRowComponent } from './project/projectrow/projectrow.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { ReviewRowComponent } from './review/reviewrow/reviewrow.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { RoleGuardService } from './guards/role-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    // NewwComponent,
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    EmployeeFormComponent,
    HomeComponent,
    ReviewComponent,
    DashboardComponent,
    AccessDeniedComponent,
    AdmindashboardComponent,
    ProjectComponent,
    ProjectFormComponent,
    MyprofileComponent,
    NotFoundComponent,
    TableRowComponent,
    SidebarComponent,
    ProjectRowComponent,
    EmployeedashboardComponent,
    TimesheetComponent,
    ReviewRowComponent,
    ProjectManagerComponent,
   
  ],
  imports: [PerfectScrollbarModule ,
    NgbModule,
    // MbscModule,
    //PerfectScrollbarConfigInterface,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClevelDashboardModule,
    ChartsModule,
    //Third Party
    MDBBootstrapModule.forRoot(),
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    // NgMultiSelectDropDownModule.forRoot(),
    // JwtModule.forRoot({}),
    //Third Party
    MDBBootstrapModule.forRoot(),
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [ServicesService, AuthGuardService, RoleGuardService],
  bootstrap: [AppComponent]
  // entryComponents: [TimesheetComponent]
})
export class AppModule {}
