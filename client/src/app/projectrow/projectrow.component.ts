import { Component, OnInit } from '@angular/core';

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
          [routerLink]="['/employeeform/details', employee.empId]"
        >
          <i class="fas fa-eye"></i>
        </a>
      </td>
      <td>
        <a class="edit" [routerLink]="['/employeeform', 'update', employee.empId]">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </td>
      <td>
        <a class="delete" (click)="deleteEmployee(employee.empId)"><i class="fas fa-trash"></i></a>
      </td>
    </tr>
  `
})
export class ProjectrowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
