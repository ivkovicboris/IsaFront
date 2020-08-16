import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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
    roomForm: any;
    submitted: boolean;
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}

   
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        
        this.data.GetClinicByAdminId(this.id).subscribe( response => {
            this.clinic = response;
        });

        this.roomForm = this.formBuilder.group({
            number: ['', [Validators.required,
                            Validators.min(0)]],
            name: ['', [Validators.required]]
        });
    }

    get f() { return this.roomForm.controls; }

    onSubmit(){
        this.submitted = true;

        if (this.roomForm.invalid) {
            return;
        }
        const room = new Room
        (
            this.roomForm.value.name, 
            this.roomForm.value.number, 
            this.clinic.clinicId
        )
        this.data.AddRoom(room).subscribe(response =>
        {
            if(response){
                alert("New room \n" + this.roomForm.value.name + "successfully added!");
                this.router.navigate(['/adminClinicHomePage/']);
            }
        });      
    }

    onCancel() {
        this.submitted = false;
        this.router.navigate(["/adminClinicHomePage"]);
    }
    
    
}