import { IResponse } from "./../models/response.model";
import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import swal from "sweetalert2";
import { ProjectService } from "../services/project.service";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from "rxjs/operators";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: [
    "./project-form.component.scss",
    "../main/employee-form/employee-form.component.scss",
    "../main/main.component.scss"
  ]
})
export class ProjectFormComponent implements OnInit {
  formType: string;
  employee: any;
  project: any;
  dropdownList = [];
  selectedItems = [];

  empList: string[];
  projManager: string;
  projMembers: string[] = [];
  message: string;
  name = "Angular";
  page = 1;
  items = [];
  pager = {};
  dummyEmployeeArr: any = [];
  projectId: string;

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  loading = false;

  ngOnInit(): any {
    (function() {
      "use strict";
      window.addEventListener(
        "load",
        function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation");
          // Loop over them and prevent submission
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

    this.getemployees();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.formType = params.type;
          if (!params.type) {
            this.formType = "get";
          }

          if (!params.projectId) {
            return new Observable<IResponse>();
          }
          this.projectId = params.projectId;
          return this.projectService.getProject(params.projectId);
        })
      )
      .subscribe((response: any) => {
        return (this.project = response.payload.data.projectDetails);
      });
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  projectCreateOrUpdate(obj, formType): any {
    if (obj.startDate >= obj.endDate) {
      swal.fire({
        icon: "error",
        title: "Warning!",
        text: "Start Date must be less than End Date!"
      });
      return;
    }
    var currdate = new Date();
    var date = this.formatDate(currdate);
    // var date=new Date();
    if (obj.endDate <= date) {
      obj.status = "completed";
    } else if (obj.endDate > date) {
      obj.status = "in-progress";
    }
    this.projectService
      .projectCreateOrUpdate(obj, formType, this.projectId)
      .subscribe(
        (res: IResponse) => {
          this.message = res.payload.message;
          swal.fire({
            icon: "success",
            title: this.message,
            showConfirmButton: true
          });

          this.router.navigate(["/project"]);
        },
        err => {
          this.message = err.error.payload.message;
          swal.fire({
            icon: "error",
            title: this.message,
            showConfirmButton: true
          });
        }
      );
  }
  getemployees() {
    this.employeeService
      .showAllEmployees({
        page: this.page.toString(),
        limit: "-1",
        criteria: JSON.stringify({}),
        columns: JSON.stringify({ empId: 1, name: 1 }),
        sort: JSON.stringify({})
      })
      .subscribe(res => {
        this.empList = res.payload.data.result.results;
      });
  }

  addProjectManager(managerId: any) {
    this.projManager = managerId;
  }
  addProjectMember(employeeArr: any) {
    this.projMembers === [];

    if (employeeArr) {
      this.projMembers = employeeArr;
    }
  }
  formatter = (result: string) => result.toUpperCase();

  searchProjectMember = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? this.empList
          : this.empList
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
}
