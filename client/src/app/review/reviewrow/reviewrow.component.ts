import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SendHttpRequestService } from "./../../services/send-http-request.service";
@Component({
  selector: "review-row",
  styleUrls: ["./reviewrow.component.scss", "../review.component.scss"],
  template: `
    <tr class="review-row">
      <td>
        {{ employee.empId }}
      </td>
      <td>
        {{ employee.projectId }}
      </td>
      <td>
        {{ employee.customerName }}
      </td>
      <td>
        {{ employee.billable }}
      </td>
      <td>
        {{ employee.date }}
      </td>
      <td>
        {{ employee.hours }}
      </td>
      <td>
      <a
          class="btn btn-primary"
          href="#"
          role="button"
          (click)="accept(this._id)"
          >Accept</a
        >
        <a
          class="btn btn-primary ml-1"
          href="#"
          role="button"
          (click)="reject(this._id)"
          >Reject</a
        >
      </td>
    </tr>
  `
})
export class ReviewRowComponent {
  @Input()
  employee: any;

  @Output()
  deleteEmp: EventEmitter<any> = new EventEmitter();

  deleteEmployee(empId: string) {
    this.deleteEmp.emit(empId);
  }
}
