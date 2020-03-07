import { TimesheetService } from "./../services/timesheet.service";
import { Component, OnInit } from "@angular/core";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";

@Component({
  selector: "table-editable",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.scss"]
})
export class TimesheetComponent implements OnInit {
  startDate: string;
  endDate: string;

  constructor(
    private _service: TimesheetService,
    private modalService: NgbModal
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;

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
    let obj = this._service.getTimesheet().subscribe(res => {
      this.timesheetList = res;
      console.log(res);
      console.log(this.timesheetList);
    });
    var curr = new Date(); // get current date
    console.log(curr, "todays date");
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 4; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    firstday;
    "Sun, 06 Mar 2011 12:25:40 GMT";
    lastday;
    "Sat, 12 Mar 2011 12:25:40 GMT";
    console.log("daaayyyyssss", firstday, lastday, secondday);
    console.log(obj);
  }

  // findweek(){
  //   var curr = new Date;
  //   var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  //   var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
  
  // console.log(firstday,lastday);
  // }
  
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
    // this.startDate = moment()
  }

  ngOnInit() {
    this.tabularData();
  }
}
