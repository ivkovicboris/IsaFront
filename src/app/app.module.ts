import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { RegisterPatientComponent } from './registerPatient/registerPatient.component';
import { DataService } from './share/DataService';
import { FormsModule } from '@angular/forms';
import { AdminKCHomePageComponent } from './adminKCHomePage/adminKCHomePage.component';
import { AdminClinicHomePageComponent } from './adminClinicHomePage/adminClinicHomePage.component';
import { DoctorHomePageComponent } from './doctorHomePage/doctorHomePage.component';
import { PatientHomePageComponent } from './patientHomePage/patientHomePage.component';
import { UpdateProfileComponent } from './updateProfile/updateProfile.component';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './material.module';
import { AddRoomComponent } from './addRoom/addRoom.component';
import { AddClinicComponent } from './addClinic/addClinic.component';
import { AddDoctorComponent } from './addDoctor/addDoctor.component.';
import { AddClinicAdminComponent } from './addClinicAdmin/addClinicAdmin.component';
import { AddClinicCenterAdminComponent } from './addClinicCenterAdmin/addClinicCenterAdmin.component';
import { JwtInterceptor } from './share/interceptor';

import { SearchClinicsComponent } from './searchClinics/searchClinics.component';
import { SearchRoomsComponent } from './searchRooms/searchRooms.component';
import { SearchDoctorsComponent } from './searchDoctors/searchDoctors.component';
import { SearchPatientsComponent} from './searchPatients/searchPatients.component';
import { EditRoomComponent } from './editRoom/editRoom.component';
import { PriceListComponent } from './priceList/priceList.component';
import { PriceEditComponent } from './priceEdit/priceEdit.component';

import { MatDialogModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import {  BookExaminationPageComponent } from './bookExaminationPage/bookExaminationPage.component';

import { SearchExaminationsComponent } from './searchExaminations/searchExaminations.component';
import { ExaminationViewComponent }from './examinationView/examinationView.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BusinessStatisticsComponent } from './bussinesStatistics/businessStatistics.component';


const route = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerPatient', component: RegisterPatientComponent},

  { path: 'addRoom', component: AddRoomComponent},
  { path: 'addDoctor', component: AddDoctorComponent},
  { path: 'addClinicAdmin', component: AddClinicAdminComponent},
  { path: 'addClinic', component: AddClinicComponent},
  { path: 'addClinicCenterAdmin', component: AddClinicCenterAdminComponent },

  { path: 'adminKCHomePage', component: AdminKCHomePageComponent},
  { path: 'adminClinicHomePage', component: AdminClinicHomePageComponent},
  { path: 'doctorHomePage', component: DoctorHomePageComponent},
  { path: 'patientHomePage', component: PatientHomePageComponent },

  { path: 'updateProfile', component: UpdateProfileComponent},
  { path: 'userProfile', component: UserProfileComponent},
  
  
  { path: 'searchClinics', component: SearchClinicsComponent },
  {path: 'searchRooms', component: SearchRoomsComponent},
  {path: 'searchDoctors', component: SearchDoctorsComponent},
  { path: 'searchPatients', component: SearchPatientsComponent},
  { path: 'searchExaminations', component: SearchExaminationsComponent},
  { path: 'editRoom', component: EditRoomComponent},

  { path: 'priceList', component: PriceListComponent },
  { path: 'priceEdit', component: PriceEditComponent},
  {path: 'changePassword', component: ChangePasswordComponent},

  {path: 'bookExaminationPage', component: BookExaminationPageComponent},
  {path: 'examinationView', component: ExaminationViewComponent},
  {path: 'businessStatistics', component: BusinessStatisticsComponent}

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
    UpdateProfileComponent,
    SearchClinicsComponent,
    UserProfileComponent,
    PriceListComponent,
    ChangePasswordComponent,
    PriceEditComponent,
    SearchRoomsComponent,
    EditRoomComponent,
    SearchDoctorsComponent,
    SearchPatientsComponent,
    BookExaminationPageComponent,
    SearchExaminationsComponent,
    ExaminationViewComponent,
    BusinessStatisticsComponent,
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
    ReactiveFormsModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [DatePipe,
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
