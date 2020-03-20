import { Component, OnInit, OnChanges } from "@angular/core";
import { TimesheetService } from '../services/timesheet.service';
import { jsonDecoder } from '../utils/json.util';
import swal from "sweetalert2";
import { IResponse } from '../models/response.model';


@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  message: String;
  constructor(
    private timesheetService: TimesheetService
  ) {}
  timesheetArray: any;

  page: number = 1;
  limit: number = 5;
  dataSize: number;

  isSortDecreasing: boolean = false;
  sortAccordingTo: any = { startDate: this.isSortDecreasing ? 1 : -1 };

  reviews() {
    this.timesheetService.getStaffTimesheets(
      {
        page: this.page.toString(),
        limit: this.limit.toString(),
        criteria: JSON.stringify({ managerId: jsonDecoder()._id }),
        columns: JSON.stringify({}),
        sort: JSON.stringify({})
      }
    ).subscribe(res => {
      this.timesheetArray = res.payload.data.result.results;
      this.dataSize = res.payload.data.result.dataSize;
    });
  }

  ngOnInit() {
    this.reviews();
  }

  updateStatus(status: boolean, timesheetId: string){
    this.timesheetService.updateStatus(status, timesheetId).subscribe((res: IResponse) => {
      swal.fire({
        icon: "success",
        title: status? "Timesheet Approved" : "Timesheet Declined" 
      });

      this.reviews();

    });
  }

  handlePaginationResult(type: string) {
    if (type === "prev") {
      if (this.page > 1) {
        this.page--;
        this.reviews();
      }
    }
    if (type === "next") {
      if (this.dataSize > this.page * this.limit) {
        this.page++;
        this.reviews();
      }
    }
  }

  // sortList() {
  //   this.isSortDecreasing = !this.isSortDecreasing;
  //   this.sortAccordingTo = { startDate: this.isSortDecreasing ? 1 : -1 };
  //   this.reviews();
  // }

}
