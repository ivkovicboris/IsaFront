import { User } from './User';

export class NewExamination{
    dateTime : Date;
    doctor : User;
    patientId: string;
    type: string;

    constructor(
        dateTime: Date,
        doctor : User,
        patientId: string,
        type : string
    ){
        this.dateTime = dateTime;
        this.doctor = doctor;
        this.patientId = patientId;
        this.type = type;
    }
}