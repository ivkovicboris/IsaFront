import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';

@Component({
    selector: 'bookExaminationPage-component',
    templateUrl: 'bookExaminationPage.component.html',
    styleUrls: ['bookExaminationPage.component.css']
})
export class BookExaminationPageComponent implements OnInit {
    examinationDate: Date;
    doctorId: string;
    examinationType: string;
    patientId: any;
    patient: User[];
    doctor: User[];
    
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.patientId = decodeToken.jti;
        this.data.GetUserById(this.patientId).subscribe( response => {
            this.patient = response;
        });

        this.examinationDate = new Date(localStorage.getItem('examinationDate'));
        this.doctorId= localStorage.getItem('doctorId');
        this.examinationType = localStorage.getItem('examinationType');  
        
        this.data.GetUserById(this.doctorId).subscribe(response => {
            this.doctor = response;
        })
    }
    
        BookExamination() {
            const examination = new NewExamination(this.examinationDate, this.doctorId, this.patientId, this.examinationType);
            this.data.AddExamination(examination).subscribe( response =>{
            if(response) {
                alert('Your examination request has been recieved. Please check your email');
                this.router.navigate(['/searchClinics']);
            } else {
                alert('error');
            }
            
        });  
            this.router.navigate(["/updateProfile"]);
        }
    
    Cancel(){
        this.router.navigate(["/searchDoctors"])
    }       
}