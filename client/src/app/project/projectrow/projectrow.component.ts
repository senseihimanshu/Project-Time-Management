import { SendHttpRequestService } from './../../services/send-http-request.service';
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "project-row",
  styleUrls: ["./projectrow.component.scss", "../project.component.scss"],
  template: `
    <tr class="project-row">
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
  <td>
  <button
    class="show"
    [routerLink]="['/employeeform/details', employee.empId]"
  >
    <i class="fas fa-eye"></i>
  </button>
  </td>
  <td>
  <button
    class="edit"
    [routerLink]="['/employeeform', 'update', employee.empId]"
  >
    <i class="fas fa-pencil-alt"></i>
  </button>
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
