import { DataService } from '../share/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { ok } from 'assert';
import { AgmCoreModule} from '@agm/core'
import { GoogleMapsScriptProtocol, AgmGeocoder } from '@agm/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

import {GeocodeLatLngToAddress} from '../GeocodeLatLngToAddress';


@Component({
    selector: 'showClinic-component',
    templateUrl: 'showClinic.component.html',
    styleUrls: ['showClinic.component.css']
})
export class ShowClinicComponent {
    clinicId: string;
    clinic: any;
    latitude: any;
    longitude: any;
    zoom = 15;
    constructor(private data: DataService, private router: Router) {}

    ngOnInit() {
        this.clinicId = localStorage.getItem('clinicId');
        this.data.GetClinicById(this.clinicId).subscribe ( response => {
            this.clinic = response[0];
            this.latitude = this.clinic.latitude;
            this.longitude = this.clinic.longitude;
        }) 

    }



}
