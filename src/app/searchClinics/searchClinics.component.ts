import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';
import { RequestExamination } from '../share/RequestExamination';
import { Price } from '../share/Price';
import { DatePipe } from '@angular/common';



@Component({
    selector: 'searchClinics-component',
    templateUrl: 'searchClinics.component.html',
    styleUrls: ['searchClinics.component.css']
})
export class SearchClinicsComponent implements OnInit {
    public parameter:any;
    public clinics:any;
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
  examinationDate: Date = new Date();
  selectedType: string = "";
  examinationPrice: any;
  priceList: Price;

    constructor(private data: DataService, private router: Router, public datepipe: DatePipe ) {}

    ngOnInit() {
        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
    }
    public  examinationRequest(form: NgForm){
        this.examinationDate = form.value.examinationDate;
        //this.examinationDate=convertUTCDateToLocalDate(this.examinationDate);
        this.selectedType = form.value.selectedType;
        const requestExamination = new RequestExamination('00000000-0000-0000-0000-000000000000',this.examinationDate, this.selectedType);
        this.data.GetClinicByTypeDateExamination(requestExamination).subscribe(response => { 
                this.clinics = response
        });
    }
    
  public getExaminationPriceBylinic(clinicId: string){
    this.data.GetPriceList(clinicId).subscribe ( response => {
     // this.priceList = response
      response.forEach(price => {
        if(price.examinationType==this.selectedType){
          this.examinationPrice=price;
        }
      })
    });
    
    this.examinationPrice=this.priceList["examinationType"];
  }

    sortAsc(colName:any){
        this.clinics.sort((a, b) => {
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
        this.clinics.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }

    ShowDoctors(clinicId:string){
      localStorage.setItem('clinicId', clinicId);
      localStorage.setItem('examinationType',this.selectedType);
      //this.examinationDate=convertUTCDateToLocalDate(this.examinationDate);
      localStorage.setItem("examinationDate", this.datepipe.transform(this.examinationDate, 'yyyy-MM-ddTHH:mm:ss'));
      this.router.navigate(["/searchDoctors"])
    }

}