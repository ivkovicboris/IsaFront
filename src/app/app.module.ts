import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './share/DataService';
import { FormsModule } from '@angular/forms';
import { AdminKCHomePageComponent } from './adminKCHomePage/adminKCHomePage.component';
import { AdminClinicHomePageComponent } from './adminClinicHomePage/adminClinicHomePage.component';
import { DoctorHomePageComponent } from './doctorHomePage/doctorHomePage.component';
import { PatientProfileComponent } from './patientProfile/patientProfile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepicker } from '@angular/material/datepicker'
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from './material.module';
import { ExaminationComponent } from './examinations/examination.component';
import { AddRoomComponent } from './addRoom/addRoom.component';
import { AddDoctorComponent } from './addDoctor/addDoctor.component.';
import { AddClinicAdminComponent } from './addClinicAdmin/addClinicAdmin.component';
import { JwtInterceptor } from './share/interceptor';


const route = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'adminKCHomePage', component: AdminKCHomePageComponent},
  { path: 'adminClinicHomePage', component: AdminClinicHomePageComponent},
  { path: 'doctorHomePage/:id', component: DoctorHomePageComponent},
  { path: 'patientProfile/:id', component: PatientProfileComponent},
  { path: 'Examinations', component: ExaminationComponent},
  { path: 'addRoom', component: AddRoomComponent},
  { path: 'addDoctor', component: AddDoctorComponent},
  {path: 'addClinicAdmin', component: AddClinicAdminComponent},
  
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminKCHomePageComponent,
    AdminClinicHomePageComponent,
    DoctorHomePageComponent,
    PatientProfileComponent,
    ExaminationComponent,
    AddRoomComponent,
    AddDoctorComponent,
    AddClinicAdminComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      route,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    MaterialModule,
    MatSelectModule
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
