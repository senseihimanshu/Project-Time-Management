import { Component } from "@angular/core";

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.scss"],
  template: `
    <!-- <div class="app-login">
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
        </div> -->
    <form class="text-center border border-light p-5">
      <p class="h4 mb-4">Sign in</p>

      <input
        type="email"
        id="defaultLoginFormEmail"
        class="form-control mb-4"
        placeholder="E-mail"
      />

      <input
        type="password"
        id="defaultLoginFormPassword"
        class="form-control mb-4"
        placeholder="Password"
      />

      <div class="d-flex justify-content-around">
        <div>
          <a href="">Forgot password?</a>
        </div>
      </div>

      <button mdbBtn color="info" block="true" class="my-4" type="submit">
        Sign in
      </button>

    </form>
  `
})
export class LoginComponent {}
