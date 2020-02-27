import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <div class="header">
            <div class="header__logo-container"></div>
<<<<<<< HEAD
            <div class="btn-group">
                <button type="button" mdbBtn color="primary" mdbWavesEffect [routerLink]="['/employeeform/create', 'create']">Create Employee</button>
                <button type="button" mdbBtn color="success" mdbWavesEffect [routerLink]="['/employeeform/update', 'update']">Update Employee</button>
            </div>
=======
>>>>>>> 209211167cf7c24af22f9278dadbce1f2cde647e
        </div>
    `
})
export class HeaderComponent{
    
}