import { Component, OnInit } from "@angular/core";
import { SendHttpRequestService } from "./../send-http-request.service";
@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  constructor(private _service: SendHttpRequestService) {}
  usersArray: any;
  reviews() {
    let obj = this._service.showReviews().subscribe(res => {
      this.usersArray = res;
      console.log(res);
    });
    console.log(obj);
  }

  accept(data) {
    let obj = {
      _id: data,
      status: "Approved"
    };
    this.sendReq(obj);
  }
  reject(data) {
    let obj = {
      _id: data,
      status: "Rejected"
    };
    this.sendReq(obj);
  }

  sendReq(data) {
    let obj = this._service.rejectRequest(data).subscribe(res => {
      this.usersArray = res;
      console.log(res);
    });
  }
  ngOnInit() {}
}
