import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";
import { RegisterUser } from '../share/RegisterUser';


@Component({
    selector: 'addDoctor-component',
    templateUrl: 'addDoctor.component.html',
    styleUrls: ['addDoctor.component.css']
})
export class AddDoctorComponent {
    
    public id:string;
    public clinicId:string;
    public clinic:any;
    public succseed: any;

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
        this.data.GetClinicByAdminId(this.id).subscribe( response => {
            this.clinic = response;
        });
    }
    constructor(private data: DataService, private router: Router) {}
    
    NewUser(form: NgForm){
        const user = new RegisterUser
        (
            form.value.firstName, 
            form.value.lastName, 
            form.value.email, 
            form.value.password, 
            false, 
            form.value.birthDate, 
            form.value.jmbg,
            "Doctor",
            form.value.specialization,
            this.clinic[0].clinicId
        )
        this.data.Register(user).subscribe(response =>
        {
            this.succseed = response;
        });
            this.router.navigate(['/adminClinicHomePage/'+ this.id]);
    }
}