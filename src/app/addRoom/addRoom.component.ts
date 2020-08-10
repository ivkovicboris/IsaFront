import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";


@Component({
    selector: 'addRoom-component',
    templateUrl: 'addRoom.component.html',
    styleUrls: ['addRoom.component.css']
})
export class AddRoomComponent {

    public clinicId:string;
    public clinic:any;
    public id:string;
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

    AddRoom(form:NgForm){
        const room = new Room
        (
            form.value.name, 
            form.value.number, 
            this.clinic.clinicId
        )
        this.data.AddRoom(room).subscribe(response =>
        {
            this.succseed = response;
        });
            this.router.navigate(['/adminClinicHomePage/'+ this.id]);
    }
    
}