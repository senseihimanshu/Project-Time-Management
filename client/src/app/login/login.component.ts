import { SendHttpRequestService } from "../services/send-http-request.service";
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../user";
import swal from "sweetalert2";
import { LoginService } from "../services/login.service";
import { jsonDecoder } from '../utils/json.util';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  isMessage: Boolean = false;

  constructor(
    private sendReq: SendHttpRequestService,
    // private jwtHelperService: JwtHelperService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  @ViewChild("email", { static: false }) email: ElementRef;
  @ViewChild("password", { static: false }) password: ElementRef;
  res: any;
  myform: FormGroup;
  submitted = false;
  ngOnInit() {
    this.myform = this.formBuilder.group({
      email: ["", [Validators.required, Validators.minLength(8)]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }
  get f() {
    return this.myform.controls;
  }

  validate() {
    this.submitted = true;
    if (
      this.password.nativeElement.value == "" ||
      this.email.nativeElement.value == ""
    ) {
      swal.fire({ icon: "warning", title: "All fields are necessary" });
      return;
    }

    if (this.myform.invalid) {
      let valLengthEmail = this.email.nativeElement.value.length;
      if (valLengthEmail < 8) {
        swal.fire({
          icon: "warning",
          title: "Email must be of minimum 8 characters"
        });
        return;
      }
      let valLengthPassword = this.password.nativeElement.value.length;
      if (valLengthPassword < 4)
        swal.fire({
          icon: "warning",
          title: "Password must be of minimum 8 characters"
        });
      return;
    }
  }

  loginFunction() {
    this.validate();

    let userObj = {
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    };

    this.loginService.login(userObj).subscribe((res) => {

      if (res != null) {
        window.localStorage.setItem("Authorization", `Bearer ${res.payload.data['x-auth-token']}`);

        const token = localStorage.getItem("Authorization");

        const decodeToken = jsonDecoder(token);
        if (!decodeToken) {
          console.log("Invalid token");
        } else {
          const role = decodeToken.role;
          if (role == "Employee" || role == "employee") {
            this.router.navigate(["/timesheetweek"]);
          } else if (role == "Admin" || role == "admin") {
            this.router.navigate(["/admin"]);
          } else if (role == "C Level Manager" || role == "c-level") {
            this.router.navigate(["/clevel"]);
          } else if (role == "Project Manager" || role == "project-manager") {
            this.router.navigate(["/manager"]);
          } else this.router.navigate(["/accessdenied"]);
        }
      }

    }, err => {
      console.log(err);
      this.isMessage = true;
      swal.fire({
        icon: "warning",
        title: err.error.payload.message
      });
      setTimeout(() => {
        this.isMessage = false;
      }, 3000);
    });
  };
}
