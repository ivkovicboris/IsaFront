import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../share/RegisterUser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, Route } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Room } from '../share/Room';
import { RoomDate } from '../share/RoomDate';
import { User } from '../share/User';
import { RequestExamination } from '../share/RequestExamination';
import { DoctorsFreeExaminations } from '../share/DoctorsFreeExaminations';
import { NewExamination } from '../share/NewExamination';
import { convertUTCDateToLocalDate } from '../dateConvertUTC';

@Component({
    selector: 'searchDoctors-component',
    templateUrl: 'searchDoctors.component.html',
    styleUrls: ['searchDoctors.component.css']
})
export class SearchDoctorsComponent implements OnInit {
    doctors: Array<DoctorsFreeExaminations>;
    userRole: any;
    public adminClinicVisible = false;
  examinationType: string;
  examinationDate:any;
  public types: string[] = [
    "Psychiatrist", 
            "Cardiologist",
            "Dermatologist",
            "Endocrinologist",
            "Gastroenterologist",
            "Ophthalmologist",
            "Otolaryngologist",
            "Pulmonologist",
            "Neurologist",
            "Oncologist",
            "Anesthesiologist"
  ];

  selectedType: string;
  clinics: any;
  DoctorsFreeExaminations: any[];
  clinicId: string;
  dateControl = new FormControl(new Date());
  adminId: any;
  clinicOfAdmin: any;
  freeExaminations: any;
  drs: any;
  doctor: any;
  doctorToAdd: DoctorsFreeExaminations;
  userId: any;
  doctorId: string;

    constructor(private data: DataService, private router: Router ) {}

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userRole = decodeToken.Role;
        this.userId = decodeToken.jti;
        if (this.userRole=="ClinicAdmin"){
          this.clinicId=localStorage.getItem('clinicId');
          this.adminClinicVisible=true;
          this.data.GetAllDoctorsFromClinic(this.clinicId).subscribe(response => {
            this.drs=response["result"];
            this.drs.forEach(x => {
              this.doctorToAdd = new DoctorsFreeExaminations(
                this.doctor = x,
                this.freeExaminations = [], 
              )
              this.doctors.push(this.doctorToAdd);
            })
            
          })
        } else { //PATIENT
            this.selectedType = localStorage.getItem('examinationType');
            this.examinationDate = new Date(localStorage.getItem('examinationDate'));
           //this.examinationDate=convertUTCDateToLocalDate(this.examinationDate);
            this.clinicId=localStorage.getItem('clinicId');
            this.dateControl = new FormControl(this.examinationDate);
                const requestExamination = new RequestExamination(this.clinicId, this.examinationDate, this.selectedType);
                this.data.GetFreeExaminationAndDoctorByClinic(requestExamination).subscribe(response => { 
                        this.doctors = response;   
                });
            
            }   
        }       
    

    public BookExamination(doctor: User, date:Date){
        this.doctorId = doctor.employeeId;
        //this.examinationDate = convertUTCDateToLocalDate(date);
        const examination = new NewExamination(date, this.doctorId, this.userId, this.selectedType);
        this.data.AddExamination(examination).subscribe( response =>{
            if(response) {
                alert('Your examination request has been recieved. Please check your email');
                this.router.navigate(['/searchClinics']);
            } else {
                alert('error');
            }
            
        });  
    }

    public  examinationRequestForClinic(type: string,date:Date,){
      //this.examinationDate = convertUTCDateToLocalDate(date);
        const requestExamination = new RequestExamination(this.clinicId, this.examinationDate, this.selectedType);
        this.data.GetFreeExaminationAndDoctorByClinic(requestExamination).subscribe(response => { 
                this.DoctorsFreeExaminations = response
        });
      
    }

    // DeleteEmployee(room: Room){
    //     this.data.DeleteRoom(room).subscribe( response=> {
    //         if (response){
    //             alert("Room " + room.name + " has been deleted!");
    //             window.location.reload();
    //         } else {
    //             alert("You cannot delete the room that is already booked for examination! \n"
    //                     + "Move examination to different room and try again!")
    //             }
    //     });
    // }
    sortAsc(colName:any){
        this.doctors.sort((a, b) => {
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
        this.doctors.sort((a, b) => {
            if(a[colName] > b[colName]) {
              return -1;
            } else if(a[colName] < b[colName]) {
              return 1;
            } else {
              return 0;
            }
          });
    }

    RemoveDoctor(doctor: User){
        this.data.DeleteEmployee(doctor.employeeId).subscribe (response => {
          if(response){
            alert("Doctor successfully removed from clinic!")
          } else {
            alert("This doctor has an examination booked in near future. \n Appoint another doctor for his examination and try again!")
          }
        })
    }
   
}