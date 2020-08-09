import { DataService } from '../share/DataService';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
    selector: 'addClinic-component',
    templateUrl: 'addClinic.component.html',
    styleUrls: ['addClinic.component.css']
})
export class AddClinicComponent {
  
    public clinicID:string;
   
    constructor(private data: DataService, private arouter: ActivatedRoute) {}
    AddClinic(form: NgForm){

        const clinic = new Clinic
        (
            form.value.name, 
            form.value.address
        )
        this.data.AddClinic(clinic).subscribe(response =>
        {
            ;
        });
        
    }
}