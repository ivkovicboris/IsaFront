import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterUser } from '../share/RegisterUser';
import { Mail } from "../share/Mail";


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

    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit(){
       // this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.GetRegisterRequests().subscribe( response => {
            this.users = response;
        });
    }

    Accept(email: any){
       
        const mail = new Mail
        (
            "HOSPITAL ISA - registration ACCEPTED",
            "",
            email,
            "Your registration request has been accepted. Activate your account on this link:" + "http://localhost:4200/"
        );
        this.data.AcceptPatientRegisterRequest(mail).subscribe( response => {
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
            this.ngOnInit();
        });
    }
    GetUsers(){
        this.data.GetUsers().subscribe(respone => {
            ;
        })
    }
}
