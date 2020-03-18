import { EmployeedashboardComponent } from './../employeedashboard/employeedashboard.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { jsonDecoder} from 'src/app/utils/json.util';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  employee: any;
  role: any;
  constructor(private _service:EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {}
    
  ngOnInit(): any {
  const decodeToken = jsonDecoder();
   return this._service.getEmployee(decodeToken.empId).subscribe((response: any) => {  
      return (this.employee = response.payload.data.employee);
      });
}

}
