import { TimesheetService } from './../services/timesheet.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'table-editable',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit{
  constructor(private _service: TimesheetService) { }
    editField: string;
    timesheetList:any ;
   
       tabularData() {
        let obj=this._service.getTimesheet().subscribe(res => {
          this.timesheetList=res;
          console.log(res);
          console.log(this.timesheetList);
      
        });
       console.log(obj);
        } 
      ngOnInit()
      {  this.tabularData();
   }

   
  //   updateList(id: number, property: string, event: any) {
  //     const editField = event.target.textContent;
  //  //   this.personList[id][property] = editField;
  //   }

  //   remove(id: any) {
  //   //  this.awaitingPersonList.push(this.personList[id]);
  //   //  this.personList.splice(id, 1);
  //   }

    // add() {
    //   if (this.awaitingPersonList.length > 0) {
    //     const person = this.awaitingPersonList[0];
    //  //   this.personList.push(person);
    //     this.awaitingPersonList.splice(0, 1);
    //   }
    // }

    // changeValue(id: number, property: string, event: any) {
    //   this.editField = event.target.textContent;
    // }
}