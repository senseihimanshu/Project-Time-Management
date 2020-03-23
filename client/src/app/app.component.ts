import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-management';
  status; //initializing as online by default
  isConnected = true;
  icon:any;
  constructor(private connectionService:ConnectionService){
        this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected;
          if(this.isConnected){
            this.status = "Your Internet connection seems to get back";
            this.icon="success";
            } else {
            this.status = "Your Internet connection seems Disconnected!!!!"
            this.icon="error";
          }
          swal.fire({
            icon:this.icon,
            text: this.status,
            showConfirmButton: true
          });
      });
    }
   
}
