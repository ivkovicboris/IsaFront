import { Vacation } from './Vacation';
import { User } from './User';

export class VacationRequestShow
{
    vacations:Vacation;
    doctors:User;
     
    constructor
    (
        vacations:Vacation,
        doctors:User
      
    ){
        this.vacations = vacations;
        this.doctors = doctors;
       
    }
}