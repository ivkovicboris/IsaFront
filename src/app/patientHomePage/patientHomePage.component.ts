import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';
import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'patientHomePage-component',
    templateUrl: 'patientHomePage.component.html',
    styleUrls: ['patientHomePage.component.css']
})
export class PatientHomePageComponent implements OnInit {
    
    public id: any;

    constructor(private data: DataService, private arouter: ActivatedRoute) {}
    
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
    }
}