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
/*
    addClinicAdmin(form:NgForm){
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        //ISCITATI ID KLINIKE 
        const clinicAdmin = new RegisterUser
                (
                form.value.email, 
                form.value.specialization,
                form.value.birthDate,
                form.value.jmbg,
                form.value.firstName,
                form.value.lastName,
                decodeToken.clinicId,
                "123456789",
                true,
                );
        this.data.AddClinicAdmin(clinicAdmin);
    }
    */
}