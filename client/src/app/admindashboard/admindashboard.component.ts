import { SendHttpRequestService } from "./../send-http-request.service";
import { Component, OnInit, OnChanges,ViewChild,ElementRef } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { EmployeeService } from "../services/employee.service";
import swal from 'sweetalert2';
@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss", "../main/main.component.scss"]
})
export class AdmindashboardComponent implements OnInit, OnChanges {
  @ViewChild('myAlert',{static:false}) myAlert: ElementRef;
  
  name = "Angular";
  page = 1;
  pageSize = 6;
  items = [];
  pager={};
  // dashboard: "Admin DASHBOARD"
  hello: "kritika";
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
  usersArray: any;
  user:any;
  tabularData() {
    let obj = this._service.showEmployees().subscribe(res => {
      this.usersArray = res;
      console.log(res);

      console.log(this.usersArray.length)
    });
    console.log(obj);
  }

  ngOnInit() {
    //this.tabularData();
    this.loadEmployees(0, this.page);
  }

  ngOnChanges() {
    this.tabularData();
  }

  loadEmployees(status, page){
    if(status == 0){
      this._service.showAllEmployees(page).subscribe(res => {
        console.log(res, "my fav res--->>")
        if(res.status == 200){
          console.log(res, "my fav res--->>")
          this.pager = res.body.pager;
          this.usersArray = res.body.pageOfItems;
          //this.usersArray = res.body;
          console.log(this.usersArray);
        }
        else if(res.status == 401){
          localStorage.removeItem("JwtHrms");
          this.router.navigate(['/login']);
        }
      });
    }
    }


  deleteEmployee(empId: any) {
    console.log(empId);
    this.employeeService.deleteEmployee(empId).subscribe(res => {
      this.message = res.payload.message;
      setTimeout(() => {
        this.message = null;
      }, 5000);
        this.usersArray = this.usersArray.filter(item => item.empId != empId);
      console.log(res);
    });
    swal.fire({
     icon: 'success',
     title: 'employee deleted suceessfully',
    });
  }
  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }

  myFunction() {
   //Declare variables
    var input, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    let obj = this.employeeService.searchEmp(input.value).subscribe(res => {
      this.user= res;
      console.log(res);
    });
    table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");
    // // Loop through all table rows, and hide those who don't match the search query
     for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td")[0];
      if (td) {
           txtValue = td.textContent || td.innerText;
           if (txtValue.toUpperCase().indexOf(this.user) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  sortTable() {

  //   let obj = this._service.sortData().subscribe(res => {
  //     this.usersArray = res;
  //     console.log(res);

  //     console.log(this.usersArray.length)
  //   });
  //   console.log(obj);
  // }
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
