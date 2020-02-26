import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Third Party Components
import { MDBBootstrapModule, CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { EmployeeFormComponent } from './main/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
    //Third Party
    MDBBootstrapModule.forRoot(),
    CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
