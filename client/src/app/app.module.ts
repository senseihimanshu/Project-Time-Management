import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Third Party Components
import {
  MDBBootstrapModule,
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule
} from "angular-bootstrap-md";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./main/login/login.component";
import { EmployeeFormComponent } from "./main/employee-form/employee-form.component";
import { EmployeeService } from "./services/employee.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // { path: "", component: WelcomePageComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  {
    path: "employeeform",
    children: [
      {
        path: "create/:type",
        component: EmployeeFormComponent
      },
      {
        path: "update/:type",
        component: EmployeeFormComponent
      },
      {
        path: ":empId",
        component: EmployeeFormComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    EmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    //Third Party
    MDBBootstrapModule.forRoot(),
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
