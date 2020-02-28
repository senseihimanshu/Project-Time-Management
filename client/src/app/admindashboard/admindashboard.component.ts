import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss', '../main/main.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private _service:SendHttpRequestService) {
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
    }

}
