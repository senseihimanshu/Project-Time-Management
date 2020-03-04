import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private _service:SendHttpRequestService,private router: Router) { }

  projectsArray: any;
  tabularData() {
    let obj=this._service.showProjects().subscribe(res => {
      this.projectsArray=res;
      console.log(res);
    });
   console.log(obj);
    } 
  ngOnInit() {
    this.tabularData();
  }
  logout(){
    this._service.deletetoken();
     
        this.router.navigate(["/login"]);
     
  }
}

