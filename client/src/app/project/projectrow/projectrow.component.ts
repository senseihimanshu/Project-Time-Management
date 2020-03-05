import { SendHttpRequestService } from './../../services/send-http-request.service';
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "project-row",
  styleUrls: ["./projectrow.component.scss", "../project.component.scss"],
  template: `
    <tr class="project-row">
    <td>
    {{project.clientName}}
  </td>
  <td>
    {{project.projectName}}
  </td>
  <td>
    {{project.projectManager}}
  </td>
  <td>
    {{project.startDate}}
  </td>
  <td>
    {{project.endDate}}
  </td>
  <td>
    {{project.status}}
  </td>
    </tr>
  `
})
export class ProjectRowComponent {

  @Input()
  project: any;

  @Output()
  deleteEmp: EventEmitter<any> = new EventEmitter();

  deleteEmployee(empId: string){
      this.deleteEmp.emit(empId);
  }
}
