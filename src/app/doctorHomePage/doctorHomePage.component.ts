import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Vacation } from '../share/Vacation';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDatepicker} from '@angular/material/datepicker';


@Component({
    selector: 'doctorHomePage-component',
    templateUrl: 'doctorHomePage.component.html',
    styleUrls: ['doctorHomePage.component.css']
})
export class DoctorHomePageComponent implements OnInit {

    public picker: any;
    public minDate: any;
    public id: any;
    public error: boolean = true;
    public user: any;
    public startDate: Date;
    public endDate: Date;
    
    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit() {

        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
        this.data.GetUserById(this.id).subscribe( response => {
            this.user = response;
        });
    }

    VacationRequest(startDate:Date, endDate:Date ) {
        //if(this.endDate>this.startDate || this.endDate.getDay-this.startDate.getDay<15){
            const token = localStorage.getItem('token');
            const decodeToken = jwt_decode(token);
            const vacationRequest = new Vacation(this.id, startDate, endDate);
            this.data.VacationRequest(vacationRequest).subscribe(response => {
                if(response){
                    alert("Request for vacation sent to admin")
                  } else {
                    alert("You have examination on picked time")
                    window.location.reload();
                  }
            })
        //}
    }

    UpdateDoctor(user) {
        this.data.UpdateEmployee(this.user).subscribe(response => {
            location.reload();
        });
    }

}