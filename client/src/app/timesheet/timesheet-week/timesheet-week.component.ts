import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
//3rd party
import { jsonDecoder } from "src/app/utils/json.util";
import { TimesheetService } from "../../services/timesheet.service";
import { IResponse } from './../../models/response.model';
import { TimesheetModal } from "./../modal/modal.component";


@Component({
  selector: "app-timesheet-week",
  styleUrls: ["./timesheet-week.component.scss"],
  templateUrl: "./timesheet-week.component.html"
})
export class TimesheetWeekComponent {
  constructor(
    private timesheetService: TimesheetService,
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

  sortAccordingTo: any = { startDate: this.isSortDecreasing ? 1 : -1 };
  openDialog(timesheetId: string) {
    const dialogRef = this.dialog.open(TimesheetModal, {
      data: {
        timesheetId: timesheetId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tabularData();
    });
  }

  tabularData() {
    this.empObjId = jsonDecoder(localStorage.getItem("Authorization"))._id;

    if(this.role === "admin"){
      this.timesheetService.getTimesheet({page: this.page.toString(), limit: this.limit.toString(), sort: JSON.stringify(this.sortAccordingTo), criteria: JSON.stringify({}), columns: JSON.stringify({})}).subscribe((res) => {
        this.timesheet = res.payload.data.result;
        this.dataSize = res.payload.data.result.dataSize;
      });
      return;
    }

    this.timesheetService
      .getTimesheet({
        page: this.page.toString(),
        limit: this.limit.toString(),
        criteria: JSON.stringify({ empObjId: this.empObjId }),
        columns: JSON.stringify({}),
        sort: JSON.stringify(this.sortAccordingTo)
      })
      .subscribe((res: IResponse) => {
        this.timesheet = res.payload.data.result;
        this.dataSize = res.payload.data.result.dataSize;
      });
  }

  ngOnInit() {
    this.role = jsonDecoder(localStorage.getItem("Authorization")).role;
    this.tabularData();
  }

  filterList(date: any) {
    if (!date) {
      date = { year: 2000, month: 1, day: 1 };
    }
    date = `${date.year}-${date.month}-${date.day}`;

    this.sortAccordingTo = { startDate: this.isSortDecreasing ? 1 : -1 };

    this.timesheetService
      .getTimesheet({
        page: this.page.toString(),
        limit: this.limit.toString(),
        criteria: JSON.stringify({ empObjId: this.empObjId,  startDate: {$gte: date} }),
        columns: JSON.stringify({}),
        sort: JSON.stringify(this.sortAccordingTo)
      })
      .subscribe(res => {
        this.timesheet = res.payload.data.result;
      });
  }

  sortList() {
    this.isSortDecreasing = !this.isSortDecreasing;
    this.sortAccordingTo = { startDate: this.isSortDecreasing ? 1 : -1 };
    this.tabularData();
  }

  handlePaginationResult(type: string) {
    if (type === "prev") {
      if (this.page > 1) {
        this.page--;
        this.tabularData();
      }
    }
    if (type === "next") {
      if (this.dataSize > this.page * this.limit) {
        this.page++;
        this.tabularData();
      }
    }
  }
}
