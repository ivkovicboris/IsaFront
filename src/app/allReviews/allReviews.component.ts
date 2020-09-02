import { Component, OnInit } from '@angular/core';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'allReviews-component',
    templateUrl: 'allReviews.component.html',
    styleUrls: ['allReviews.component.css']
})
export class AllReviewsComponent implements OnInit{
    adminId: string;
    clinic: any;
    reviews: any;
    patient: any;
    patients: any;
    doctor: any;
  clinicId: string;


constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;
        this.clinicId = localStorage.getItem('clinicId');
        this.data.GetClinicById(this.clinicId).subscribe (response => {
            this.clinic = response[0];
            
            this.data.GetAllReviewsFromClinic( this.clinicId).subscribe (response=>{
                    this.reviews = response;
                    // this.reviews.forEach(review => {
                    //     this.data.GetUserById(review.patientId).subscribe (response => {
                    //         this.patient = response;
                    //         this.patients.push(this.patient);
                    //     })
                    // });
            });
        
        })
    }

    public FindPatient(patientId:string){
        this.data.GetUserById(patientId).subscribe (response => {
                    this.patient = response;
                    return this.patient.firstName;

                })
                return null;
    }

    FindDoctor(doctorId:string){
        this.data.GetUserById(doctorId).subscribe (response => {
            if(!response){
                return this.clinic.name
            } else {
                this.doctor = response;
                return this.doctor.firstName;
            }
        })
    }

    sortAsc(colName:any){
        this.reviews.sort((a, b) => {
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
        this.reviews.sort((a, b) => {
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
