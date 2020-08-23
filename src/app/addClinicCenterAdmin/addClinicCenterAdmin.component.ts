import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';
import { MustMatch } from '../must-match.validator';
import { Mail } from '../share/Mail';
import { GeneratePassword } from '../password-generator';


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
    randomPassword: string;
    public receivers: Array<string>;

    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['', [Validators.required, Validators.email]],
            jmbg: ['', [Validators.required]],
            address: [''],
            city: [''],
            state: [''],
            clinicID: ['']
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
        this.randomPassword = GeneratePassword(8);
        const user = new RegisterUser
        (
            this.registerForm.value.firstName, 
            this.registerForm.value.lastName, 
            this.registerForm.value.email, 
            this.randomPassword,
            false, 
            this.registerForm.value.jmbg,
            this.registerForm.value.address,
            this.registerForm.value.city,
            this.registerForm.value.state,
            "ClinicCenterAdmin",
            "",
            "",
            0
        )
        this.data.Register(user).subscribe(response =>
        {
            if(response){
                alert('New Clinic Center Admin succsessfully added');
                
            } else {
                alert('There is already registered user with email: ' + this.registerForm.value.email);
            }
            
            
        });
        this.receivers = new Array<string>();
        this.receivers.push(this.registerForm.value.email)
        const mail = new Mail (
            "HOSPITAL ISA - Account created",
            "",
            this.receivers,
            //body:
            "Hi, " + this.registerForm.value.firstName + ",\n"
            + "You have been added to HOSPITAL ISA as Clinic Center Admin for clinic: "
            + "Activate your account by visiting this link:" + "http://localhost:4200/ \n"
            + "Your predefined password is: "+ this.randomPassword + "\n" //ubaciti generator passworda 
            + "Feel free to contact us!\n\nSincerely,\n Hospital Isa Team. "
            //end body
        )
            // this.data.SendMail(mail);
             this.router.navigate(['/adminKCHomePage/']);
        
    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
        this.router.navigate(['/adminKCHomePage/']);
    
    }
    
}