import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../services/employee.service'
import swal from 'sweetalert2'
import {Router} from '@angular/router'
import {jsonDecoder} from '../utils/json.util'
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss', "../main/employee-form/employee-form.component.scss",]
})
export class ResetpasswordComponent implements OnInit {
  message:string;
  constructor(
    private employeeService: EmployeeService
    ,private router:Router) { }
     tokenPayload=jsonDecoder();
  ngOnInit() {
   
  }
      resetPassword(obj, form): any {
        if(obj.oldPassword==null||obj.newPassword==null||obj.confirmPassword==null){
          swal.fire({
            icon: "warning",
            text: "all fields are necessary",
            showConfirmButton: true
          });
          return false;
          
        }
        const empId=this.tokenPayload.empId;
    this.employeeService.employeeCreateOrUpdate({empId:empId,password:obj.newPassword,oldPassword:obj.oldPassword},
      'update').subscribe(
      (res: any) => {
        this.message = res.payload.message;
        console.log(this.message);
        swal.fire({
          icon: "success",
          text: this.message,
          showConfirmButton: true
        });
        form.reset();
      },
      err => {
        this.message = err.error.payload.message;
        swal.fire({
          icon: "error",
          text: this.message,
          showConfirmButton: true
        });
      }
    );
    this.navigation();
 }
  navigation(){
    if (!this.tokenPayload) {
    } else {
      this.router.navigate(["/myProfile"]);
    }
  }
}
