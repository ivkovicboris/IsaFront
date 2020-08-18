import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { RequestExamination } from "../share/RequestExamination";


@Component({
    selector: 'adminClinicHomePage-component',
    templateUrl: 'adminClinicHomePage.component.html',
    styleUrls: ['adminClinicHomePage.component.css']
})
export class AdminClinicHomePageComponent {

    public id:any;
    public error:boolean = true;
    public examination:any;
    public clinicId:string;
    public priceList: any;
    public specializations: any;
    public clinic:any;

    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.data.GetClinicByAdminId(this.id).subscribe( response => {
            this.clinic = response;
            localStorage.setItem('clinicId', this.clinic.clinicId)
        });


        this.data.GetAllSpecializations().subscribe( response => {
            this.specializations = response;
        })
       
        
        
    }

    ShowDoctors(){
        localStorage.setItem('clinicId', this.clinic.clinicId);
        this.router.navigate(["/searchDoctors"]);
    }
   

}