import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IProject } from "../models/project.interface";
import { ITaskType } from "../models/task-type.interface";

@Component({
  selector: "app-timesheet-form",
  styleUrls: ["./timesheet-form.component.scss"],
  templateUrl: './timesheet-form.component.html'
})
export class TimesheetFormComponent {
  @Input()
  timesheet: any;

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  projects: IProject[];
  taskTypes: ITaskType[] = [
    {
      key: "offshore",
      value: "Off Shore"
    },
    {
      key: "onsite",
      value: "On Site"
    },
    {
      key: "earned-leave",
      value: "Earned Leave"
    },
    {
      key: "casual-leave",
      value: "Casual Leave"
    },
    {
      key: "sick-leave",
      value: "Sick Leave"
    }
  ];


  handleSubmit(timesheet){
    this.submit.emit(timesheet);
  }

}
