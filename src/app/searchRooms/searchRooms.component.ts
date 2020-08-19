import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Room } from '../share/Room';
import { RoomDate } from '../share/RoomDate';
import { RoomExamination } from '../share/RoomExamination';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    selector: 'searchRooms-component',
    templateUrl: 'searchRooms.component.html',
    styleUrls: ['searchRooms.component.css']
})
export class SearchRoomsComponent implements OnInit {
    rooms: any;
    adminId: any;
    dates: any;
    datesByRoom: any;
    dateByRoom: any;

    constructor(private data: DataService, private router: Router ) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;
        
        this.data.GetAllRoomsFromClinicByAdminId(this.adminId).subscribe(response => {
            this.rooms=response;
            this.rooms.forEach(element => {
              const roomDate = new RoomDate (
                element.roomId,
                new Date(localStorage.getItem('examinationDate')),
              )
              this.data.FirstAvailableByDate(roomDate).subscribe ( response => {
                this.dateByRoom=response;
                if(new Date(this.dateByRoom).getTime() < new Date(localStorage.getItem('examinationDate')).getTime()){
                  this.dateByRoom=localStorage.getItem('examinationDate');
                }
              })
            })
              this.rooms.forEach(element => {
                const roomDate = new RoomDate (
                  element.roomId,
                  new Date(localStorage.getItem('examinationDate')),
                )
                this.data.GetOccupancyForRoomByDate(roomDate).subscribe ( response => {
                  this.datesByRoom=response;
                })
            })
          });
        }
    
    BookRoom(room: Room){
      var exId= localStorage.getItem('examinationId'); 
      var bookroom = new RoomExamination(room.roomId, exId);
      this.data.AcceptExaminationRequest(bookroom).subscribe(response =>{
        if(response) {
          alert('Room' + room.name + 'booked for examnation');
          this.router.navigate(["/searchRooms"]);
      } else {
          alert('error');
      }
      })
    }

    EditRoom(room: Room){
        // localStorage.setItem('roomId',room.roomId);
        // localStorage.setItem('roomNumber', room.number);
        // localStorage.setItem('roomName', room.name);
        // localStorage.setItem('clinicId',room.clinicId);
        // this.router.navigate(["/editRoom"])
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