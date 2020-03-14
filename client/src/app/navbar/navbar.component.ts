import { Component, OnInit, Input } from '@angular/core';
import { SendHttpRequestService } from "./../send-http-request.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  dashboard:string;

  @Input()
  menus: any;

  constructor(private router: Router, private _service: SendHttpRequestService) { }

  ngOnInit() {
    console.log(this.menus, 'Shivani Bansal');
  }

  logout() {
    this._service.deletetoken();

    this.router.navigate(["/login"]);
  }

  // moveToProfile(){
  //   this.router.navigate(['/myProfile']);
  // }

}
