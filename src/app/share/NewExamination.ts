import { User } from './User';

export class NewExamination{
    dateTime : Date;
    doctors : Array<User>;
    type: string;

    constructor(
        dateTime: Date,
        doctors : Array<User>,
        type : string
    ){
        this.dateTime = dateTime;
        this.doctors = doctors;
        this.type = type;
    }
}