import { Component, Input } from "@angular/core";
import { IProject } from "../models/project.interface";
import { ITaskType } from "../models/task-type.interface";

@Component({
  selector: "app-timesheet-form",
  styleUrls: ["./timesheet-form.component.scss"],
  template: `
    <form class="timesheet-form" #form="ngForm" novalidate>
      <div>
        Customer Name:
        <select>
          <option *ngFor=""></option>
        </select>
      </div>
      <div>
        Project Name:
        <select name="project" [ngModel]="" #project="ngModel">
          <option
            *ngFor="let project of projects"
            [value]="project?.projectName"
            [selected]="project?.projectName"
            >{{ project.projectName }}</option
          >
        </select>
        <div class="error" *ngIf="project.errors?.required && project.dirty">
          Choose atleast a project
        </div>
      </div>

      <div>
        Task Type:
        <select
          name="task-type"
          [ngModel]="timesheet?.taskType"
          required
          #taskType="ngModel"
        >
          <option
            *ngFor="let taskType of taskTypes"
            [value]="taskType.key"
            [selected]="timesheet?.taskType === taskType.key"
            >{{ taskType.value }}</option
          >
        </select>
        <div class="error" *ngIf="taskType.errors?.required && taskType.dirty">
          Choose Type of Task
        </div>
      </div>

      <div>
        Billable:
        <input
          name="billable"
          type="checkbox"
          [ngModel]="timesheet?.billable || false"
        />
      </div>

      <div>
        Company Name:
        <input
          type="text"
          name="companyName"
          [ngModel]="timesheet?.companyName"
          required
          #companyName="ngModel"
        />
        <div
          class="error"
          *ngIf="companyName.errors?.required && companyName.dirty"
        >
          Fill Company Name of which the project belongs
        </div>
      </div>

      <div>
        Start Date:
        <input
          type="date"
          name="startDate"
          required
          #startDate="ngModel"
          [ngModel]="timesheet?.startDate"
        />
        <div
          class="error"
          *ngIf="startDate.errors?.required && startDate.dirty"
        >
          Choose start date of the project
        </div>
      </div>

      <div>
        End Date:
        <input
          type="date"
          name="endDate"
          [ngModel]="timesheet?.endDate"
          required
          #endDate="ngModel"
        />
        <div class="error" *ngIf="endDate.errors?.required && endDate.dirty">
          Choose End Date of the project
        </div>
      </div>

      <div>
        No. of hours:
        <input
          type="number"
          name="noOfHours"
          min="0"
          max="40"
          required
          #noOfHours="ngModel"
          [ngModel]="timesheet?.noOfHours"
          onkeydown="return false"
        />
        <div
          class="error"
          *ngIf="noOfHours.errors?.required && noOfHours.dirty"
        >
          Fill no. of hours you worked on it
        </div>
        {{ noOfHours.errors | json }}
        {{ form.value | json }}
      </div>

      <div>
        Description:
        <input
          type="text"
          name="description"
          [ngModel]="timesheet?.description"
        />
      </div>

      <button
        type="submit"
        [disabled]="!form.valid"
        [ngClass]="!form.valid && 'disabled'"
      >
        Create Timesheet
      </button>
    </form>
  `
})
export class TimesheetFormComponent {
  @Input()
  timesheet: any;
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

}
