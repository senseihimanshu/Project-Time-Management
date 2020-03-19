import { ServicesService } from "./../services.service";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { TimesheetComponent } from "./timesheet.component";
import { TimesheetModal } from "./modal/modal.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TimesheetWeekComponent } from "./timesheet-week/timesheet-week.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [TimesheetComponent, TimesheetModal, TimesheetWeekComponent],
  imports: [FormsModule, CommonModule, NgbDate, MatCheckboxModule],
  exports: [TimesheetComponent, TimesheetModal, TimesheetWeekComponent],
  providers: [ServicesService]
})
export class TimesheetModule {}
