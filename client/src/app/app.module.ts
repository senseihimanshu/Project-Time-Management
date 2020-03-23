import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatToolbarModule, MatDialogRef } from "@angular/material";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from "@angular/material/select";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule, CardsModule, CheckboxModule, IconsModule, InputsModule, MDBBootstrapModule, TableModule, WavesModule } from "angular-bootstrap-md";
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NotFoundComponent } from "./404/notfound.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { TableRowComponent } from "./admindashboard/tablerow/tablerow.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { RoleGuardService } from './guards/role-guard.service';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ClevelDashboardModule } from "./main/clevel-dashboard/clevel-dashboard.module";
import { EmployeeFormComponent } from "./main/employee-form/employee-form.component";
import { MainComponent } from "./main/main.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectComponent } from "./project/project.component";
import { ProjectRowComponent } from './project/projectrow/projectrow.component';
import { ReviewComponent } from "./review/review.component";
import { ReviewRowComponent } from './review/reviewrow/reviewrow.component';
import { ServicesService } from './services.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimesheetModal } from './timesheet/modal/modal.component';
import { TimesheetWeekComponent } from './timesheet/timesheet-week/timesheet-week.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  declarations: [
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
    TimesheetModal,
    NavbarComponent,
    TimesheetWeekComponent
   
  ],
  imports: [PerfectScrollbarModule ,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClevelDashboardModule,
    ChartsModule,
    MatSelectModule,
    
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
    MatCheckboxModule
  ],
  providers: [ServicesService, RoleGuardService,AuthGuard, NgbActiveModal],
entryComponents: [TimesheetModal],
  bootstrap: [AppComponent]
  // entryComponents: [TimesheetComponent]
})
export class AppModule {}