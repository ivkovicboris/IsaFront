import { User } from './User';

export class DoctorsFreeExaminations
{
    doctor: User;
    freeExaminations: Array<Date>;

    constructor(
        doctor: User,
        freeExaminations: Array<Date>
    ){
        this.doctor = doctor;
        this.freeExaminations = freeExaminations;
    }
}