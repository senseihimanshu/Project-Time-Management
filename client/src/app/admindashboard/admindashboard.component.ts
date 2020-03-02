import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss', '../main/main.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private _service:SendHttpRequestService,private router: Router) {
   }
   usersArray: any;
   tabularData() {
    let obj=this._service.showEmployees().subscribe(res => {
      this.usersArray=res;
      console.log(res);
    });
    console.log(obj);
    }

    takeToProjects(){
      this.router.navigate(['/projects']);
    }
  
    ngOnInit() {
    }

}
