import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  employee: any;


  constructor(private _service:EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {  }
    
  ngOnInit(): any {

   // return this._service.getEmployee(params.empId);
  }//)
//)
// .subscribe((response: any) => {
//   console.log(response);
//   console.log(response.payload.employee);
//   return (this.employee = response.payload.employee);
// });
}
