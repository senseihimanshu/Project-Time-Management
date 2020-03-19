import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  graphicaldata: Boolean = true;

  loading = false;
  //  users: User[] = [];

  // constructor(
  //   private httpService: HttpClient,
  // graphicaldata:Boolean=true;
  // loading = false;
  
  //   constructor(private httpService: HttpClient,
  //   private _service: SendHttpRequestService,
  //   private router: Router,
  //   private employeeService: EmployeeService
  // ) {}
  // pieChartOptions = {
  //   responsive: true
  // };
  // // CHART CLICK EVENT.
  // onChartClick(event) {
  // }
  // projectpieChartLabels = ["COMPLETED", "DISCARDED", "IN-PROGRESS"];

  // CHART COLOR.
  projectpieChartColor: any = [
    {
      backgroundColor: [
        "rgba(30, 169, 224, 0.8)",
        "rgba(255,165,0,0.9)",
        "rgba(139, 136, 136, 0.9)"
      ]
    }
  ];

  projectpieChartData: any = [
    {
      data: []
    }
  ];
  // timesheetpieChartLabels = ["APPROVED", "DECLINED", "PENDING"];

  // CHART COLOR.
  timesheetpieChartColor: any = [
    {
      backgroundColor: [
        "rgba(236, 236, 69, 0.7)",
        "rgba(121, 225, 225, 0.7)",
        "rgba(244, 64, 10, 0.7)"
      ]
    }
  ];
  // timesheetpieChartData: any = [
  //   {
  //     data: []
  //   }
  //  clevelDataProjects(graphicaldata) {
  //   let obj=this._service.clevelDataProjects(graphicaldata).subscribe(res => {
  //     this.projectpieChartData=res;
  //   });
  // }

  //  ngOnChanges(){}
}
