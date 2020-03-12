import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss", "../main/main.component.scss"]
})
export class ProjectComponent implements OnInit, OnChanges {
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

  message: String;
  constructor(
    private _service: SendHttpRequestService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  projectsArray: any;
  membersObj:any=[];
  projManager:any=[];
  tabularData() {
    let obj = this._service.showProjects().subscribe(res => {
      this.projectsArray = res;
      console.log(res);
      console.log(this.projectsArray);
     this.projectsArray=this.projectsArray.tempList;
      console.log(this.projectsArray);
    });
    console.log(obj);
  }

  ngOnInit() {
    this.tabularData();
  }

  ngOnChanges() {
    this.tabularData();
  }

  deleteProject(id: any) {
    console.log(id);
    this.employeeService.deleteProject(id).subscribe(res => {
      this.message = res.payload.message;
      setTimeout(() => {
        this.message = null;
      }, 5000);
      this.projectsArray = this.projectsArray.filter(project =>project.project._id != id);
    });
  }
  logout() {
    this._service.deletetoken();
    this.router.navigate(["/login"]);
  }
  // }
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
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
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
