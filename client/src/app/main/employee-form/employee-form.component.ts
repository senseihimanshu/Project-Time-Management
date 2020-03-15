import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormBuilder, Validators } from '@angular/forms';
import { SendHttpRequestService } from "../../send-http-request.service"
import swal from'sweetalert2'
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
  dashboard:string= "Admin Dashboard"
  constructor(
   
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _service :SendHttpRequestService
  ) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required,Validators.minLength(2)],
     
    });
  }
  menus: any = [
    {
      title: "Employees",
      icon: "fa fa-users",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Employee"
        }
      ]
    },
    {
      title: "Projects",
      icon: "fa fa-book",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Project"
        },
        {
          title: "Show All Projects"
        }
      ]
    },
    {
      title: "Timesheets",
      icon: "fa fa-calendar",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Show All Timesheets"
        }
      ]
    }
  ];
  
  ngOnInit(): any {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    this.route.params.subscribe((data: Params) => {
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(this.typeOfForm);
          this.typeOfForm = params.type;
          if (!params.type) {
            this.typeOfForm = "get";
          }

          if (!params.empId) {
            return new Observable<any>();
          }
          console.log(this.typeOfForm);
          return this.employeeService.getEmployee(params.empId);
        })
      )
      .subscribe((response: any) => {
        return (this.employee = response.employee);
      });
  }
  

  employeeCreateOrUpdate(obj, typeOfForm, form): any {
    this.employeeService.employeeCreateOrUpdate(obj, typeOfForm).subscribe(
      (res: any) => {
        this.message = res.payload.message;
        swal.fire({
          icon: 'success',
          title: this.message,
          showConfirmButton: true,
          timer: 3000
        }) 
        form.reset();
      },
      err => {
        this.message = err.error.payload.message;
        swal.fire({
          icon: 'error',
          title: this.message,
          showConfirmButton: true,
          timer: 3000
        }) 
        }
     );
   
}
  saveEmployee() {
    if (this.employeeForm.dirty && this.employeeForm.valid) {
      alert(
        `Name: ${this.employeeForm.value.empName} `
      );
    }
  }

}

   
