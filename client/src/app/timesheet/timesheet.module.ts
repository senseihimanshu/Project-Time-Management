import { ServicesService } from './../services.service';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { TimesheetComponent, TimesheetModal } from "./timesheet.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RoleGuardService } from "./../guards/role-guard.service";
import { AuthGuardService } from "./../guards/auth-guard.service";
// import { MatTableModule } from "@angular/material/table";
//import { MyprofileComponent } from '../myprofile/myprofile.component';
@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetModal
    //   MyprofileComponent
  ],
  imports: [FormsModule, CommonModule, NgbDate, NgModule],
  exports: [TimesheetComponent, TimesheetModal],
  providers: [ServicesService, AuthGuardService, RoleGuardService],

})
export class TimesheetModule {}
