import { DataService } from '../share/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import * as jwt_decode from "jwt-decode";


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
            form.value.name, 
            form.value.address
        )
        this.data.AddClinic(clinic).subscribe(response =>
        {
            this.result = response;
        });
        if(this.result) {
            alert('New Clinic named:' + form.value.name + 'added successfully');
        } else {
            alert(this.result);
        }
        this.router.navigate(['/adminKCHomePage/'+ this.id]);
        
    }
}