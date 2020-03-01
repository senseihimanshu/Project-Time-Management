import { NgModule } from '@angular/core';
import { ClevelDashboardComponent } from './clevel-dashboard.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'


@NgModule({
    declarations: [
        ClevelDashboardComponent
    ],
    imports: [
        ChartsModule, 
        WavesModule
    ],
    exports: [
        ClevelDashboardComponent
    ]
})
export class ClevelDashboardModule{}