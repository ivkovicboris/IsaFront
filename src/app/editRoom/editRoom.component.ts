import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../share/Room';
import * as jwt_decode from "jwt-decode";


@Component({
    selector: 'editRoom-component',
    templateUrl: 'editRoom.component.html',
    styleUrls: ['editRoom.component.css']
})
export class EditRoomComponent {

    public clinicId:string;
    public clinic:any;
    public id:string;
    public succseed: any;
    roomForm: any;
    submitted: boolean;
    specializations: any;
    selectedName: string;
    roomId: string;
    name: string;
    number: string;
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}

   
    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        this.data.GetAllSpecializations().subscribe( response => {
            this.specializations = response;
        })
    

        
        this.name = localStorage.getItem('roomName');
        this.number = localStorage.getItem('roomNumber');
        this.clinicId = localStorage.getItem('clinicId');

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
            localStorage.getItem("roomId"),
            this.selectedName, 
            this.roomForm.value.number, 
            this.clinicId
        )
        this.data.UpdateRoom(room).subscribe(response =>
        {
            if(response){
                alert("New room for " + this.selectedName + "  successfully updated!");
                this.router.navigate(['/searchRooms/']);
            }else {
                alert("You cannot change the room that is already booked for examination! \n"
                        + "Move examination to different room and try again!");
            }
        });      
    }

    onCancel() {
        this.submitted = false;
        this.router.navigate(["/searchRooms/"]);
    }
    
    
}