import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'userProfile-component',
    templateUrl: 'userProfile.component.html',
    styleUrls: ['userProfile.component.css']
})
export class UserProfileComponent implements OnInit {

    public userId: any;
    public error = true;
    public user: any;
    isAdminClinic = false;
    isDoctor = false;
    isPatient = false;
    patientId: string;
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;
       
        if(localStorage.getItem('alienProfile')=="true")
            if(decodeToken.Role=="ClinicAdmin"){
                this.isAdminClinic=true;
                this.userId = localStorage.getItem('showUserId');
            } else if (decodeToken.Role=="Doctor"){
                this.isDoctor=true;
                this.userId = localStorage.getItem('showUserId');
            }else if(decodeToken.Role=="Patient"){
                this.isPatient=true;
                this.userId = localStorage.getItem('showUserId');
            }
        
        this.data.GetUserById(this.userId).subscribe( response => {
            this.user = response;
        });
    
    }

    EditInformation(form) {
        this.router.navigate(["/updateProfile"]);
    }
    
    ShowMedicalRecord(){
        //this.router.navigate(["/medicalRecord"])
    }
        
}