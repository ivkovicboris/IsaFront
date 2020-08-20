import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';
import { Mail } from '../share/Mail';

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
    patient: any;
    doctor: any;
    clinic: any;
    admins: any;
    adminEmails = new Array<string>();
    
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
            this.data.GetClinicByAdminId(this.doctorId).subscribe (response => {
                this.clinic=response;
                this.data.GetAdminsFromClinic(this.clinic.clinicId).subscribe (response => {
                    this.admins = response;
                })
                
            })
        })
    }
    
        BookExamination() {
            const examination = new NewExamination(this.examinationDate, this.doctorId, this.patientId, this.examinationType);
            this.data.AddExamination(examination).subscribe( response =>{
                if(!response) {
                    alert('Your session has expired, please log in again!');
                    localStorage.clear();
                    this.router.navigate(["/login"])
                } else {
                    alert('Your examination request has been recieved. Please check your email for confirmation');
                    this.admins.forEach(admin => {
                        this.adminEmails.push(admin.email);
                    });
                    const mail = new Mail (
                        "HOSPITAL ISA - NEW EXAMINATION REQUEST",
                        "",
                        this.adminEmails,
                        //body:
                        "New Examination request has been submitted: \n"
                        + "Examination requested date and time:" + this.examinationDate + " \n"
                        + "Examination type: "+ this.examinationType + "\n"
                        + "Requested Doctor: "+ this.doctor.firstName + " " + this.doctor.lastName +"\n" 
                        + "Respond to request: " + "http://localhost:4200/adminClinicHomePage"
                        //end body
                    )
                    this.data.SendMail(mail).subscribe(response =>
                        {
                            if(!response){
                                alert('Mail not sent!')
                                return; 
                            }
                        });
                    this.router.navigate(['/searchClinics']);
                    
                }
                
            });  
        }
    
    Cancel(){
        this.router.navigate(["/searchDoctors"])
    }       
}