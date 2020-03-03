import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss', '../main/main.component.scss']
})
export class AdmindashboardComponent implements OnInit, OnChanges {
  message: String;

  constructor(private _service:SendHttpRequestService,private router: Router, private employeeService: EmployeeService) {
   }
   usersArray: any;
   tabularData() {
    let obj=this._service.showEmployees().subscribe(res => {
      this.usersArray=res;
      console.log(res);
    });
    console.log(obj);
    }

    ngOnInit() {
      this.tabularData()
    }

    ngOnChanges(){
      this.tabularData();
    }

    deleteEmployee(empId: any){
      console.log(empId);
      this.employeeService.deleteEmployee(empId).subscribe((res) => {
        this.message = res.payload.message;
        setTimeout(() => {
          this.message = null;
        }, 5000);
        console.log(res);
      });
    }
   logout(){
    this._service.deletetoken();
     
        this.router.navigate(["/login"]);
     
  }
  
}
