import { User } from '../share/User';
import { Clinic } from './Clinic';


export class Examination
{
    examinationId: string;
    date:Date;
    roomId:string;
    doctorId: string;
    patientId:string;
    status:string;
    type:string;
    price:string;
    
    constructor(
        examinationId: string,
        date:Date,
        roomId:string,
        doctorId: string,
        patientId:string,
        status:string,
        type:string,
        price:string,
    ){
        this.examinationId = examinationId;
        this.date = date;
        this.roomId=roomId;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.status = status;
        this.type = type;
        this.price= price;
    }
}