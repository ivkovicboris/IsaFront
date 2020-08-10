import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';

import { MustMatch } from '../must-match.validator';

@Component({
    selector: 'registerPatient-component',
    templateUrl: 'registerPatient.component.html',
    styleUrls: ['registerPatient.component.css']
})
export class RegisterPatientComponent implements OnInit{
    registerForm: FormGroup;
    public error:boolean = true;
    public submitted = false;
    result: any;
 
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            jmbg: ['',Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
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
            this.registerForm.value.country,
            "Patient",
            "",
            ""
        )
        this.data.Register(user).subscribe(response =>
        {
            this.result = response ;
        });
        if(this.result)
        {
            alert('Your registration request has been recieved. Please check your email:\n' + this.registerForm.value.email + '\nfor confirmation link\n');
        } else {
            alert(this.result);
        }
        this.router.navigate(['/login']);
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}