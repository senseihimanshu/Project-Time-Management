import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    template: `
        <div class="app-login">
            <div class="email--container">
                <label name="email">Email</label>
                <input id="email" />
            </div>
            <div class="password--container">
                <label name="password">Password</label>
                <input id="password" />
            </div>
            <div class="button--container">
                <button class="login-btn">Login</button>
                <button class="login-btn">Forgot Password</button>
            </div>
        </div>
    `
})
export class LoginComponent{

}