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
    public clinicID:string;

    constructor(private data: DataService, private arouter: ActivatedRoute) {}

   

    ngOninit() {

        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);

        this.data.GetExaminationRequests(decodeToken.clinicID).subscribe( response => {
            this.examination = response;
        });
    }
   

}