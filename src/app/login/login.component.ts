import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../share/User';
import { DataService } from '../share/DataService';
import { NgForm } from '@angular/forms';
import {LoginUser} from '../share/LoginUser';
import {decode} from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from "jwt-decode";
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    
    public error:boolean = true;
    public token:any;
    public id:any;
    constructor(private data: DataService, private router: Router) {}

    onLogin(form: NgForm){
        const user = new LoginUser(form.value.email, form.value.password)
        this.data.login(user).subscribe(token => {
            this.token = token;
            
            if (this.token !== null) {
              localStorage.setItem('token', this.token.token);
              localStorage.setItem('expires_in', this.token.expiration);
                   
            } else {
              //this.resetForm(form);
              this.error = false;
            }
            //const newtoken = localStorage.getItem('token');
            const tokenPayload = jwt_decode(this.token.token);
            this.id=tokenPayload.jti;
            if(tokenPayload.Role=='AdministratorCentra') { this.router.navigate(['/adminKCHomePage/']);} 
              else if (tokenPayload.Role=='AdministratorKlinike'){ this.router.navigate(['/adminClinicHomePage/'+ this.id]);}
              else if (tokenPayload.Role=='Doktor'){ this.router.navigate(['/doctorHomePage/'+ this.id]);}
              else if (tokenPayload.Role=='Sestra'){ this.router.navigate(['/doctorHomePage/'+ this.id]);}
              else if (tokenPayload.Role=='Pacijent'){ this.router.navigate(['/patientProfile/'+ this.id]);}    
          });
          
    }
    
}