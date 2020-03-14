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
  deleteEmp:boolean=true;
  name = "Angular";
  page:number = 1;
  lastPage:number;
  items = [];
  dashboard:string= "Admin Dashboard"
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
  limit: number = 5;
  dataSize: number;

  empObjId: string;

  isSortDecreasing: boolean = false;

  tabularData() {
    this._service.showAllEmployees(this.page.toString(), this.limit.toString(), this.isSortDecreasing).subscribe(res => {
      this.usersArray = res.payload.data.result.results;
      this.dataSize = res.payload.data.result.dataSize;
    });
    this.lastPage=(this.dataSize/10)+1;
  }

  ngOnInit() {
    this.tabularData();
    
  }

  ngOnChanges() {
    this.tabularData();
  }



  deleteEmployee(empId: any) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
     
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployee(empId).subscribe(res => {
          this.message = res.payload.message;
          setTimeout(() => {
            this.message = null;
          }, 5000);
            this.usersArray = this.usersArray.filter(item => item.empId != empId);
          console.log(res);
        });
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'employee has been deleted.',
          'success'
          
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your employee data is safe :)',
          'error'
        )
      }
    })
  
    
   
 }

  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
  sortList() {
    this.isSortDecreasing = !this.isSortDecreasing;

    this.tabularData();
  }

  handlePaginationResult(type: string){
    if(type === 'prev'){
        if(this.page > 1){
            this.page--;
            this.tabularData();
        }
    }
    if(type === 'next'){

        if(this.dataSize > this.page * this.limit){
            this.page++;
            this.tabularData();

        }
    }
  }

  myFunction() {
   //Declare variables
    var input, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    let obj = this.employeeService.searchEmp(input.value).subscribe(res => {
      this.usersArray= res;
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
