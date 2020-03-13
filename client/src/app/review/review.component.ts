import { Router } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { SendHttpRequestService } from "./../send-http-request.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit, OnChanges {
  menus: any = [
   
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
    private router: Router
  ) {}
  usersArray: any;
  reviews() {
    let obj = this._service.showReviews().subscribe(res => {
      this.usersArray = res;
      console.log(res);
      console.log(this.usersArray);
    });
    var date = new Date("2013-08-03T02:00:00Z");
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();
    var d =new Date();
    console.log(d,"fghsdgvhgsadbj");
    var d = new Date("2020-02-02T00:00:00Z");
    var n = d.toISOString();
    console.log(n,"isd to ist");
    var first = d.getDate() - d.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 4; // last day is the first day + 6

    var firstday = new Date(d.setDate(first)).toUTCString();
    var lastday = new Date(d.setDate(last)).toUTCString();
    var secondday = new Date(d.setDate(first + 1)).toUTCString();
    console.log("deeekkhhooo", firstday, lastday, secondday);
    // if (dt < 10) {
    //   dt = '0' + dt;
    // }
    // if (month < 10) {
    //   month = "0" + month;
    // }
var s=year + "-" + month + "-" + dt;
console.log(s,"hyjjj");
    console.log(year + "-" + month + "-" + dt);
    var curr = new Date(); // get current date
    console.log(curr, "todays date");
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 4; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    firstday;
    "Sun, 06 Mar 2011 12:25:40 GMT";
    lastday;
    "Sat, 12 Mar 2011 12:25:40 GMT";
    console.log("daaayyyyssss", firstday, lastday, secondday);
    console.log(obj);
  }

  ngOnInit() {
    this.reviews();
  }

  ngOnChanges() {
    this.reviews();
  }

  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }
}
