import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';
import { MustMatch } from '../must-match.validator';
import { Mail } from '../share/Mail';
import { GeneratePassword } from '../password-generator';


@Component({
    selector: 'addClinicAdmin-component',
    templateUrl: 'addClinicAdmin.component.html',
    styleUrls: ['addClinicAdmin.component.css']
})

export class AddClinicAdminComponent {
    public registerForm: FormGroup; 
    public clinicID:string;
    public clinics:any;
    public selectedClinic:any;
    public id:string;
    public submitted: boolean;
    result: any;
    randomPassword: string;

    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        

        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.registerForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['', [Validators.required, Validators.email]],
            jmbg: [''],
            address: [''],
            city: [''],
            state: [''],
            clinicID: ['']
        });
        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
        // if(!this.clinics) {
        //     alert('There are no clinics in the system. Add at least one clinic to proceed!')
        //     this.router.navigate(['/adminKCHomePage/']);
        // }
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
            "ClinicAdmin",
            "",
            this.selectedClinic
        )
        this.data.Register(user).subscribe(response =>
            {
                if(response){
                    alert('New Clinic Admin succsessfully added');
                    const mail = new Mail (
                        "HOSPITAL ISA - Account created",
                        "",
                        this.registerForm.value.email,
                        //body:
                        "Hi, " + this.registerForm.value.firstName + ",\n"
                        + "You have been added to HOSPITAL ISA as Clinic Admin for clinic: "
                        + this.clinics.name + ".\n"
                        + "Activate your account by visiting this link:" + "http://localhost:4200/ \n"
                        + "Your predefined password is: " + this.randomPassword + "\n" 
                        + "Feel free to contact us!\n\nSincerely,\n Hospital Isa Team. "
                        //end body
                    )
                    this.data.SendMail(mail);
                } else {
                    alert('There is already registered user with email: ' + this.registerForm.value.email);
                }
            this.router.navigate(['/adminKCHomePage/']);
            });
            
        }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
        this.router.navigate(['/adminKCHomePage/']);
    
    }
    
}