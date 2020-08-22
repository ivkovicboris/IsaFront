import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

import { MustMatch } from '../must-match.validator';


@Component({
    selector: 'updateProfile-component',
    templateUrl: 'updateProfile.component.html',
    styleUrls: ['updateProfile.component.css']
})
export class UpdateProfileComponent implements OnInit{
    registerForm: FormGroup;
    
    public submitted = false;
    public userRole:any;
    result: any;
    public id: any;
    public user: any;
 
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            confirmPassword: [''],
            jmbg: ['',Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required]
        });
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        this.userRole=decodeToken.Role;
        //this.id = this.arouter.snapshot.paramMap.get('id');
        //this.id='b4d714ea-5536-46a0-8fe4-90b9a222b573';
        this.data.GetUserById(this.id).subscribe( response => {
            this.user = response;
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit(){
        this.submitted = true;
        
        if (this.registerForm.invalid) {
            return;
        }
        
        const userUpdate = new RegisterUser
        (
            this.registerForm.value.firstName, 
            this.registerForm.value.lastName, 
            this.registerForm.value.email, 
            this.registerForm.value.password, 
            this.user.emailConfirmed, 
            this.registerForm.value.jmbg,
            this.registerForm.value.address,
            this.registerForm.value.city,
            this.registerForm.value.state,
            this.user.userRole,
            this.user.clinicId,
            this.user.specialization,
            0
        )
        
        if(this.userRole == "Patient"){
            this.data.UpdatePatient(userUpdate).subscribe(response => {
                if(response) {
                    alert(this.registerForm.value.firstName + ', your profile has been updated');
                } else {
                    alert(this.result);
                }
            });
        } else {
            this.data.UpdateEmployee(userUpdate).subscribe(response => {
                if(response) {
                    alert(this.registerForm.value.firstName + ', your profile has been updated');
                } else {
                    alert(this.result);
                }
            });
        }

        if (this.userRole=='Patient') { this.router.navigate(['/patientHomePage/']);} 
            else if (this.userRole=='ClinicAdmin'){ this.router.navigate(['/adminClinicHomePage/']);}
            else if (this.userRole=='Doctor'){ this.router.navigate(['/doctorHomePage/']);}
            else if (this.userRole=='Nurse'){ this.router.navigate(['/doctorHomePage/']);}
            else if (this.userRole=='ClinicCenterAdmin') { this.router.navigate(['/adminKCHomePage/'])}  
       
    }

    onReset() {
        this.submitted = false;
        this.router.navigate(["/userProfile"]);
    }

    
}