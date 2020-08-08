import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';
import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'patientProfile-component',
    templateUrl: 'patientProfile.component.html',
    styleUrls: ['patientProfile.component.css']
})
export class PatientProfileComponent implements OnInit {

    public id: any;
    public error = true;
    public user: any;

    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        //this.id = this.arouter.snapshot.paramMap.get('id');
        //this.id='b4d714ea-5536-46a0-8fe4-90b9a222b573';
        this.data.GetUserById(this.id).subscribe( response => {
            this.user = response;
        });
    }

    edit(user) {
        this.data.UpdateProfile(this.user).subscribe(response => {
            location.reload();
        });
    }
}