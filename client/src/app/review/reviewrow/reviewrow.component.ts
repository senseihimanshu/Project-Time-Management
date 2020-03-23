import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "review-row",
  styleUrls: ["./reviewrow.component.scss", "../review.component.scss"],
  template: `
    <tr class="review-row">
      <td>
        {{ timesheet.employeeName }}
      </td>
      <td>
        {{ timesheet.projectName }}
      </td>
      <td>
        {{ timesheet.clientName }}
      </td>
      <td>
        <a class="view-btn" [routerLink]="['/timesheet', timesheet._id]"
        ><i class="fas fa-eye">
        </i></a>
      </td>
      <td>
        <a
          class="btn btn-primary text-white"
          role="button"
          (click)="accept(timesheet._id)"
          >Accept</a
        >
        <a
          class="btn btn-primary ml-1 text-white"
          role="button"
          (click)="reject(timesheet._id)"
          >Reject</a
        >
      </td>
    </tr>
  `
})
export class ReviewRowComponent {
  constructor() {}
  @Input()
  timesheet: any;

  @Output()
  deleteEmp: EventEmitter<any> = new EventEmitter();

  deleteTimesheet(empId: string) {
    this.deleteEmp.emit(empId);
  }
  usersArray: any;
  accept(data) {
    let obj = {
      _id: data,
      status: "Approved"
    };
  }

  reject(data) {
    let obj = {
      _id: data,
      status: "Declined"
    };
  }
}
