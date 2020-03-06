import { Router } from '@angular/router';
import { Component, OnInit,OnChanges } from "@angular/core";
import { SendHttpRequestService } from "./../send-http-request.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit,OnChanges {
  menus: any = [
    {
      title: "Employees",
      icon: "fa fa-users",
      active: false,
      type: "dropdown",

      submenus: [
        {
          title: "Add New Employee"
        },
        {
          title: "Show All Employees"
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
  message:String;
  constructor(private _service: SendHttpRequestService,private router: Router) {}
  usersArray: any;
  reviews() {
    // let obj = this._service.showReviews().subscribe(res => {
      // this.usersArray = [{
      //   "empId":"123",
      //   "projectId":"123",
      //   "customerName":"Cyber",
      //  "billable":true,
      //  "date":"14-03-2019",
      //  "hours":"14",
      //  "status":"pending"
      // },{
      //   "empId":"123",
      //   "projectId":"123",
      //   "customerName":"Cyber",
      //  "billable":true,
      //  "date":"14-03-2019",
      //  "hours":"14",
      //  "status":"pending"
      // }];
      // console.log(this.usersArray);
      let obj=this._service.showReviews().subscribe(res => {
        this.usersArray=res;
        console.log(res);
        console.log(this.usersArray);
      });
     console.log(obj);
      } 
   
  
  ngOnInit(){
    this.reviews()
  }
  
  ngOnChanges(){
    this.reviews()
  }

 
  logout(){
    this._service.deletetoken();
     
        this.router.navigate(["/login"]);
     
  }
}
