import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';


@Component({
    selector: 'addClinicAdmin-component',
    templateUrl: 'addClinicAdmin.component.html',
    styleUrls: ['addClinicAdmin.component.css']
})
export class AddClinicAdminComponent {
    
    
    public clinicID:string;
   
    constructor(private data: DataService, private arouter: ActivatedRoute) {}
    NewUser(form: NgForm){

        const user = new RegisterUser
        (
            form.value.firstName, 
            form.value.lastName, 
            form.value.email, 
            form.value.password, 
            false, 
            form.value.birthDate, 
            form.value.jmbg,
            "ClinicAdmin",
            ""
        )
        this.data.register(user).subscribe(response =>
        {
            ;
        });
        
    }
}