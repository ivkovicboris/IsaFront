import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import {MatDatepicker} from '@angular/material/datepicker';
import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';
import { Mail } from '../share/Mail';
import { Examination } from '../share/Examination';


@Component({
    selector: 'medicalRecord-component',
    templateUrl: 'medicalRecord.component.html',
    styleUrls: ['medicalRecord.component.css']
})
export class MedicalRecordComponent implements OnInit{
    public userId: any;
    public error = true;
    public user: any;
    isAlienUser = false;
    patientId: string;
    isPatient = false;
    userRole: any;
    patient: any;
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;
        this.userRole=localStorage.getItem('Role');
        if(localStorage.getItem('alienProfile')=="true")
            if( this.userRole=="ClinicAdmin"){
                this.isAlienUser=true;
                this.userId = localStorage.getItem('showUserId');
            } else if ( this.userRole=="Doctor"){
                this.isAlienUser=true;
                this.userId = localStorage.getItem('showUserId');
            }else if( this.userRole=="Patient"){
                this.isAlienUser=true;
                this.isPatient=true;
                this.userId = localStorage.getItem('showUserId');
            }

            this.data.GetUserById(this.userId).subscribe( response => {
                this.patient = response;
            });
    }

    

}

