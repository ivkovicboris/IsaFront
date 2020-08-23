import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import {MatDatepicker} from '@angular/material/datepicker';
import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';
import { Mail } from '../share/Mail';
import { Examination } from '../share/Examination';

interface Month {
  number: number;
  name: string;
}
@Component({
    selector: 'businessStatistics-component',
    templateUrl: 'businessStatistics.component.html',
    styleUrls: ['businessStatistics.component.css']
})
export class BusinessStatisticsComponent implements OnInit{

    adminId: any;
    clinic: any;
    examinations: any;
    doctors: any;
    totalIncome = 0;
    filterDate: Date =  new Date();
    compareDate: Date = new Date();
    month: Date = new Date();
    newExaminations = new Array<any>()
    
    public years: number[] =  [undefined, 2010, 2011, 2012, 2013, 2014, 2015,2016, 2017, 2018, 2019, 2020]
    public months: Month[] = [
      { number: undefined, name: undefined },
      { number: 0, name: 'January'},
      { number: 1, name: 'February'},
      { number: 2, name: 'March'},
      { number: 3, name: 'April'},
      { number: 4, name: 'May'},
      { number: 5, name: 'June'},
      { number: 6, name: 'July'},
      { number: 7, name: 'August'},
      { number: 8, name: 'September'},
      { number: 9, name: 'October'},
      { number: 10, name: 'November'},
      { number: 11, name: 'December'},
    ]
  

    
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;

        this.data.GetClinicByAdminId(this.adminId).subscribe (response => {
            this.clinic = response;
            this.data.GetAllFinishedExaminationsByClinic(this.clinic.clinicId).subscribe(response => {
                this.examinations = response;
            });
            this.data.GetAllDoctorsFromClinic(this.clinic.clinicId).subscribe (response => {
                this.doctors = response;
            });
        })
    }   

    ShowExaminationInfo(examinationId:string){
        localStorage.setItem('examinationId', examinationId);
        this.router.navigate(["/examinationView"])
    }

    FilterDatePeriod(selectedYear:number,selectedMonth:number ){
      this.data.GetAllFinishedExaminationsByClinic(this.clinic.clinicId).subscribe(response => {
        this.examinations = response;
        if(selectedMonth==undefined && selectedYear==undefined) {
          this.ngOnInit();
        } 
        this.newExaminations = []
        this.examinations.forEach(examination => {
          this.compareDate = new Date(examination.dateTime);
          if(selectedMonth==undefined){
               this.filterDate.setMonth(this.compareDate.getMonth());
               this.filterDate.setFullYear(selectedYear);
           } else if(selectedYear==undefined){
               this.filterDate.setFullYear(this.filterDate.getFullYear());
               this.filterDate.setMonth(selectedMonth)
           } else {
                   this.filterDate.setMonth(selectedMonth)
                   this.filterDate.setFullYear(selectedYear)
             }
          this.filterDate.setDate(1);
          this.filterDate.setHours(0,0,0,0);
          this.compareDate.setDate(1);
          this.compareDate.setHours(0,0,0,0);
          
          if(this.filterDate.toString() == this.compareDate.toString() ){
            this.newExaminations.push(examination);
            this.totalIncome += examination.price;
          }
        });
  
        this.examinations = this.newExaminations;
    });
      
     // return this.examinations;
    }

    
}