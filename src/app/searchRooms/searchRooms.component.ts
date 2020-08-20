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
import { Mail } from '../share/Mail';

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
  public RoomsWhenBooking = true;
  examination: any;
  patient: any;
  doctor: any;
  patientEmail: any;
  doctorEmail: any;
  emails = new Array<string>();

    constructor(private data: DataService, private router: Router ) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.adminId = decodeToken.jti;
        var examinationId = localStorage.getItem('examinationId'); 

        if(examinationId == ""){//If showing all rooms
          this.RoomsWhenBooking=false;
          this.data.GetAllRoomsFromClinicByAdminId(this.adminId).subscribe(response => {
            this.rooms=response;

          });
        } else {
            this.data.GetExaminationById(localStorage.getItem('examinationId')).subscribe(response => {
              this.examination = response;
              this.data.GetUserById(this.examination.patientId).subscribe (response=> {
                this.patient=response;
                this.patientEmail=this.patient.email;
              })
              this.data.GetUserById(this.examination.doctorId).subscribe (response=> {
                this.doctor=response;
                this.doctorEmail=this.doctor.email;
              })
            })
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
          }//else end
        }//ngOnInit end
        
    
    BookRoom(room: Room){
      var examinationId = localStorage.getItem('examinationId'); 
      var bookroom = new RoomExamination(room.roomId, examinationId);
      this.data.AcceptExaminationRequest(bookroom).subscribe(response =>{
        if(response) {
          alert('Room ' + room.name + ' booked for examition on: ' + localStorage.getItem('examinationDate'));
          this.emails.push(this.patientEmail,this.doctorEmail);
          const mail = new Mail (
            "HOSPITAL ISA - EXAMINATION BOOKED",
            "",
            this.emails,
            //body:
            "New Examination request has been booked: \n"
            + "Examination will be held in Room: " + room.number + " " + room.name + "\n"
            + "Examination requested date and time:" + localStorage.getItem('examinationDate') + " \n"
            + "Examination type: "+ this.examination.type + "\n\n"
            + "Doctor: "+ this.doctor.firstName + " " + this.doctor.lastName + "email: " + this.doctor.email + "\n\n"
            + "Patient: "+ this.patient.firstName + " " + this.patient.lastName + "email: " + this.patient.email + "\n\n"  
            //end body
        )
        this.data.SendMail(mail).subscribe(response =>
            {
                if(!response){
                    alert('Mail not sent!')
                    return; 
                }
            });
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