
  
import { SendHttpRequestService } from "./../send-http-request.service";
import { Component, OnInit, OnChanges } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss", "../main/main.component.scss"]
})
export class AdmindashboardComponent implements OnInit, OnChanges {
  name = 'Angular';
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
  usersArray: any;
  tabularData() {
    let obj = this._service.showEmployees().subscribe(res => {
      this.usersArray = res;
      console.log(res);
      console.log(this.usersArray.length,"vxchgsdbhxgb hdsbxb")
    });
    console.log(obj);
   
  }

  ngOnInit() {
    this.tabularData();
  //   $(document).ready(function () {
  // //    $('#dtBasicExample').DataTable();
  //     $('.dataTables_length').addClass('bs-select');
  //   });
  }

  ngOnChanges() {
    this.tabularData();
  }

  deleteEmployee(empId: any) {
    console.log(empId);
    this.employeeService.deleteEmployee(empId).subscribe(res => {
      this.message = res.payload.message;
      setTimeout(() => {
        this.message = null;
      }, 5000);
      console.log(res);
    });
  }
  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
}




// import { SendHttpRequestService } from "./../send-http-request.service";
// import { Component, OnInit, OnChanges } from "@angular/core";
// import { Router, RouterLink } from "@angular/router";
// import { EmployeeService } from "../services/employee.service";
// import {  PipeTransform } from '@angular/core';
// import { DecimalPipe } from '@angular/common';
// import { FormControl } from '@angular/forms';

// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// // interface employee {
// //   empID: string;
// //   name: string;
// //   email: string;
// //   designation: string;
// //   role:string;
// // }

// // var usersArray;
// @Component({
//   selector: "app-admindashboard",
//   templateUrl: "./admindashboard.component.html",
//   styleUrls: ["./admindashboard.component.scss", "../main/main.component.scss"]
// })
// export class AdmindashboardComponent implements OnInit, OnChanges {
//   message: String;

//   constructor(
//     private _service: SendHttpRequestService,
//     private router: Router,
//     private employeeService: EmployeeService
//   ) {}
//   usersArray: any;
//   tabularData() {
//     let obj = this._service.showEmployees().subscribe(res => {
//       this.usersArray = res;
//       console.log(res);
//       console.log(this.usersArray,"ghjjhjjh");
//     });

//     console.log(obj);
//   }

//   ngOnInit() {
//     this.tabularData();
//   }

//   ngOnChanges() {
//     this.tabularData();
//   }

//   deleteEmployee(empId: any) {
//     console.log(empId);
//     this.employeeService.deleteEmployee(empId).subscribe(res => {
//       this.message = res.payload.message;
//       setTimeout(() => {
//         this.message = null;
//       }, 5000);
//       console.log(res);
//     });
//   }
//   logout() {
//     this._service.deletetoken();

//     this.router.navigate(["/login"]);
//   }
// }
// // @Component({
// //   selector: 'ngbd-table-pagination',
// //   templateUrl: './admindashboard.component.html'
// // })

// // export class NgbdTablePagination {
// //   constructor(
// //     private _service: SendHttpRequestService,
// //     private router: Router,
// //     private employeeService: EmployeeService
// //   ) {  console.log("sajkdxsajk");}
// //   page = 1;
// //   pageSize = 4;
// //   usersArray: any;
// //   collectionSize: any;
// //   tabularData() {
// //     let obj = this._service.showEmployees().subscribe(res => {
// //       this.usersArray = res;
// //       console.log(res,"yaha aya hai");    });
// //       this.collectionSize = this.usersArray.length;
// //       return this.usersArray
// //       .map((employee, i) => ({id: i + 1, ...employee}))
// //              .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);


// //     console.log(obj);
// //   }
// // }
// // @Component({
// //   selector: 'ngbd-table-pagination',
// //   templateUrl: './table-pagination.html'
// // })
// // export class NgbdTablePagination {

// //   page = 1;
// //   pageSize = 4;
// //   collectionSize = COUNTRIES.length;

// //   get countries(): Country[] {
// //     return COUNTRIES
// //       .map((country, i) => ({id: i + 1, ...country}))
// //       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
// //   }
// // }
// // function search(text: string, pipe: PipeTransform): employee[] {
// //   return usersArray.filter(employee => {
// //     const term = text.toLowerCase();
// //     return employee.name.toLowerCase().includes(term)
// //         || pipe.transform(employee.designation).includes(term)
// //         || pipe.transform(employee.empId).includes(term);
// //   });
// // }

// // @Component({
// //   selector: 'ngbd-table-filtering',
// //   templateUrl: './admindashboard.component.html',
// //   providers: [DecimalPipe]
// // })
// // export class NgbdTableFiltering {

// //   usersArray$: Observable<employee[]>;
// //   filter = new FormControl('');

// //   constructor(pipe: DecimalPipe) {
// //     this.usersArray$ = this.filter.valueChanges.pipe(
// //       startWith(''),
// //       map(text => search(text, pipe))
// //     );
// //   }
// // }

// //
// // function search(text: string, pipe: PipeTransform): Country[] {
// //   return COUNTRIES.filter(country => {
// //     const term = text.toLowerCase();
// //     return country.name.toLowerCase().includes(term)
// //         || pipe.transform(country.area).includes(term)
// //         || pipe.transform(country.population).includes(term);
// //   });
// // }

// // @Component({
// //   selector: 'ngbd-table-filtering',
// //   templateUrl: './table-filtering.html',
// //   providers: [DecimalPipe]
// // })
// // export class NgbdTableFiltering {

// //   countries$: Observable<Country[]>;
// //   filter = new FormControl('');

// //   constructor(pipe: DecimalPipe) {
// //     this.countries$ = this.filter.valueChanges.pipe(
// //       startWith(''),
// //       map(text => search(text, pipe))
// //     );
// //   }
// // }