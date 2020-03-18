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
import { jsonDecoder } from 'src/app/utils/json.util';

@Component({
  selector: "app-timesheet-week",
  styleUrls: ["./timesheet-week.component.scss"],
  templateUrl: "./timesheet-week.component.html"
})
export class TimesheetWeekComponent {
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;
  
  page: number = 1;
  limit: number = 5;
  dataSize: number;

  empObjId: string;

  isSortDecreasing: boolean = false;

  timesheet: any;

  role: string;

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
      .open(content, { windowClass : "myCustomModalClass"})
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
    this.empObjId = jsonDecoder(
      localStorage.getItem("Authorization")
    )._id;

      // if(this.role === "Admin"){
      //   this.timesheetService.getAllTimesheet("week", this.page.toString(), this.limit.toString(), this.isSortDecreasing.toString()).subscribe((res) => {
      //     console.log(res);
      //   });
      //   return;
      // }

    this.timesheetService.getTimesheet({page: this.page.toString(), limit: this.limit.toString(), criteria: JSON.stringify({})}).subscribe((res: IResponse) => {
   
      this.timesheet = res.payload.data.timesheet;
      this.dataSize = res.payload.data.result.dataSize;
    });
  }

  ngOnInit() {
    this.role = jsonDecoder(
      localStorage.getItem("Authorization")
    ).role;
    this.tabularData();
  }

  filterList(date: any) {
    if(!date){
        date = {year: 2000, month: 1, day: 1}
    }
    this.timesheetService
      .getSpecificTimesheets(this.empObjId, date)
      .subscribe(res => {
        this.timesheet = res.payload.data.filteredTimesheets;
      });
  }

  sortList() {
    this.isSortDecreasing = !this.isSortDecreasing;

    this.tabularData();
  }

  handlePaginationResult(type: string){
    if(type === 'prev'){
        if(this.page > 1){
            this.page--;
            this.tabularData();
        }
    }
    if(type === 'next'){
        if(this.dataSize > this.page * this.limit){
            this.page++;
            this.tabularData();
        }
    }
  }
}
