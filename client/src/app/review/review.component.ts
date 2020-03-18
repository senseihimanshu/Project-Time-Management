import { IResponse } from './../models/response.model';
import { Router } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { SendHttpRequestService } from "./../send-http-request.service";
import swal from 'sweetalert2';
@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit, OnChanges {
  dashboard: string = "Manager Dashboard";
  
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
    });
    var date = new Date("2013-08-03T02:00:00Z");
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();
    var d =new Date();
    var d = new Date("2020-02-02T00:00:00Z");
    var n = d.toISOString();
    var first = d.getDate() - d.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 4; // last day is the first day + 6

    var firstday = new Date(d.setDate(first)).toUTCString();
    var lastday = new Date(d.setDate(last)).toUTCString();
    var secondday = new Date(d.setDate(first + 1)).toUTCString();

var s=year + "-" + month + "-" + dt;
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 4; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    var secondday = new Date(curr.setDate(first + 1)).toUTCString();
    firstday;
    "Sun, 06 Mar 2011 12:25:40 GMT";
    lastday;
    "Sat, 12 Mar 2011 12:25:40 GMT";
  }

  ngOnInit() {
    this.reviews();
  }

  ngOnChanges() {
    this.reviews();
  }
   accept(data) {
    console.log(data);
    let obj = {
      _id: data,
      status: "Approved"
    };;
    this.sendReq(obj);
  }
      
  reject(data) {
    let obj = {
      _id: data,
      status: "Declined"
    };
    this.sendReq(obj);
  }
  sendReq(data) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm review!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let obj = this._service.reviewRequest(data).subscribe((res:IResponse) => {
          this.usersArray = res;
          this.message = res.payload.message;
          setTimeout(() => {
            this.message = null;
          }, 5000);
        });
         swalWithBootstrapButtons.fire(
          'Reviewed!',
          'data.status',
          'success'
        )
        this.usersArray = this.usersArray.filter(
          item => item._id !=data._id
        );
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Review request has been cancelled:)',
          'error'
        )
      }
    }) 
    
  }
    // let obj = this._service.reviewRequest(data).subscribe(res => {
    //   this.usersArray = res;
    //   alert(data.status);
    // });
  }
