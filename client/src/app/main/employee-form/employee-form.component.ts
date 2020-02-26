import { Component, Type } from "@angular/core";

@Component({
  selector: "app-employee-form",
  styleUrls: ["./employee-form.component.scss"],
  template: `
    <div class="app-employee-form">
      <form class="text-center border border-light p-5">
        <p class="h4 mb-4">Employee Form</p>

        <input
          type="text"
          id="defaultContactFormName"
          class="form-control mb-4"
          placeholder="EmployeeId"
          *ngIf="formType === 'create'"
        />

        <input
          type="text"
          id="defaultContactFormName"
          class="form-control mb-4"
          placeholder="Name"
        />

        <input
          type="email"
          id="defaultContactFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
        />

        <label>Designation</label>
        <select class="browser-default custom-select mb-4">
          <option value="" disabled>Choose option</option>
          <option value="1" selected>Employee</option>
          <option value="2">Project Manager</option>
          <option value="3">C Level</option>
          <option value="4">Admin</option>
        </select>

        <div class="md-form">
          <input type="date" id="input" class="form-control" mdbInput />
          <label for="input">Joining date</label>
        </div>

        <div class="md-form">
          <input type="number" id="input" class="form-control" mdbInput />
          <label for="input">Phone</label>
        </div>

        <div class="form-group">
          <textarea
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="3"
            placeholder="Address"
          ></textarea>
        </div>

        <button mdbBtn color="info" block="true" type="submit">{{formType? 'Add Employee': 'Update Employee'}}</button>
      </form>
    </div>
  `
})
export class EmployeeFormComponent {
    formType: string;
}
