import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-employee-form",
  styleUrls: ["./employee-form.component.scss", '../main.component.scss'],
  templateUrl: './employee-form.component.html' 
})
export class EmployeeFormComponent implements OnInit {
  formType: string;
  employee: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): any {
    console.log("ngOnInit");
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);
          this.formType = params.type;
            // debugger;
          console.log(this.formType);

          if (!params.empId) {
            return this.employeeService.getEmployee(null);
          }
          this.formType = "get";
          console.log(this.formType);
          return this.employeeService.getEmployee(params.empId);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.payload.employee);
        return (this.employee = response.payload.employee);
      });
  }

  employeeCreateOrUpdate(obj, formType): any {
    this.employeeService
      .employeeCreateOrUpdate(obj, formType)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
