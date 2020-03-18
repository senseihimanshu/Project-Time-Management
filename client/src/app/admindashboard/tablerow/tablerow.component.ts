import { Component, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: "table-row",
  styleUrls: ["./tablerow.component.scss", "../admindashboard.component.scss"],
  template: `
    <tr class="table-row">
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
        {{ employee.role }}
      </td>
      <td>
        <a
          [routerLink]="['/employee/details', employee.empId]"
        >
          <i class="fas fa-eye"></i>
        </a>
      </td>
      <td>
        <a class="edit" [routerLink]="['/employee', 'update', employee.empId]">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </td>
      <td>
        <a class="delete" (click)="deleteEmployee(employee.empId)"><i class="fas fa-trash"></i></a>
      </td>
    </tr>
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
