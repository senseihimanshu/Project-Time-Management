import { Component, OnInit } from "@angular/core";

//3rd party
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2'

import * as moment from "moment";

import { EmployeeService } from "../../services/employee.service";
import { SendHttpRequestService } from "../../services/send-http-request.service";
import { TimesheetService } from "./../../services/timesheet.service";

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

  startDate: string;
  endDate: string;
  numberOfDays: number = 0;
  datesArray: string[];
  empObjId: string;

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
    private employeeService: EmployeeService,
    private timesheetService: TimesheetService,
    private httpService: SendHttpRequestService
  ) {}

  ngOnInit(): void {
    let empId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data.empId;
    this.empObjId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data._id;
    console.log(empId);

    //subscribing to observable for getting the employee
    this.employeeService.getEmployee(empId).subscribe(response => {
      console.log(response);
      this.projectArray = response.employee.projectId.map(project => {
        return {
          _id: project._id,
          projectName: project.projectName,
          projectManager: project.projectManager,
          clientName: project.clientName
        };
      });

      console.log(this.projectArray);
    });
  }

  formatData(data: any) {
    let weekObjArray = [];

    for (let dayOfWeek = 0; dayOfWeek < 5; dayOfWeek++) {
      weekObjArray.push({
        projectId:
          data[`project-${dayOfWeek}`] && data[`project-${dayOfWeek}`]._id,
        date: data[`date-${dayOfWeek}`],
        hours: data[`hours-${dayOfWeek}`],
        taskType: data[`task-type-${dayOfWeek}`],
        billable: data[`billable-${dayOfWeek}`],
        clientName:
          data[`project-${dayOfWeek}`] &&
          data[`project-${dayOfWeek}`].clientName
      });
    }

    return {
      empObjId: this.empObjId,
      startDate: this.startDate,
      endDate: this.endDate,
      week: weekObjArray
    };
  }

  handleSave(timesheetData: any) {
    const dataToSave = this.formatData(timesheetData);
    console.log(dataToSave, 'dataToSave inside handleSave');

    this.timesheetService
      .createTimesheet(dataToSave)
      .subscribe((response: any) => {
        Swal.fire(response.payload.message);
        console.log(response);
      });
  }

  convertDate(selectedDate: string) {
    this.startDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(1)
      .format("YYYY-MM-DD")
      .toString();
    console.log(this.startDate);
    this.endDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(5)
      .format("YYYY-MM-DD")
      .toString();
    console.log(this.endDate);

    this.endDate =
      moment(this.endDate) > moment(this.startDate).endOf("month")
        ? moment(this.startDate)
            .endOf("month")
            .format("YYYY-MM-DD")
        : this.endDate;

    this.numberOfDays =
      Number(moment(this.endDate).format("DD")) -
      Number(
        moment(
          `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
        )
          .day(1)
          .format("DD")
      ) +
      1;

    this.datesArray = [];
    for (let i = 1; i <= this.numberOfDays; i++) {
      this.datesArray.push(
        moment(
          `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
        )
          .day(i)
          .format("YYYY-MM-DD")
          .toString()
      );
    }

    console.log(this.numberOfDays, this.datesArray);
  }

  handleProjectData(project: any) {
    console.log(project);
    this.project = project;
  }

  fillProjectDropdown(form) {
    console.log(this.isOpen, form, "form");
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      console.log("Inside fillProjectDropdown()");
      //Getting empId from token
    }

    this.handleProjectData(form);
  }
}
