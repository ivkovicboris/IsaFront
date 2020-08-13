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

    public id: any;
    public error = true;
    public user: any;
    
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        this.data.GetUserById(this.id).subscribe( response => {
            this.user = response;
        });
    
    }
    
        EditInformation(form) {
            this.router.navigate(["/updateProfile"]);
        }
    
        
}