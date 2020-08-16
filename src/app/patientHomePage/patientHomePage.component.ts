import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';
import * as jwt_decode from "jwt-decode";
import { Examination } from '../share/Examination';
import { RequestExamination } from '../share/RequestExamination';
import { AddClinicAdminComponent } from '../addClinicAdmin/addClinicAdmin.component';
import { Clinic } from '../share/Clinic';
import { NewExamination } from '../share/NewExamination';

@Component({
    selector: 'patientHomePage-component',
    templateUrl: 'patientHomePage.component.html',
    styleUrls: ['patientHomePage.component.css']
})
export class PatientHomePageComponent implements OnInit {
    
    public clinics:any;
    public DoctorsFreeExaminations: any;
    public id: any;
    public items: Examination[];
    public examinationDate: Date;
    public selectedType: string;
    public types: string[] = [
        "Psychiatrist", 
                "Cardiologist",
                "Dermatologist",
                "Endocrinologist",
                "Gastroenterologist",
                "Ophthalmologist",
                "Otolaryngologist",
                "Pulmonologist",
                "Neurologist",
                "Oncologist",
                "Anesthesiologist"
      ];
    

    constructor(private data: DataService, private arouter: ActivatedRoute) {}
    
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
        
    }

    public  examinationRequest(form: NgForm){
        const requestExamination = new RequestExamination('00000000-0000-0000-0000-000000000000',form.value.examinationDate, this.selectedType, );
        this.data.GetClinicByTypeDateExamination(requestExamination).subscribe(response => { 
                this.clinics = response
                this.examinationDate= form.value.examinationDate;
                this.selectedType = form.value.selectedType;
                localStorage.setItem('date', this.examinationDate.toString());
                localStorage.setItem('type', this.selectedType);
        });
    }

    public  examinationRequestForClinic(clinic: Clinic, date:Date, type: string){
        const requestExamination = new RequestExamination(clinic.clinicId, this.examinationDate, this.selectedType);
        this.data.GetFreeExaminationAndDoctorByClinic(requestExamination).subscribe(response => { 
                this.DoctorsFreeExaminations = response
            response.forEach(element => {
                    var a = element.doctor
                    var b = element.freeExamination
                });
        });
        
    }

    public NewExamination(date: Date, doctor: any){
        const examination = new NewExamination(date, doctor, this.id, this.selectedType);
        this.data.AddExamination(examination);
    }
}