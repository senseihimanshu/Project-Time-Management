import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { SendHttpRequestService } from "../send-http-request.service";
import swal from "sweetalert2";
import { ProjectService } from "../services/project.service";
import { Observable } from 'rxjs';

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
  dropdownSettings = {};
  empList: any;
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
  @Input()
  dashboard: string = "Admin Dashboard";
  menus: any = [
    {
      title: "Employees",
      icon: "fa fa-users",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Employee"
        },
        {
          title: "Show All Employees"
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

    this.route.params.subscribe((data: Params) => {
      console.log(data);
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          //
          console.log(this.formType);
          this.formType = params.type;
          if (!params.type) {
            this.formType = "get";
          }

          if (!params.projectId) {
            return new Observable<IResponse>();
          }
          console.log(this.formType);
          this.projectId = params.projectId;
          return this.projectService.getProject(params.projectId);
          //
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        return (this.project = response.payload.data.projectDetails);
      });
  }

  projectCreateOrUpdate(obj, formType): any {
    console.log(obj, formType);
    this.projectService.projectCreateOrUpdate(obj, formType, this.projectId).subscribe(
      (res: IResponse) => {
        this.message = res.payload.message;
        console.log(res);
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
      .showAllEmployees({ page: this.page.toString(), limit: '-1', criteria: JSON.stringify({}), columns: JSON.stringify({ empId: 1, name: 1 }), sort: JSON.stringify({}) })
      .subscribe(res => {
        this.empList = res.payload.data.result.results;
        console.log("employeelist", this.empList);
      });
  }

  addProjectManager(managerId: any) {
    console.log(managerId, '-------------');
    this.projManager = managerId;
  }
  addProjectMember(employeeArr: any) {
    console.log(employeeArr, '----------');
    this.projMembers === [];

    if (employeeArr) {
      this.projMembers = employeeArr;
    }
  }

}
