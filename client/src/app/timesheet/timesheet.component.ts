import { TimesheetService } from "./../services/timesheet.service";
import { Component, OnInit, ViewChild, Input } from "@angular/core";

//3rd party
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../services/employee.service";
import { SendHttpRequestService } from "../services/send-http-request.service";
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: "table-editable",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.scss"]
})
export class TimesheetComponent implements OnInit {
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private httpService: SendHttpRequestService
  ) {}
  editField: string;
  timesheetList: any;
  closeResult: string;

  empObjId: string;
  name = "Angular";
  page = 1;
  pageSize = 10;
  items = [];

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

  openDialog() {
    const dialogRef = this.dialog.open(TimesheetModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  tabularData() {
    let empId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data.empId;
    this.empObjId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data._id;
    console.log(empId);

    this.timesheetService.getTimesheet(empId).subscribe(res => {
      console.log(res);
    });
    // let obj = this._service.getTimesheet().subscribe(res => {
    //   this.timesheetList = res;
    //   console.log(res);
    //   console.log(this.timesheetList);
    // });
    // var curr = new Date(); // get current date
    // console.log(curr, "todays date");
    // var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    // var last = first + 4; // last day is the first day + 6

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    // var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    // firstday;
    // "Sun, 06 Mar 2011 12:25:40 GMT";
    // lastday;
    // "Sat, 12 Mar 2011 12:25:40 GMT";
    // console.log("daaayyyyssss", firstday, lastday, secondday);
    // console.log(obj);
  // tabularData(role:String) {
  //   if(role=='Admin'||role=='admin'){
  //   return this._service.getAllTimesheet().subscribe(res => {
  //     this.timesheetList = res;
  //   });
  // }

  // else{
  //   const empObjId= this.httpService.jsonDecoder(localStorage.getItem('Authorization')).data._id;
  //   return this._service.getTimesheet(empObjId).subscribe(res => {
  //     this.timesheetList = res;
  //   });
  // }

    // var curr = new Date(); // get current date
    // console.log(curr, "todays date");
    // var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    // var last = first + 4; // last day is the first day + 6

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    // var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    // firstday;
    // "Sun, 06 Mar 2011 12:25:40 GMT";
    // lastday;
    // "Sat, 12 Mar 2011 12:25:40 GMT";
    // console.log("daaayyyyssss", firstday, lastday, secondday);
  }

  ngOnInit() {
   // let role = this.httpService.jsonDecoder(localStorage.getItem('Authorization')).data.role[0];
   this.tabularData();
  }
}

export interface ITaskType {
  key: string;
  value: string;
}

@Component({
  selector: "app-timesheet-modal",
  templateUrl: "./modal.html",
  styleUrls: ["./modal.scss"]
})
export class TimesheetModal implements OnInit {
  isDisabled = (date: NgbDate, current: { month: number }) =>
    moment(`${date.year}-${date.month}-${date.day}`).day() === 0 ||
    moment(`${date.year}-${date.month}-${date.day}`).day() === 6;

  startDate: string;
  endDate: string;
  numberOfDays: number = 0;
  datesArray: string[];
  empObjId: string;

  project: any;

  projectArray: any = [];

  taskTypes: ITaskType[] = [
    {
      key: null,
      value: "Choose task type"
    },
    {
      key: "offshore",
      value: "Off Shore"
    },
    {
      key: "onsite",
      value: "On Site"
    },
    {
      key: "earned-leave",
      value: "Earned Leave"
    },
    {
      key: "casual-leave",
      value: "Casual Leave"
    },
    {
      key: "sick-leave",
      value: "Sick Leave"
    }
  ];

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimesheetService,
    private httpService: SendHttpRequestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //Getting empId from token
    let empId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data.empId;
    this.empObjId = this.httpService.jsonDecoder(
      localStorage.getItem("Authorization")
    ).data._id;
    console.log(empId);

    //subscribing to observable for getting the employee
    this.employeeService.getEmployee(empId).subscribe(response => {
      console.log(response);
      this.projectArray = response.employee.projectId.map(project => {
        return {
          _id: project._id,
          projectName: project.projectName,
          projectManager: project.projectManager,
          clientName: project.clientName
        };
      });

      console.log(this.projectArray);
    });
  }

  handleSave(timesheetData: any) {
    console.log(timesheetData, "timesheetData");
    this.timesheetService
      .createTimesheet(timesheetData, this.empObjId)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  convertDate(selectedDate: string) {
    this.startDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(1)
      .format("YYYY-MM-DD")
      .toString();
    console.log(this.startDate);
    this.endDate = moment(
      `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
    )
      .day(5)
      .format("YYYY-MM-DD")
      .toString();
    console.log(this.endDate);

    this.endDate =
      moment(this.endDate) > moment(this.startDate).endOf("month")
        ? moment(this.startDate)
            .endOf("month")
            .format("YYYY-MM-DD")
        : this.endDate;

    this.numberOfDays =
      Number(moment(this.endDate).format("DD")) -
      Number(
        moment(
          `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
        )
          .day(1)
          .format("DD")
      ) +
      1;

    this.datesArray = [];
    for (let i = 1; i <= this.numberOfDays; i++) {
      this.datesArray.push(
        moment(
          `${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["day"]}`
        )
          .day(i)
          .format("YYYY-MM-DD")
          .toString()
      );
    }

    console.log(this.numberOfDays, this.datesArray);
  }

  handleProjectData(project: any) {
    console.log(project);
    this.project = project;
  }
  logout() {
    this.router.navigate(["/login"]);
  }
  myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    console.log(input, "hgcfdfcj");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /* Make a loop that will continue until
  no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
    first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
      one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
}
