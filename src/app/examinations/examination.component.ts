import { Component, OnInit } from '@angular/core';
import { DataService } from '../share/DataService';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDatepicker} from "@angular/material/datepicker";
import {MatSelectModule} from '@angular/material/select';
import { Examination } from '../share/Examination';
import { NgForm } from '@angular/forms';
import {RequestExamination} from '../share/RequestExamination';
import { User } from '../share/User';
import { NewExamination } from '../share/NewExamination';

@Component({
    selector: 'examination-component',
    templateUrl: 'examination.component.html',
    styleUrls: ['examination.component.css']
})

export class ExaminationComponent 
{
    public items: Examination[];
    public examinationDate: Date;
    public selectedType: string;

    public types: string[] = [
        "Psychiatrist", 
                "Cardiologist",
                "Dermatologist",
                "Endocrinologist",
                "Gastroenterologist",
                "Ophthalmologist",
                "Otolaryngologist",
                "Pulmonologist",
                "Neurologist",
                "Oncologist",
                "Anesthesiologist"
      ];
    constructor(private dataService: DataService) {}

   

    public  examinationRequest(form: NgForm){
        const requestExamination = new RequestExamination(this.selectedType, form.value.examinationDate, null);
        this.dataService.GetClinicByTypeDateExamination(requestExamination).subscribe(response => { 
  //              this.items = response
        });
    }

    public NewExamination(date: Date, doctor: User){
        let doctors: User[] = [];
        doctors.push(doctor);
  //      const examination = new NewExamination(date, doctors, this.selectedType);
   //     this.dataService.AddNewExamination(examination);
    }
}