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
          console.log(res.startDate)
        });
        var curr = new Date(); // get current date
        console.log(curr,"todays date");
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
      // { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      // { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
      // { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
      // { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      // { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
      ngOnInit()
      {  this.tabularData();
   }

    // awaitingPersonList: Array<any> = [
    //   { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    //   { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    //   { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    //   { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    //   { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
    // ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
   //   this.personList[id][property] = editField;
    }

    remove(id: any) {
    //  this.awaitingPersonList.push(this.personList[id]);
    //  this.personList.splice(id, 1);
    }

    // add() {
    //   if (this.awaitingPersonList.length > 0) {
    //     const person = this.awaitingPersonList[0];
    //  //   this.personList.push(person);
    //     this.awaitingPersonList.splice(0, 1);
    //   }
    // }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
}