import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from "../services/employee.service";
import { SendHttpRequestService } from "./../send-http-request.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  dashboard:string= "C Level Dashboard"
  graphicaldata:Boolean=true;
menus: any = [
  {
    title: "Employees",
    icon: "fa fa-users",
    active: false,
    type: "dropdown",

    submenus: [
      {
        title: "Show All Employees",
        route: '/admin'
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
          title: "Create New Timesheet",
          route: '/timesheetweek'
        },
        {
          title: "Show All Timesheets",
          route: '/timesheetweek'
        },
        {
          title: "Review All Timesheets",
          route: '/review'

        }
      ]
    }
  ];

  loading = false;
  //  users: User[] = [];
  
    constructor(private httpService: HttpClient,
      private _service: SendHttpRequestService,
    private router: Router,
    private employeeService: EmployeeService) { }
    pieChartOptions = {
      responsive: true
    }
    // CHART CLICK EVENT.
onChartClick(event) {
  console.log(event);
}
  projectpieChartLabels =  ['COMPLETED','DISCARDED','IN-PROGRESS'];
  
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
          "data": []
          
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
      this.clevelDataProjects(this.graphicaldata);
      this.clevelDataTimesheets(this.graphicaldata);
        this.loading = true;
       
    }
   clevelDataProjects(graphicaldata) {
     
    let obj=this._service.clevelDataProjects(graphicaldata).subscribe(res => {
      this.projectpieChartData=res;
      
    });
  }
  clevelDataTimesheets(graphicaldata) {
   let obj=this._service.clevelDataTimesheets(graphicaldata).subscribe(res => {
     this.timesheetpieChartData=res;
    
   });
 }

   ngOnChanges(){}

}
