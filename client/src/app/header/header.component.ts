import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <div class="header">
            <div class="header__logo-container"></div>
            <!-- <div class="btn-group">
                <button type="button" mdbBtn color="primary" mdbWavesEffect [routerLink]="['/employee', 'create']">Create Employee</button>
                <button type="button" mdbBtn color="success" mdbWavesEffect [routerLink]="['/employee/update', 'update']">Update Employee</button>
            </div> -->
 
        </div>
    `
})
export class HeaderComponent{
    
}