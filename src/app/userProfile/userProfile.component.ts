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
    isAlienUser = false;
    patientId: string;
    isPatient = false;
    userRole: any;
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
            this.user = response;
            
        });
    
    }

    EditInformation(form) {
        this.router.navigate(["/updateProfile"]);
    }
    
    ShowMedicalRecord(){
        localStorage .setItem('alienProfile', this.isAlienUser.toString());
        localStorage.setItem('showUserId', this.userId);
        //this.router.navigate(["/medicalRecord"])
    }
        
}