import { IResponse } from './../../models/response.model';
import { Component, OnInit, Inject } from "@angular/core";

//3rd party
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";

import * as moment from "moment";

import { EmployeeService } from "../../services/employee.service";
import { SendHttpRequestService } from "../../services/send-http-request.service";
import { TimesheetService } from "./../../services/timesheet.service";

import { MAT_DIALOG_DATA } from "@angular/material";
import { ProjectManagerService } from "src/app/services/projectmanager.service";
import { jsonDecoder } from "src/app/utils/json.util";

export interface ITaskType {
  key: string;
  value: string;
}

@Component({
  selector: "app-timesheet-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class TimesheetModal implements OnInit {
  isDisabled = (date: NgbDate, current: { month: number }) =>
    moment(`${date.year}-${date.month}-${date.day}`).day() === 0 ||
    moment(`${date.year}-${date.month}-${date.day}`).day() === 6;

  response: any;

  startDate: string;
  endDate: string;
  numberOfDays: number = 0;
  datesArray: string[];
  empObjId: string;

  modalType: string = null;

  isOpen: boolean = false;

  project: any;

  projectArray: any = [];

  taskTypes: ITaskType[] = [
    {
      key: null,
      value: "Choose task type"
    },
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

  constructor(
    private timesheetService: TimesheetService,
    private projectManagerService: ProjectManagerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.empObjId = jsonDecoder(localStorage.getItem("Authorization"))._id;

    //subscribing to observable for getting the employee
    this.projectManagerService
      .getProjectsForCurrentStaffId(this.empObjId)
      .subscribe(response => {
        this.projectArray = response.payload.data.projects.map(project => {
          return {
            _id: project._id,
            projectId: project.projectId,
            projectName: project.projectName,
            projectManager: project.projectManager,
            clientName: project.clientName
          };
        });

        if(this.data && this.data.timesheetId){
              this.modalType = 'update';
            this.timesheetService.getTimesheetUsingRouteParams(this.data.timesheetId).subscribe((res) => {
              this.response = res.payload.data.timesheet;
              this.project = res.payload.data.timesheet.projectObjId;
              this.calculateNumberOfDays(this.response.startDate, this.response.endDate);
            });
        }
      });
  }

  formatData(data: any) {
    let weekObjArray = [];

    for (let dayOfWeek = 0; dayOfWeek < 5; dayOfWeek++) {
      weekObjArray.push({
        date: data[`date-${dayOfWeek}`],
        hours: data[`hours-${dayOfWeek}`],
        taskType: data[`task-type-${dayOfWeek}`],
        billable: data[`billable-${dayOfWeek}`]
      });
    }

    return {
      empObjId: this.empObjId,
      startDate: this.startDate || this.response.startDate,
      endDate: this.endDate || this.response.endDate,
      projectObjId: this.project,

      week: weekObjArray
    };
  }

  handleSave(timesheetData: any) {
    if(!this.project){
      Swal.fire('Choose Project before Submitting');
      return;
    }

    if(!this.startDate){
      Swal.fire('Choose Date before Submitting');
      return;
    }

    const dataToSave = this.formatData(timesheetData);

    this.timesheetService
      .createTimesheet(dataToSave)
      .subscribe((response: IResponse) => {
        Swal.fire(response.payload.message);
      });

  }

  convertDate(selectedDate: string) {
    this.startDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(1)
      .format("YYYY-MM-DD")
      .toString();
    this.endDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(5)
      .format("YYYY-MM-DD")
      .toString();

    this.endDate =
      moment(this.endDate) > moment(this.startDate).endOf("month")
        ? moment(this.startDate)
            .endOf("month")
            .format("YYYY-MM-DD")
        : this.endDate;
    this.timesheetService.getSpecificTimesheet(this.startDate).subscribe((res: IResponse) => {
      if(res.payload.data.timesheet){
        this.response = res.payload.data.timesheet;
        this.project = res.payload.data.timesheet.projectObjId;
      }
      
    });
    this.calculateNumberOfDays(this.startDate, this.endDate);
  }

  calculateNumberOfDays(startDate: string, endDate: string) {
    this.numberOfDays =
      Number(moment(endDate).format("DD")) -
      Number(moment(startDate).format("DD")) +
      1;

    this.datesArray = [];
    for (let i = 1; i <= this.numberOfDays; i++) {
      this.datesArray.push(
        moment(startDate)
          .day(i)
          .format("YYYY-MM-DD")
          .toString()
      );
    }
  }

  handleProjectData(project: any) {
    this.project = project;
  }

  fillProjectDropdown(form) {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      //Getting empId from token
    }

    this.handleProjectData(form);
  }

  returnClient(projectId: string) {
    return this.projectArray.filter(project => {
      return project._id === projectId;
    }).clientName;
  }
}
