import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';
import { RequestExamination } from '../share/RequestExamination';
import { Price } from '../share/Price';
import { DatePipe } from '@angular/common';
import { convertUTCDateToLocalDate } from '../dateConvertUTC';
import * as jwt_decode from "jwt-decode";
import { Clinic } from '../share/Clinic';


@Component({
    selector: 'searchPatients-component',
    templateUrl: 'searchPatients.component.html',
    styleUrls: ['searchPatients.component.css']
})
export class SearchPatientsComponent implements OnInit {
    userRole: any;
    userId: any;
    clinic: any;
    clinicId:string;
    patientsInClinic: any;
    patientsOfDoctor: any;
    patients: any;
    
    constructor(private data: DataService, private router: Router, public datepipe: DatePipe ) {}
    ngOnInit(): void {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userRole = decodeToken.Role;
        this.userId = decodeToken.jti;

        this.data.GetClinicByAdminId(this.userId).subscribe( response => {
            this.clinic = response;
            this.clinicId=this.clinic.clinicId;
            this.data.GetPatientsByClinicId(this.clinicId).subscribe(response => {
                this.patientsInClinic = response;
            }) ;
            this.data.GetPatientsByDoctorId(this.userId).subscribe(response => {
                this.patientsOfDoctor = response;
            });
        });
    } 

    MyPatients(){
        this.patientsInClinic = this.patientsOfDoctor;
        
    }
    AllPatients(){
        this.ngOnInit();
    }

    IsMyPatient(jmbg:any){
        this.patientsOfDoctor.forEach(element => {
            if(jmbg==element.jmbg){
                this.router.navigate(["/doctorHomePage"]);
            }  else {
                alert('You do ont have permission to see medical record of this patient!')
                return;      
            }    
            
        });
    }
    sortAsc(colName:any){
        this.patientsInClinic.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return 1;
            } else if(a[colName] < b[colName]) {
              return -1;
            } else {
              return 0;
            }
          });
    }
    sortDesc(colName){
        this.patientsInClinic.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }


}
