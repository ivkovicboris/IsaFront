import { User } from '../share/User';
import { Clinic } from './Clinic';

export class Examination
{
    user: User;
    clinic: Clinic;
    freeExaminations: Array<Date>;

    constructor(
        user: User,
        clinic: Clinic,
        freeExaminations: Array<Date>
    ){
        this.user = user;
        this.clinic = clinic;
        this.freeExaminations = freeExaminations;
    }
}