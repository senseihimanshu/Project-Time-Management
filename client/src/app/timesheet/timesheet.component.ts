import { TimesheetService } from "./../services/timesheet.service";
import { Component, OnInit, ViewChild, Input } from "@angular/core";

//3rd party
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../services/employee.service";
import { SendHttpRequestService } from "../services/send-http-request.service";

@Component({
  selector: "table-editable",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.scss"]
})
export class TimesheetComponent implements OnInit {
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private httpService: SendHttpRequestService
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;

  empObjId: string;


  menus: any = [
    {
      title: "Employees",
      icon: "fa fa-users",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Employee"
        }
      ]
    },
    {
      title: "Projects",
      icon: "fa fa-book",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Project"
        },
        {
          title: "Show All Projects"
        }
      ]
    },
    {
      title: "Timesheets",
      icon: "fa fa-calendar",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Show All Timesheets"
        }
      ]
    }
  ];

  openDialog() {
    const dialogRef = this.dialog.open(TimesheetModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  tabularData() {
    let empId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data.empId;
    this.empObjId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data._id;
    console.log(empId);

    this.timesheetService.getTimesheet(empId).subscribe(res => {
      console.log(res);
    });
    // let obj = this._service.getTimesheet().subscribe(res => {
    //   this.timesheetList = res;
    //   console.log(res);
    //   console.log(this.timesheetList);
    // });
    // var curr = new Date(); // get current date
    // console.log(curr, "todays date");
    // var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    // var last = first + 4; // last day is the first day + 6

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    // var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    // firstday;
    // "Sun, 06 Mar 2011 12:25:40 GMT";
    // lastday;
    // "Sat, 12 Mar 2011 12:25:40 GMT";
    // console.log("daaayyyyssss", firstday, lastday, secondday);
    // console.log(obj);
  // tabularData(role:String) {
  //   if(role=='Admin'||role=='admin'){
  //   return this._service.getAllTimesheet().subscribe(res => {
  //     this.timesheetList = res;
  //   });
  // }

  // else{
  //   const empObjId= this.httpService.jsonDecoder(localStorage.getItem('Authorization')).data._id;
  //   return this._service.getTimesheet(empObjId).subscribe(res => {
  //     this.timesheetList = res;
  //   });
  // }

    // var curr = new Date(); // get current date
    // console.log(curr, "todays date");
    // var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    // var last = first + 4; // last day is the first day + 6

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    // var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    // firstday;
    // "Sun, 06 Mar 2011 12:25:40 GMT";
    // lastday;
    // "Sat, 12 Mar 2011 12:25:40 GMT";
    // console.log("daaayyyyssss", firstday, lastday, secondday);
  }

  ngOnInit() {
   // let role = this.httpService.jsonDecoder(localStorage.getItem('Authorization')).data.role[0];
   this.tabularData();
  }
}

export interface ITaskType {
  key: string;
  value: string;
}

@Component({
  selector: "app-timesheet-modal",
  templateUrl: "./modal.html",
  styleUrls: ["./modal.scss"]
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
    //Getting empId from token
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

  handleSave(timesheetData: any) {
    console.log(timesheetData, "timesheetData");
    this.timesheetService
      .createTimesheet(timesheetData, this.empObjId)
      .subscribe((response: any) => {
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
}
