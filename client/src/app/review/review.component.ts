import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  constructor(private _service:SendHttpRequestService) {
  }
  usersArray: any;
  reviews() {
   let obj=this._service.showReviews().subscribe(res => {
     this.usersArray=res;
     console.log(res);
   });
   console.log(obj);
   }
    ngOnInit() {
    }

}
