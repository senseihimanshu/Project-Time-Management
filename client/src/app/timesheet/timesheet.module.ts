import { NgModule } from "@angular/core";
import { TimesheetComponent } from "./timesheet.component";
import { TimesheetFormComponent } from "./timesheet-form/timesheet-form.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//import { MyprofileComponent } from '../myprofile/myprofile.component';

@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetFormComponent
    //   MyprofileComponent
  ],
  imports: [FormsModule, CommonModule],
  exports: [TimesheetComponent],
  providers: []
})
export class TimesheetModule {}
