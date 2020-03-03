import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  //  users: User[] = [];

    constructor(private httpService: HttpClient) { }
    pieChartOptions = {
      responsive: true
    }
    // CHART CLICK EVENT.
onChartClick(event) {
  console.log(event);
}
  projectpieChartLabels =  ['COMPLETED','CLOSED','IN-PROGRESS'];
  
  // CHART COLOR.
  projectpieChartColor:any = [
      {
          backgroundColor: ['rgba(30, 169, 224, 0.8)',
          'rgba(255,165,0,0.9)',
          'rgba(139, 136, 136, 0.9)'
          ]
      }
  ]

  projectpieChartData:any = [
      { 
          data: []
          
      }
    ];
    timesheetpieChartLabels =  ['APPROVED','DECLINED','PENDING'];
  
  // CHART COLOR.
  timesheetpieChartColor:any = [
      {
        
        backgroundColor: ['rgba(236, 236, 69, 0.7)',
        'rgba(121, 225, 225, 0.7)',
        'rgba(244, 64, 10, 0.7)'
        ]
          
      }
  ]
  timesheetpieChartData:any = [
    { 
        data: []
        
    }
  ];
    ngOnInit() {
        this.loading = true;
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
        this.httpService.get('./assets/project.json', {responseType: 'json'}).subscribe(
          data => {
              this.projectpieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
          },
          (err: HttpErrorResponse) => {
              console.log (err.message);
          }
      );
  
     this.httpService.get('./assets/timesheet.json', {responseType: 'json'}).subscribe(
        data => {
            this.timesheetpieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
          },
            (err: HttpErrorResponse) => {
              console.log (err.message);
         }
     );
   }
}


