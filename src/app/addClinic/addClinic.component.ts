import { DataService } from '../share/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../share/Clinic';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { ok } from 'assert';
import { AgmCoreModule} from '@agm/core'
import { GoogleMapsScriptProtocol, AgmGeocoder } from '@agm/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { GeocodeService } from '../geocode.service';



@Component({
    selector: 'addClinic-component',
    templateUrl: 'addClinic.component.html',
    styleUrls: ['addClinic.component.css']
})
export class AddClinicComponent {
  
    public clinicID:string;
    public id:string;
    result: Object;
    clinicForm: any;
    submitted: boolean;
    public latitude: number; 
    public longitude: number;
    public zoom= 2;
    google: any;
    map: google.maps.Map;
    location: Location;
    loading: boolean;
    address: string;
    longitudeANDlatitude: any;
    lnglat: any;
    addressStr: string;
    
    ngOnInit() {
        this.clinicForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            about:[''],
            address: ['', [Validators.required]],
            city: ['', Validators.required],
            state: ['', Validators.required]
            
        });
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
    }
   
    constructor(
        private data: DataService, 
        private router: Router,
        private formBuilder: FormBuilder,
        private geocodeService: GeocodeService,
        private ref: ChangeDetectorRef
        ) {}

    get f() { return this.clinicForm.controls; }
    
    async onSubmit(){
        this.submitted = true;
        
        if (this.clinicForm.invalid) {
            return;
        }

        this.address = this.clinicForm.value.address + this.clinicForm.value.city + this.clinicForm.value.state;
        this.addressStr = this.clinicForm.value.address + ", " + this.clinicForm.value.city + ", "+ this.clinicForm.value.state;
        this.addressToCoordinates();
                
        const clinic = new Clinic
        (
            "00000000-0000-0000-0000-000000000000",
            this.clinicForm.value.name, 
            this.clinicForm.value.about,
            this.addressStr,
            this.location.lng,
            this.location.lat, 
            []
        )
        this.data.AddClinic(clinic).subscribe(response =>
            {
                if(response) {
                    alert('New Clinic named: ' + this.clinicForm.value.name + ' added successfully');
                } else {
                    alert('error');
                }
                this.router.navigate(['/adminKCHomePage/']);
            }); 
    }

    onReset() {
            this.submitted = false;
            this.router.navigate(['/adminKCHomePage/']);
    }
    
    showLocation() {
        this.addressToCoordinates();
        
      }

    addressToCoordinates() {
        this.address = this.clinicForm.value.address.replace(/\s/g, "+") + "+"  + this.clinicForm.value.city + "+" + this.clinicForm.value.state;
        this.loading = true;
        this.geocodeService.geocodeAddress(this.address)
        .subscribe((location: Location) => {
            this.location = location;
            this.loading = false;
            this.ref.detectChanges();  
            this.zoom = 15;
            
          }      
        );     
      }
}