import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';
import * as jwt_decode from "jwt-decode";
import { Examination } from '../share/Examination';
import { RequestExamination } from '../share/RequestExamination';
import { AddClinicAdminComponent } from '../addClinicAdmin/addClinicAdmin.component';
import { Clinic } from '../share/Clinic';
import { NewExamination } from '../share/NewExamination';

@Component({
    selector: 'searchExaminations-component',
    templateUrl: 'searchExaminations.component.html',
    styleUrls: ['searchExaminations.component.css']
})
export class SearchExaminationsComponent implements OnInit {
    userId: any;
    examinations: any;

    constructor(private data: DataService,  private router: Router) {}
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;

        this.data.GetAllExaminationsByUserId(this.userId).subscribe ( response=> {
            this.examinations = response;
        })

    }

    LeaveReview(examinationId:string){
        localStorage.setItem('examinationId', examinationId);
        this.router.navigate(["/examinationView"]);
    }

    sortAsc(colName:any){
        this.examinations.sort((a, b) => {
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
        this.examinations.sort((a, b) => {
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