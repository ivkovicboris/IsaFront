import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Component({
    selector: 'changePassword-component',
    templateUrl: 'changePassword.component.html',
    styleUrls: ['changePassword.component.css']
})
export class ChangePasswordComponent {
    id: any;
    oldPassword: any;

        constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
        
        ngOnInit() {
            const token = localStorage.getItem('token');
            const decodeToken = jwt_decode(token);
            this.id = decodeToken.jti;
            
            this.data.GetPasswordByUserId(this.id).subscribe ( response => {
                this.oldPassword = response;
            })

        }
}