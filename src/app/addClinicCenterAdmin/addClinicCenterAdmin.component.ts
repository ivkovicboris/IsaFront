import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';
import { MustMatch } from '../must-match.validator';


@Component({
    selector: 'addClinicCenterAdmin-component',
    templateUrl: 'addClinicCenterAdmin.component.html',
    styleUrls: ['addClinicCenterAdmin.component.css']
})

export class AddClinicCenterAdminComponent {
      
    public registerForm: FormGroup; 
    public clinicID:string;
    public clinics:any;
    public selectedClinic:any;
    public id:string;
    public submitted: boolean;
    result: any;

    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            jmbg: [''],
            address: [''],
            city: [''],
            state: [''],
            clinicID: ['']
        },{
            validator: MustMatch('password', 'confirmPassword') 
        });
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
    }
    
    get f() { return this.registerForm.controls; }
    
    onSubmit(){
        this.submitted = true;
        
        if (this.registerForm.invalid) {
            return;
        }
        const user = new RegisterUser
        (
            this.registerForm.value.firstName, 
            this.registerForm.value.lastName, 
            this.registerForm.value.email, 
            this.registerForm.value.password, 
            false, 
            this.registerForm.value.jmbg,
            this.registerForm.value.address,
            this.registerForm.value.city,
            this.registerForm.value.state,
            "ClinicCenterAdmin",
            "",
            ""
        )
        this.data.Register(user).subscribe(response =>
        {
            if(response) {
                alert('New Clinic Center Admin succsessfully added');
             } else {
                alert('error');
        }
        this.router.navigate(['/adminKCHomePage/'+ this.id]);
        });
        
    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
        this.router.navigate(['/adminKCHomePage/'+ this.id]);
    
    }
    
}