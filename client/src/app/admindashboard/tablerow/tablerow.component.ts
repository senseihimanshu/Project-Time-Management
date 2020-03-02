import { Component, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: "table-row",
  styleUrls: ["./tablerow.component.scss", "../admindashboard.component.scss"],
  template: `
    <div class="table-row">
      <td>
        {{ employee.empId }}
      </td>
      <td>
        {{ employee.name }}
      </td>
      <td>
        {{ employee.email }}
      </td>
      <td>
        {{ employee.designation }}
      </td>
      <td>
        {{ employee.role }}
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
        <button class="edit" [routerLink]="['/employeeform', 'update', employee.empId]">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </td>
      <td>
        <button class="delete" (click)="deleteEmployee(employee.empId)"><i class="fas fa-trash"></i></button>
      </td>
    </div>
  `
})
export class TableRowComponent {
  @Input()
  employee: any;

  @Output()
  deleteEmp: EventEmitter<any> = new EventEmitter();

  deleteEmployee(empId: string){
      this.deleteEmp.emit(empId);
  }
}
