import { Component, OnInit } from '@angular/core';
import { DataService } from '../share/DataService';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as jwt_decode from "jwt-decode";
import { Examination } from '../share/Examination';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'addPredefinitionExamination-component',
    templateUrl: 'addPredefinitionExamination.component.html',
    styleUrls: ['addPredefinitionExamination.component.css']
})
export class AddPredefinitionExaminationComponent implements OnInit {

    userRole: any;
    userId:any;
    clinicId:any;
    doctors:any;
    rooms:any;
    public stepMinute = 30;
    startMinute=0;
    massage:any;
    time: Date;

    constructor(private data: DataService, private router: Router,public datepipe: DatePipe ) {}

    ngOnInit(){
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userRole = localStorage.geti('Role');
        this.userId = decodeToken.jti;
          this.clinicId=localStorage.getItem('clinicId');
          this.data.GetAllDoctorsFromClinic(this.clinicId).subscribe(x => {
            this.doctors=x;
            this.data.GetAllRoomsFromClinicByAdminId( this.userId).subscribe(y => {
                this.rooms=y;
              });
        });
    }

    onSubmit(room:any, doctor:any, form: NgForm){
        this.time = form.value.examinationDate;
        if(this.time.getMinutes() > 30){
            this.time.setMinutes(30)
            this.time.setSeconds(0);
            this.time.setMilliseconds(0);
        } else{
            this.time.setMinutes(0);
            this.time.setSeconds(0);
            this.time.setMilliseconds(0);
        }
        var disprice = Math.floor(form.value.price - ((form.value.price/ 100*form.value.discount)))
        const ex = new Examination('00000000-0000-0000-0000-000000000000',this.time,room.roomId,doctor.employeeId,'00000000-0000-0000-0000-000000000000', doctor.specialization, disprice);
        this.data.AddPreDefinitionExamination(ex).subscribe(response => {
            this.massage=response;
                alert(this.massage);
                window.location.reload();
        });
    }

    
}
