import { IResponse } from './../models/response.model';
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
import { RouterLink } from "@angular/router";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { jsonDecoder } from '../utils/json.util';
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
    private router: Router,
    private route: ActivatedRoute
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;

  role: string;

  empObjId: string;
  name = "Angular";
  page = 1;
  pageSize = 10;
  items = [];
  response: any;

  openDialog() {
    const dialogRef = this.dialog.open(TimesheetModal);

    dialogRef.afterClosed().subscribe(result => {
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

  empName: string = null;

  tabularData() {
    this.empObjId = jsonDecoder(
      localStorage.getItem("Authorization")
    )._id;

    this.empName = jsonDecoder(
      localStorage.getItem("Authorization")
    ).name;

    let timesheetId: string = null;

    this.route.params.subscribe((data: Params) => {
      timesheetId = data.timesheetId;
    });

    if (timesheetId) {
      this.timesheetService
        .getTimesheetUsingRouteParams(timesheetId)
        .subscribe(res => {
          this.response = [res.payload.data.timesheet];
        });
      return;
    }

    this.timesheetService
      .getTimesheet({
        criteria: JSON.stringify({ _id: timesheetId }),
        columns: JSON.stringify({}),
        page: String(1),
        limit: String(-1),
        sort: JSON.stringify({ date: -1 })
      })
      .subscribe((res: IResponse) => {
        this.response = res.payload.data.timesheet;
      });
  }

  ngOnInit() {
    this.role = jsonDecoder(
      localStorage.getItem("Authorization")
    ).role;
    this.tabularData();
  }
}
