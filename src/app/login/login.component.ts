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
        
        this.data.Login(user).subscribe(token => {
            this.token = token;
            
            if (this.token == null) { 
              alert('Invalid Email or Password!\n Make sure to check your email for confirmation link if you have not so far!'); 
            } else {
              localStorage.setItem('token', this.token.token);
              localStorage.setItem('expires_in', this.token.expiration);
              const tokenPayload = jwt_decode(this.token.token);
              this.id = tokenPayload.jti;
              localStorage.setItem('Role',tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
              const userRole=localStorage.getItem('Role');
              if (userRole=='Patient') { this.router.navigate(['/patientHomePage/']);
                } else {
                      this.data.CheckIfSignedBefore(this.id).subscribe (response =>{
                        if (!response){
                          alert('Please change your predefined password before proceeding.\n You have been given the predefined password on your registration email!')
                          this.router.navigate(['/changePassword']);
                        }
                      });
                      if (userRole=='ClinicAdmin'){ this.router.navigate(['/adminClinicHomePage/']);}
                      else if (userRole=='Doctor'){ this.router.navigate(['/doctorHomePage/']);}
                      else if (userRole=='Nurse'){ this.router.navigate(['/doctorHomePage/']);}
                      else if (userRole=='ClinicCenterAdmin') { this.router.navigate(['/adminKCHomePage/'])}
                  }
          } 
      });
          
    }
    
}