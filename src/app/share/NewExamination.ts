import { User } from './User';

export class NewExamination{
    dateTime : Date;
    doctorId : string;
    patientId: string;
    type: string;

    constructor(
        dateTime: Date,
        doctorId : string,
        patientId: string,
        type : string
    ){
        this.dateTime = dateTime;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.type = type;
    }
}