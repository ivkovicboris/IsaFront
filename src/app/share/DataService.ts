import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//import { User } from './User';
import { RegisterUser } from './RegisterUser';
import {LoginUser} from './LoginUser';
import { User } from './User';
import { Vacation } from './Vacation';
import { Examination } from './Examination';
import { Room } from './Room';
import {RequestExamination} from './RequestExamination';
import { NewExamination } from './NewExamination';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};


@Injectable()
export class DataService {

    public accepted:boolean;
    public vacationRequest:Vacation;
    
    constructor(private http: HttpClient) {
    }

    public register(user: RegisterUser): Observable<any> {
        return this.http.post(
         environment.webApiBaseUrl + 'Account/Register', user);
    }

    public login(creds: LoginUser): Observable<any> {
        return this.http.post(
          environment.webApiBaseUrl + 'Account/Login', creds);
    }

    public GetRequests(): Observable<User[]> {
        return this.http.get<User[]>(environment.webApiBaseUrl + 'Account/GetRegisterRequests', {
            responseType: 'json'
        });
    }

    public SendMail(user: RegisterUser){
        //const params = new HttpParams()        
        return this.http.post(environment.webApiBaseUrl + 'Account/SendMailAccept', user);
    }

    public GetUserById(id: string): Observable<User[]>{
        return this.http.get<User[]>(environment.webApiBaseUrl + 'User/GetUser/'+id,  {
            responseType: 'json'
        });
    }

    public GetUsers(): Observable<User[]>{
        return this.http.get<User[]>(environment.webApiBaseUrl + 'User/GetUsers', {
            responseType: 'json'
        });
    }

    public SendVacationRequest(vacationRequest: Vacation){
        return this.http.post(environment.webApiBaseUrl + 'User/SendVacationRequest/',vacationRequest).subscribe();
    }

    public RequestExaminations(request: RequestExamination): Observable<Examination[]> {
        let result: any;
        return this.http.post(environment.webApiBaseUrl + 'Examination/GetExamination/', request) as Observable<Examination[]>;
    }

    public AddRoom(room:Room){
        return this.http.post(environment.webApiBaseUrl + 'Clinic/AddRoom',room).subscribe();
    }

    public AddDoctor(doctor:RegisterUser){
        return this.http.post(environment.webApiBaseUrl + 'Account/RegisterDoctor',doctor).subscribe();
    }

    public UpdateProfile(user: User) {
        return this.http.post(environment.webApiBaseUrl + 'User/UpdateProfile', user);
    }

    public AddClinicAdmin(clinicAdmin:RegisterUser){
        return this.http.post(environment.webApiBaseUrl + 'Account/RegisterClinicAdmin',clinicAdmin).subscribe();
    }

    public GetExaminationRequests(clinicId:string): Observable<User[]> {
        return this.http.get<User[]>(environment.webApiBaseUrl + 'Account/GetRegisterRequests'+clinicId, {
            responseType: 'json'
        });
    }

    public AddNewExamination(examination: NewExamination){
        this.http.post(environment.webApiBaseUrl + 'Examination/AddExamination', examination).subscribe();
    }
}
