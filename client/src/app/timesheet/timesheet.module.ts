import { ServicesService } from "./../services.service";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { TimesheetComponent } from "./timesheet.component";
import { TimesheetModal } from "./modal/modal.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RoleGuardService } from "./../guards/role-guard.service";
import { AuthGuardService } from "./../guards/auth-guard.service";
import { TimesheetWeekComponent } from './timesheet-week/timesheet-week.component';

@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetModal,
    TimesheetWeekComponent
    //   MyprofileComponent
  ],
  imports: [FormsModule, CommonModule, NgbDate],
  exports: [TimesheetComponent, TimesheetModal, TimesheetWeekComponent],
  providers: [ServicesService, AuthGuardService, RoleGuardService]
})
export class TimesheetModule {}
