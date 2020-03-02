import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-employee-form",
  styleUrls: ["./employee-form.component.scss", "../main.component.scss"],
  templateUrl: "./employee-form.component.html"
})
export class EmployeeFormComponent implements OnInit {
  typeOfForm: string;
  employee: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): any {
    console.log("ngOnInit");

    // this.route.params.pipe(switchMap((params: Params) => {
    //   console.log(params);
    //   this.typeOfForm = params.type;
    //   if(this.typeOfForm !== 'get'){

    //   }
    // }));
    this.route.params.subscribe((data: Params) => { console.log(data) });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);
          this.typeOfForm = params.type;
          // debugger;
          console.log(this.typeOfForm);

          if (!params.empId) {
            return new Observable<any>();
          }
          this.typeOfForm = "get";
          console.log(this.typeOfForm);
          return this.employeeService.getEmployee(params.empId);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.payload.employee);
        return (this.employee = response.payload.employee);
      });
  }

  employeeCreateOrUpdate(obj, typeOfForm): any {
    console.log(obj, typeOfForm);
    this.employeeService
      .employeeCreateOrUpdate(obj, typeOfForm)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
