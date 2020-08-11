import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterUser } from '../share/RegisterUser';
import { Mail } from "../share/Mail";
import { empty } from 'rxjs';


@Component({
    selector: 'adminKCHomePage-component',
    templateUrl: 'adminKCHomePage.component.html',
    styleUrls: ['adminKCHomePage.component.css']
})

export class AdminKCHomePageComponent {

    public id:any;
    public error:boolean = true;
    public users:any;
    public mail:any;
    public accepted:boolean;
    clinics: import("d:/FAKS/ISA/2020/IsaFront/src/app/share/Clinic").Clinic[];

    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit(){
       // this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.GetRegisterRequests().subscribe( response => {
            this.users = response;
        });

    }

    checkClinics(){
        this.data.GetAllClinics().subscribe( response =>{
            this.clinics=response;
            if(this.clinics==null) alert('There are no clinics in the system. Add at least one clinic to proceed!')
        })
    }

    Accept(email: any){
       
        const mail = new Mail
        (
            "HOSPITAL ISA - registration ACCEPTED",
            "",
            email,
            "Your registration request has been accepted. Activate your account by visiting this link:" + "http://localhost:4200/"
        );
        this.data.AcceptPatientRegisterRequest(mail).subscribe( response => {
            if(response){
                alert('Patient request has been accepted. Mail notification has been sent to: ' + mail.receiver);
            }else {
                alert('Something went wrong :(');
            }
            this.ngOnInit();
        });   
    }

    Deny(email: any){
        
        const mail = new Mail
        (
            "HOSPITAL ISA - registration DENIED",
            "",
            email,
            "Your registration request has been denied!"
            
            
        );
        this.data.DenyPatientRegisterRequest(mail).subscribe( response => {
            if(response){
                alert('Patient request has been denied. Mail notification has been sent to: ' + mail.receiver);
            }else {
                alert('Something went wrong :(');
            }
            this.ngOnInit();
        });
    }
    GetUsers(){
        this.data.GetUsers().subscribe(respone => {
            ;
        })
    }
}
