import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  loading = false;
  ngOnInit() {
    this.loading = true;
  }

}
