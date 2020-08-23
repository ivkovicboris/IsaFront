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

    constructor(private data: DataService,  private router: Router) {}
    
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
        
    }

    MyExaminations(){
        this.router.navigate(["/searchExaminations"]);
    }
    MyProfile()
    {
        localStorage.setItem('alienProfile', "false")
        this.router.navigate(["/userProfile"])
    }
}