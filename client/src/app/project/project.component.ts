import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss','../main/main.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {
  message: String;
  constructor(private _service:SendHttpRequestService,private router: Router, private employeeService: EmployeeService) { }

  projectsArray: any;
  tabularData() {
    let obj=this._service.showProjects().subscribe(res => {
      this.projectsArray=res;
      console.log(res);
    });
   console.log(obj);
    } 
  ngOnInit() {
    this.tabularData();
  }
  
  ngOnChanges(){
    this.tabularData();
  }

//   deleteEmployee(empId: any){
//     console.log(empId);
//     this.employeeService.deleteEmployee(empId).subscribe((res) => {
//       this.message = res.payload.message;
//       setTimeout(() => {
//         this.message = null;
//       }, 5000);
//       console.log(res);
//     });
//   }
  logout(){
    this._service.deletetoken();
     
        this.router.navigate(["/login"]);
     
  }
// }

}