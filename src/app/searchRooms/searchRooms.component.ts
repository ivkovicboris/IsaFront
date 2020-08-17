import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Room } from '../share/Room';

@Component({
    selector: 'searchRooms-component',
    templateUrl: 'searchRooms.component.html',
    styleUrls: ['searchRooms.component.css']
})
export class SearchRoomsComponent implements OnInit {
    rooms: any;
    adminId: any;
    

    constructor(private data: DataService, private router: Router ) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;

        
        this.data.GetAllRoomsFromClinicByAdminId(this.adminId).subscribe(response => {
            this.rooms=response;
        })
    }

    EditRoom(room: Room){
        localStorage.setItem('roomId',room.roomId);
        localStorage.setItem('roomNumber', room.number);
        localStorage.setItem('roomName', room.name);
        localStorage.setItem('clinicId',room.clinicId);
        this.router.navigate(["/editRoom"])
    }

    DeleteRoom(room: Room){
        this.data.DeleteRoom(room).subscribe( response=> {
            if (response){
                alert("Room " + room.name + " has been deleted!");
                window.location.reload();
            } else {
                alert("You cannot delete the room that is already booked for examination! \n"
                        + "Move examination to different room and try again!")
                }
        });
    }
    sortAsc(colName:any){
        this.rooms.sort((a, b) => {
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
        this.rooms.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }
}