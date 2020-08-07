import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterUser } from '../share/RegisterUser';


@Component({
    selector: 'adminKCHomePage-component',
    templateUrl: 'adminKCHomePage.component.html',
    styleUrls: ['adminKCHomePage.component.css']
})

export class AdminKCHomePageComponent {

    public id:any;
    public error:boolean = true;
    public registerUser:any;
    public users:any;
    public accepted:boolean;

    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit(){
       // this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.GetRequests().subscribe( response => {
            this.users = response;
        });
    }

    Accept(email: any){
       // this.accepted = true;
        const userToRegister = new RegisterUser
        (
            this.users.firstName,
            this.users.lastName,
            email,
            this.users.password,
            true,
            this.users.birthDate,
            this.users.jmbg,
            "Pacijent"
        );
        this.data.SendMail(userToRegister).subscribe( response => {
            this.ngOnInit();
        });   
    }

    Deny(email: any){
        //this.accepted = false;
        const userToRegister = new RegisterUser
        (
            this.users.firstName,
            this.users.lastName,
            email,
            this.users.password,
            false,
            this.users.birthDate,
            this.users.jmbg,
            "Pacijent"
            );
        this.data.SendMail(userToRegister).subscribe( response => {
            this.ngOnInit();
        });
    }
    GetUsers(){
        this.data.GetUsers().subscribe(respone => {
            ;
        })
    }
}
