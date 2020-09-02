import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterUser } from '../share/RegisterUser';
import { Mail } from "../share/Mail";
import { empty } from 'rxjs';
import { Clinic } from '../share/Clinic';
import { Vacation } from '../share/Vacation';
import { element } from 'protractor';
import { VacationRequestShow } from '../share/VacatioRequestShow';


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
    public clinic: Clinic;
    public vacations: any;
    public doctors: any;
    public doctor:any;
    public doctorsVacations: Array<VacationRequestShow> = new Array<VacationRequestShow>();
    public v:VacationRequestShow;
    public reasone:string;
    receivers: string[];

    constructor(private data: DataService, private router: Router) {}

    ngOnInit(){
       // this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.GetRegisterRequests().subscribe( response => {
            this.users = response.sort();
        });
        this.data.GetVacationRequests().subscribe( vacations => {
            vacations.forEach(x => {
                this.data.GetUserById(x.doctorId).subscribe(y => {
                    this.doctor= y; 
                    this.v = new VacationRequestShow(x,this.doctor);
                    this.doctorsVacations.push(this.v);
                })
                
            });
        });
    }


    Accept(email: any){
        this.receivers = new Array<string>();
        this.receivers.push(email);
        const mail = new Mail
        (
            "HOSPITAL ISA - registration ACCEPTED",
            "",
            this.receivers,
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
        this.receivers = new Array<string>();
        this.receivers.push(email);
        const mail = new Mail
        (
            "HOSPITAL ISA - registration DENIED",
            "",
            this.receivers,
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
