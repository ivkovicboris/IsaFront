import { Component } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';


@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    public error:boolean = true;
    public submitted = false;
 
    constructor(private data: DataService, private router: Router) {}

    NewUser(form: NgForm){

        /*this.form = new FormGroup({
            email : new FormControl(this.form.email, [
                Validators.required,
            ])
        })*/

        const user = new RegisterUser
        (
            form.value.firstName, 
            form.value.lastName, 
            form.value.email, 
            form.value.password, 
            false, 
            form.value.birthDate, 
            form.value.jmbg,
            "Patient",
            "",
            ""
        )
        this.data.Register(user).subscribe(response =>
        {
            ;
        });
        this.submitted = true;
        
    }

}