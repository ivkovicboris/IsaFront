import { DataService } from '../share/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
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
    clinicForm: any;
    submitted: boolean;
    
    ngOnInit() {
        this.clinicForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            about:[''],
        });
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
    }
   
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    get f() { return this.clinicForm.controls; }
    
    onSubmit(){
        this.submitted = true;
        
        if (this.clinicForm.invalid) {
            return;
        }
        const clinic = new Clinic
        (
            "00000000-0000-0000-0000-000000000000",
            this.clinicForm.value.name, 
            this.clinicForm.value.address, 
            this.clinicForm.value.about, 
        )
        this.data.AddClinic(clinic).subscribe(response =>
            {
                if(response) {
                    alert('New Clinic named: ' + this.clinicForm.value.name + ' added successfully');
                } else {
                    alert('error');
                }
                this.router.navigate(['/adminKCHomePage/']);
            }); 
    }

     onReset() {
            this.submitted = false;
            this.router.navigate(['/adminKCHomePage/']);
        }
}