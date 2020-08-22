import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';
import { Mail } from '../share/Mail';

@Component({
    selector: 'businessStatistics-component',
    templateUrl: 'businessStatistics.component.html',
    styleUrls: ['businessStatistics.component.css']
})
export class BusinessStatisticsComponent implements OnInit {

    adminId: any;
    clinic: any;
    examinations: any;
    doctors: any;
    Date
;
    
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
        

        //ZA FLITRIRANJE PO DAN MESEC GODINA
    // var startDate = new Date("2015-08-04");
    //     var endDate = new Date("2015-08-12");

    //     var resultProductData = product_data.filter(function (a) {
    //         var hitDates = a.ProductHits || {};
    //         // extract all date strings
    //         hitDates = Object.keys(hitDates);
    //         // improvement: use some. this is an improment because .map()
    //         // and .filter() are walking through all elements.
    //         // .some() stops this process if one item is found that returns true in the callback function and returns true for the whole expression
    //         hitDateMatchExists = hitDates.some(function(dateStr) {
    //             var date = new Date(dateStr);
    //             return date >= startDate && date <= endDate
    //         });
    //         return hitDateMatchExists;
    //     });
    //     console.log(resultProductData);
}