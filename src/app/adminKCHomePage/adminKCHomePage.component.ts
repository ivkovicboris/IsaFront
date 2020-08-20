import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterUser } from '../share/RegisterUser';
import { Mail } from "../share/Mail";
import { empty } from 'rxjs';
import { Clinic } from '../share/Clinic';


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
    public clinics:any;
    public clinic: Clinic

    constructor(private data: DataService, private router: Router) {}

    ngOnInit(){
       // this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.GetRegisterRequests().subscribe( response => {
            this.users = response.sort();
        });
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
                alert('Patient request has been ACCEPTED. Mail notification has been sent to: ' + mail.receivers);
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
                alert('Patient request has been DENIED. Mail notification has been sent to: ' + mail.receivers);
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
    sortAsc(colName:any){
        this.users.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return 1;
            } else if(a[colName] < b[colName]) {
              return -1;
            } else {
              return 0;
            }
          });
    }
    sortDesc(colName){
        this.users.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }

}
