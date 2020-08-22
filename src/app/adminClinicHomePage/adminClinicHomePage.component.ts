import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { RequestExamination } from "../share/RequestExamination";
import { DatePipe } from '@angular/common';


@Component({
    selector: 'adminClinicHomePage-component',
    templateUrl: 'adminClinicHomePage.component.html',
    styleUrls: ['adminClinicHomePage.component.css']
})
export class AdminClinicHomePageComponent {

    public id:any;
    public error:boolean = true;
    public examination:any;
    public clinicId:string;
    public priceList: any;
    public specializations: any;
    public clinic:any;
    public examinationRequests: any;

    constructor(private data: DataService, private router: Router, public datepipe: DatePipe ) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.data.GetClinicByAdminId(this.id).subscribe( response => {
            this.clinic = response;
            localStorage.setItem('clinicId', this.clinic.clinicId)

            this.data.GetAllSpecializations().subscribe( response => {
                this.specializations = response;
            });

            this.data.GetExaminationRequests(this.clinic.clinicId).subscribe(response => {
                this.examinationRequests = response;
            });
        });


        
    }

    BookRoom(date: Date, examinationId: string){
        localStorage.setItem('examinationType',this.examinationRequests.examinationType);
        localStorage.setItem('examinationId',examinationId);
        //this.examinationDate=convertUTCDateToLocalDate(this.examinationDate);
        localStorage.setItem("examinationDate", this.datepipe.transform(date, 'yyyy-MM-ddTHH:ss:mm'));
        this.router.navigate(["/searchRooms"])
      }

      SearchRooms(){
        localStorage.setItem('clinicId', this.clinic.clinicId);
        localStorage.setItem('examinationType',"");
        localStorage.setItem('examinationId',"");
        this.router.navigate(["/searchRooms"]);
      }

      Deny(examinationId: string){
          //IMPLEMENT 
      }

    ShowDoctors(){
        localStorage.setItem('clinicId', this.clinic.clinicId);
        this.router.navigate(["/searchDoctors"]);
    }
   

    MyProfile(){
        localStorage.setItem('alienProfile', "false")
    }
}