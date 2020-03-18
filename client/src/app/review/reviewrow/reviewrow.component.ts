import { Component, Input, Output, EventEmitter } from "@angular/core";
import {SendHttpRequestService } from "./../../send-http-request.service";
@Component({
  selector: "review-row",
  styleUrls: ["./reviewrow.component.scss", "../review.component.scss"],
  template: `
    <tr class="review-row">
      <td>
        {{ employee.empId }}
      </td>
      <td>
        {{ employee.week.projectId }}
      </td>
      <td>
        {{ employee.customerName }}
      </td>
      <td>
        {{ employee.billable }}
      </td>
      <td>
        {{ employee.startDate | date }}
      </td>
      <td>
        {{ employee.week[0].hours }}
      </td>
      <td>
      <a
          class="btn btn-primary text-white"
          role="button"
          (click)="accept(employee._id)"
          >Accept</a
        >
        <a
          class="btn btn-primary ml-1 text-white" 
          role="button"
          (click)="reject(employee._id)"
          >Reject</a
        >
      </td>
    </tr>
  `
})
export class ReviewRowComponent {
  constructor(private _service:SendHttpRequestService)
  {}
  @Input()
  employee: any;

  @Output()
  deleteEmp: EventEmitter<any> = new EventEmitter();

  deleteEmployee(empId: string) {
    this.deleteEmp.emit(empId);
  }
  usersArray:any;
  accept(data) {
    let obj = {
      _id: data,
      status: "Approved"
    };

    this.sendReq(obj);
  }
      
  reject(data) {
    let obj = {
      _id: data,
      status: "Declined"
    };
    this.sendReq(obj);
  }
  sendReq(data) {
    let obj = this._service.reviewRequest(data).subscribe(res => {
      this.usersArray = res;
      alert(data.status);
    });
  }
}
