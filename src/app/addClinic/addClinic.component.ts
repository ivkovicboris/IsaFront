import { DataService } from '../share/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { ok } from 'assert';


@Component({
    selector: 'addClinic-component',
    templateUrl: 'addClinic.component.html',
    styleUrls: ['addClinic.component.css']
})
export class AddClinicComponent {
  
    public clinicID:string;
    public id:string;
    result: Object;
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
    }
   
    constructor(private data: DataService, private router: Router) {}
    AddClinic(form: NgForm){

        const clinic = new Clinic
        (
            '00000000-0000-0000-0000-000000000000',
            form.value.name, 
            form.value.address
        )
        this.data.AddClinic(clinic).subscribe(response =>
        {
            if(response) {
                alert('New Clinic named:' + form.value.name + 'added successfully');
            } else {
                alert('error');
            }
            this.router.navigate(['/adminKCHomePage/']);;
        });
        
        
    }
}