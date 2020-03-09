import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { TimesheetComponent, TimesheetModal } from "./timesheet.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

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
  providers: []
})
export class TimesheetModule {}
