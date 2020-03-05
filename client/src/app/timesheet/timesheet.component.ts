import { MyprofileComponent } from './../myprofile/myprofile.component';
import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  timesheet: any;

  constructor(){}
 // @ViewChild('dt-less-columns', {static: false}) 'dt-less-columns': ElementRef;
  ngOnInit(): void{}
  // '#dt-less-columns'.mdbEditor({
  //   modalEditor: true,
  //   headerLength: 5,
  //   });
  //   $('.dataTables_length').addClass('bs-select');
  submitToApi(event){
    console.log(event);
  }
}
