import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';


@Component({
    selector: 'searchClinics-component',
    templateUrl: 'searchClinics.component.html',
    styleUrls: ['searchClinics.component.css']
})
export class SearchClinicsComponent implements OnInit {

    public clinics:any;

    constructor(private data: DataService, private router: Router ) {}

    ngOnInit() {
        this.data.GetAllClinics().subscribe( response => {
            this.clinics = response;
        });
    }

}