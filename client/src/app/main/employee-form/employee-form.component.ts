import { IResponse } from './../../models/response.model';
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormBuilder, Validators } from '@angular/forms';
import { SendHttpRequestService } from "../../send-http-request.service"
import swal from'sweetalert2';
@Component({
  selector: "app-employee-form",
  styleUrls: ["./employee-form.component.scss", "../main.component.scss"],
  templateUrl: "./employee-form.component.html"
})
export class EmployeeFormComponent implements OnInit {
  typeOfForm: string;
  employee: any;
  message: string;
  employeeForm: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      name: ["", Validators.required, Validators.minLength(2)]
    });
  }
  
  ngOnInit(): any {
    (function() {
      "use strict";
      window.addEventListener(
        "load",
        function() {
          var forms = document.getElementsByClassName("needs-validation");
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener(
              "submit",
              function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    })();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.typeOfForm = params.type;
          if (!params.type) {
            this.typeOfForm = "get";
          }

          if (!params.empId) {
            return new Observable<IResponse>();
          }
          return this.employeeService.getEmployee(params.empId);
        })
      )
      .subscribe((response: IResponse) => {
        this.employee = response.payload.data.employee;
      });
  }

  employeeCreateOrUpdate(obj, typeOfForm, form): any {
    this.employeeService.employeeCreateOrUpdate(obj, typeOfForm).subscribe(
      (res: any) => {
        this.message = res.payload.message;
        swal.fire({
          icon: "success",
          text: this.message,
          showConfirmButton: true
        });
        form.reset();

        this.router.navigate(["/admin"]);
      },
      err => {
        this.message = err.error.payload.message;
        swal.fire({
          icon: "error",
          text: this.message,
          showConfirmButton: true
        });
      }
    );
  }
  saveEmployee() {
    if (this.employeeForm.dirty && this.employeeForm.valid) {
      alert(`Name: ${this.employeeForm.value.empName} `);
    }
  }
}
