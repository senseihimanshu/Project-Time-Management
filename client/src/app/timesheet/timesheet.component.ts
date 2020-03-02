import { MyprofileComponent } from './../myprofile/myprofile.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  timesheet: any;

  constructor(){}

  ngOnInit(): void{}

  submitToApi(event){
    console.log(event);
  }
}
