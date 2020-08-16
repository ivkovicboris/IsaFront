import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Price } from '../share/Price';


@Component({
    selector: 'priceEdit-component',
    templateUrl: 'priceEdit.component.html',
    styleUrls: ['priceEdit.component.css']
})
export class PriceEditComponent {
    adminId: any;
    examinationType: string;
    editPriceForm: any;
    public clinicId:string;
    clinic: any;
    discount: any;
    public submitted = false;
    discountedPrice: number;
    priceId: string;
    priceValue: any;
    

    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;

        this.data.GetClinicByAdminId(this.adminId).subscribe( response => {
            this.clinic = response;
          });

        this.priceId = localStorage.getItem('priceId');
        this.examinationType = localStorage.getItem('examinationType');
        this.priceValue = localStorage.getItem('priceValue');
        this.discount = localStorage.getItem('discount');
        this.discountedPrice = this.calculateDiscount(this.priceValue,this.discount)

        this.editPriceForm = this.formBuilder.group({
            priceValue: ['', [Validators.required,
                            Validators.min(0)]],
            discount: ['', [Validators.required,
                            Validators.min(0),
                            Validators.max(100)]
                        ],
            discountedPrice: [''],
        });
    }
    get f() { return this.editPriceForm.controls; }

    calculateDiscount(price:number,discount:number) {
        return Math.floor(price - ((price/ 100*discount)))
      }
    onSubmit(){
        this.submitted = true;

        if (this.editPriceForm.invalid) {
            return;
        }
        
        const price = new Price
        (
            this.priceId,
            this.examinationType,
            this.editPriceForm.value.priceValue, 
            this.editPriceForm.value.discount,
            this.editPriceForm.value.discountedPrice,
            this.clinic.clinicId,
            
        )   

        this.data.UpdatePrice(price).subscribe (response =>{
            if(response){
                this.router.navigate(["/priceList"])
            }
        });

        
    }
    onCancel() {
        this.submitted = false;
        this.router.navigate(["/priceList"]);
    }
    calculate(){
       this.discountedPrice= this.calculateDiscount(this.editPriceForm.value.priceValue,this.editPriceForm.value.discount)
    }
}