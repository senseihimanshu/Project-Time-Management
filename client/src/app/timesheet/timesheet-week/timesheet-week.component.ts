import { Component } from "@angular/core";

import { TimesheetService } from "../../services/timesheet.service";

//3rd party
import {
  NgbModal,
  ModalDismissReasons,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";

import { TimesheetModal } from "./../modal/modal.component";

import { MatDialog } from "@angular/material/dialog";
import { SendHttpRequestService } from "../../services/send-http-request.service";
import * as moment from "moment";

@Component({
  selector: "app-timesheet-week",
  styleUrls: ["./timesheet-week.component.scss"],
  templateUrl: "./timesheet-week.component.html"
})
export class TimesheetWeekComponent {
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private httpService: SendHttpRequestService
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;
  page: number = 4;
  pageSize: number = 6;
  empObjId: string;

  isSortDecreasing: boolean = false;

  response: any;

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

  openDialog(timesheetId: string) {
    const dialogRef = this.dialog.open(TimesheetModal, {
      data: {
        timesheetId: timesheetId
      }
    });

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

    this.timesheetService.getTimesheet(this.empObjId, "week").subscribe(res => {
      console.log(res);
      this.response = res.payload.data.timesheet;
    });
  }

  ngOnInit() {
    let role = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data.role[0];
    this.tabularData();
  }

  filterList(date: any) {
    console.log(date);
    this.timesheetService
      .getSpecificTimesheets(this.empObjId, date)
      .subscribe(res => {
        console.log(res);
        this.response = res.payload.data.filteredTimesheets;
        console.log(this.response);
      });
  }

  sortList() {
    this.isSortDecreasing = !this.isSortDecreasing;

    this.isSortDecreasing
      ? this.response.sort((first, second) => {
          return moment(first.startDate, "DD/MM/YYYY") > moment(second.startDate, "DD/MM/YYYY");
        })
      : this.response.sort((first, second) => {
          return moment(second.startDate, "DD/MM/YYYY") > moment(first.startDate, "DD/MM/YYYY");
        });

    console.log(this.response);
  }
}
