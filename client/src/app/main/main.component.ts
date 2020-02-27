import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    styleUrls: ['./main.component.scss'],
    template: `
        <div class="app-main">
            <!-- <app-login></app-login> -->
            <app-employee-form></app-employee-form>
        </div>
    `
})
export class MainComponent{

}