import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../share/User';

import * as jwt_decode from "jwt-decode";
import { NewExamination } from '../share/NewExamination';
import { Mail } from '../share/Mail';
import { Review } from '../share/Review';

@Component({
    selector: 'examinationView-component',
    templateUrl: 'examinationView.component.html',
    styleUrls: ['examinationView.component.css']
})
export class ExaminationViewComponent implements OnInit {
    patientId: any;
    examinationId: string;
    examination:any;
    clinic: any;
    doctor: any;
    doctorReviewFormHidden = true;
    clinicReviewFormHidden = true;
    doctorReviewForm: FormGroup;
    clinicReviewForm: FormGroup;
    
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.doctorReviewForm = this.formBuilder.group({
            ratingDoctor: [''],
            commentDoctor: ['']
        });
        this.clinicReviewForm = this.formBuilder.group({
            ratingClinic: [''],
            commentClinic: ['']
        })
        
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.patientId = decodeToken.jti;
        this.examinationId = localStorage.getItem('examinationId');

        this.data.GetExaminationById(this.examinationId).subscribe ( response => {
            this.examination = response;
            this.data.GetClinicByAdminId(this.examination.doctorId).subscribe(response => {
                this.clinic=response;
            })
            this.data.GetUserById(this.examination.doctorId).subscribe(response => {
                this.doctor=response;
            });
        });
        
    }

    OpenDoctorReviewForm(){
        
        this.data.CheckIfAlreadyReviewed(this.patientId,this.examination.doctorId).subscribe ( response => {
            if(!response){
                if(this.examination.status==2){
                    this.doctorReviewFormHidden = false;
                    this.clinicReviewFormHidden = true;
                    this.ngOnInit();
                }else {
                    alert('You cannot leave a review for an unfinished examination!');
                }
            } else {
                alert("You have already left a review for this doctor! \n Rating: " + response.mark + " stars\n" + "Comment: " + response.comment)
            }
        })
            
    }

    CancelDoctorReview(){
        this.doctorReviewFormHidden=true;
    }
    SubmitDoctorReview(){
        var doctorReview = new Review (
            this.patientId, 
            this.doctorReviewForm.value.ratingDoctor,
            this.doctorReviewForm.value.commentDoctor, 
            this.examination.doctorId, 
        ) 
        this.data.AddReview(doctorReview).subscribe ( response => {
            if(response){
                alert("Thank you for your review!")
                this.router.navigate(["/searchExaminations"])
            }
        })

    }

    OpenClinicReviewForm(){
        this.data.CheckIfAlreadyReviewed(this.patientId,this.clinic.clinicId).subscribe ( response => {
           if(!response){
                if(this.examination.status==2){
                    this.clinicReviewFormHidden = false;
                    this.doctorReviewFormHidden = true;
                    this.ngOnInit();
                }else {
                    alert('You cannot leave a review for an unfinished examination!');
                }
           } else {
            alert("You have already left a review for this clinic! \n Rating: " + response.mark + "\nComment:" + response.comment)
            }
        })
          
    }

    CancelClinicReview(){
        this.clinicReviewFormHidden=true;
    }

    

    SubmitClinicReview(){
        var clinicReview = new Review (
            this.patientId, 
            this.clinicReviewForm.value.ratingClinic,
            this.clinicReviewForm.value.commentClinic, 
            this.clinic.clinicId 
            
        ) 
        this.data.AddReview(clinicReview).subscribe ( response => {
            if(response){
                alert("Thank you for your review!")
                this.router.navigate(["/searchExaminations"])
            }
        })
    }
}