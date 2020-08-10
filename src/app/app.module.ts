import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './registerPatient/registerPatient.component';
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
import { AddClinicComponent } from './addClinic/addClinic.component';
import { AddDoctorComponent } from './addDoctor/addDoctor.component.';
import { AddClinicAdminComponent } from './addClinicAdmin/addClinicAdmin.component';
import { AddClinicCenterAdminComponent } from './addClinicCenterAdmin/addClinicCenterAdmin.component';
import { JwtInterceptor } from './share/interceptor';
import { PatientHomePageComponent } from './patientHomePage/patientHomePage.component';
import { SearchClinicsComponent } from './searchClinics/searchClinics.component';


const route = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerPatient', component: RegisterPatientComponent},

  { path: 'addRoom', component: AddRoomComponent},
  { path: 'addDoctor', component: AddDoctorComponent},
  { path: 'addClinicAdmin', component: AddClinicAdminComponent},
  { path: 'addClinic', component: AddClinicComponent},
  { path: 'addClinicCenterAdmin', component: AddClinicCenterAdminComponent },

  { path: 'adminKCHomePage/:id', component: AdminKCHomePageComponent},
  { path: 'adminClinicHomePage/:id', component: AdminClinicHomePageComponent},
  { path: 'doctorHomePage/:id', component: DoctorHomePageComponent},
  { path: 'patientHomePage/:id', component: PatientHomePageComponent },

  { path: 'patientProfile/:id', component: PatientProfileComponent},
  { path: 'Examinations', component: ExaminationComponent},
  
  { path: 'searchClinics', component: SearchClinicsComponent }
  
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterPatientComponent,
    AddRoomComponent,
    AddDoctorComponent,
    AddClinicAdminComponent,
    AddClinicComponent,
    AddClinicCenterAdminComponent,
    AdminKCHomePageComponent,
    AdminClinicHomePageComponent,
    DoctorHomePageComponent,
    PatientHomePageComponent,
    PatientProfileComponent,
    ExaminationComponent,
    SearchClinicsComponent,

   
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
    MatSelectModule,
    ReactiveFormsModule
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
