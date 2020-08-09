import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';


@Component({
    selector: 'addClinicCenterAdmin-component',
    templateUrl: 'addClinicCenterAdmin.component.html',
    styleUrls: ['addClinicCenterAdmin.component.css']
})

export class AddClinicCenterAdminComponent {
      
    public clinicID:string;
    public clinics:any;
    public selectedClinic:any;
    public id: any;
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
    }
    constructor(private data: DataService, private router: Router) {}
    NewClinicCenterAdmin(form: NgForm){

        const user = new RegisterUser
        (
            form.value.firstName, 
            form.value.lastName, 
            form.value.email, 
            form.value.password, 
            false, 
            form.value.birthDate, 
            form.value.jmbg,
            "ClinicCenterAdmin",
            "",
            ""
        )
        this.data.Register(user).subscribe(response =>
        {
            ;
        });
        this.router.navigate(['/adminClinicCenterHomePage/'+ this.id]);
    }
}