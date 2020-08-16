import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { RequestExamination } from "../share/RequestExamination";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Clinic } from '../share/Clinic';
import { Price } from '../share/Price';


@Component({
    selector: 'priceList-component',
    templateUrl: 'priceList.component.html',
    styleUrls: ['priceList.component.css']
})


export class PriceListComponent implements OnInit {
   
    public id:any;
    public error:boolean = true;
    public examination:any;
    public clinicId:string;
    public clinic:any;
    public priceList: any;
    public specializations: any;
    
    public spec:any;
    public submitted: boolean;
    clinicIdNew: any;
    newClinic:any;

    constructor(private data: DataService, private router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;

        this.data.GetClinicByAdminId(this.id).subscribe( response => {
          this.clinic = response;
        });
        this.data.GetAllSpecializations().subscribe( response => {
            this.specializations = response;
        });
        this.data.GetPriceList(this.id).subscribe ( response =>{
            this.priceList = response;
        });

        
        var s = this.specializations;

    }
    calculateDiscount(price:number,discount:number) {
      return Math.floor(price - ((price/ 100*discount)))
    }

    EditPrice(priceToEdit: Price){
      localStorage.setItem('priceId',priceToEdit.priceId)
      localStorage.setItem('examinationType', priceToEdit.examinationType);
      localStorage.setItem('priceValue', priceToEdit.priceValue);
      localStorage.setItem('discount', priceToEdit.discount);
      localStorage.setItem('discountPrice', priceToEdit.discountedPrice);
      this.router.navigate(["/priceEdit"])
    }
    onReset() {
        this.submitted = false;
        this.router.navigate(['/adminClinicHomePage/']);
    }
    sortAsc(colName:any){
        this.priceList.sort((a, b) => {
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
        this.priceList.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }
    addPrice(){

    }
}
