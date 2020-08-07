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
    public name:string;
    public number:string;
    public clinicId:string;
   
    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    addRoom(form:NgForm){
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        //ISCITATI ID KLINIKE 
        const room = new Room(form.value.name, form.value.number, decodeToken.clinicId);
        this.data.AddRoom(room);
    }
}