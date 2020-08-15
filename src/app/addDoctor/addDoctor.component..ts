import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';
import { MustMatch } from '../must-match.validator';


@Component({
    selector: 'addDoctor-component',
    templateUrl: 'addDoctor.component.html',
    styleUrls: ['addDoctor.component.css']
})
export class AddDoctorComponent {
    public registerForm: FormGroup; 
    public clinicId:string;
    public clinic:any;
    public selectedClinic:any;
    public id:string;
    public submitted: boolean;
    public specializations:any;
    public selectedSpecialization: string;
    spec: string;

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
            clinicID: [''],
            
        },{
            validator: MustMatch('password', 'confirmPassword') 
        });
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.data.GetClinicByAdminId(this.id).subscribe( response => {
            this.clinic = response;
        });
        this.data.GetAllSpecializations().subscribe( response => {
            this.specializations = response;
        })
        var s = this.specializations;
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
            "Doctor",
            this.selectedSpecialization,
            this.clinic.clinicId
        )
        this.data.Register(user).subscribe(response =>
        {
            ;
        });
        alert('Doctor succsessfully added');
        this.router.navigate(['/adminClinicHomePage/']);
    }
    onReset() {
        this.submitted = false;
        this.router.navigate(['/adminClinicHomePage/']);
    }
    
}