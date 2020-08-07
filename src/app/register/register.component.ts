import { Component } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';

@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    public error:boolean = true;
    public hiddenForm = false;

    constructor(private data: DataService, private router: Router) {}

    NewUser(form: NgForm){
        const user = new RegisterUser
        (
            form.value.firstName, 
            form.value.lastName, 
            form.value.email, 
            form.value.password, 
            false, 
            form.value.birthDate, 
            form.value.jmbg,
            "Pacijent")
        this.data.register(user).subscribe(response =>
        {
            ;
        });
        
        this.hiddenForm = true;
    }

}