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

import { TimesheetModal } from "./modal/modal.component";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../services/employee.service";
import { SendHttpRequestService } from "../services/send-http-request.service";
import {  RouterLink } from "@angular/router";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    private httpService: SendHttpRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;

  empObjId: string;
  name = "Angular";
  page = 1;
  pageSize = 10;
  items = [];

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


    let timesheetId: string = null;

    this.route.params.subscribe((data: Params) => {
      timesheetId = data.timesheetId;
    });

    if(timesheetId){
      this.timesheetService.getTimesheetUsingRouteParams(timesheetId).subscribe((res) => {
        console.log(res);
        this.response = res.payload.data.timesheet;
      });
      return;
    }
    
    this.timesheetService.getTimesheet(this.empObjId).subscribe(res => {
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
}





///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////Previous Code by some team mate------------------------
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
