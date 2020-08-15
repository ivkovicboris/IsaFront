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
import { Mail } from './Mail';
import { Clinic } from './Clinic';
import { PriceList } from './PriceList';
import { ChangePassword } from './ChangePassword';


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

    public Register(user: RegisterUser): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Account/Register', user);
    }

    public Login(creds: LoginUser): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Account/Login', creds);
    }

    public GetRegisterRequests(): Observable<User[]> {
        return this.http.get<User[]>(environment.webApiBaseUrl + 'Account/GetRegisterRequests', {
            responseType: 'json'
        });
    }
    public GetAllClinics(): Observable<Clinic[]> {
        return this.http.get<Clinic[]>(environment.webApiBaseUrl + 'Clinic/GetAllClinics', {
            responseType: 'json'
        });
    }

    
    public AcceptPatientRegisterRequest(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'Account/AcceptPatientRegisterRequest', mail);
    }

    public DenyPatientRegisterRequest(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'Account/DenyPatientRegisterRequest', mail);
    }

    public GetUsers(): Observable<User[]>{
        return this.http.get<User[]>(environment.webApiBaseUrl + 'User/GetUsers', {
            responseType: 'json'
        });
    }

    public AddClinic(clinic: Clinic) {
        return this.http.post(environment.webApiBaseUrl + 'Clinic/AddClinic', clinic);
    }

    public GetUserById(id: string): Observable<User[]>{
        return this.http.get<User[]>(environment.webApiBaseUrl + 'User/GetUserById/'+id,  {
            responseType: 'json'
        });
    }
    public GetClinicByAdminId(adminId: string): Observable<Clinic[]>{
        return this.http.get<Clinic[]>(environment.webApiBaseUrl + 'Clinic/GetClinicByAdminId/'+adminId, {
            responseType: 'json'
        });
    }

    public UpdatePatient(user: RegisterUser) {
        return this.http.post(environment.webApiBaseUrl + 'User/UpdatePatient', user);
    }

    public UpdateEmployee(user: RegisterUser){
        return this.http.post(environment.webApiBaseUrl + 'User/UpdateEmployee', user);
    }

    public AddRoom(room:Room){
        return this.http.post(environment.webApiBaseUrl + 'Clinic/AddRoomTClinic',room);
    }

    public GetAllSpecializations(): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'User/GetAllSpecializations', {
            
        });
    }

    public GetPriceList(adminId:string): Observable<PriceList[]>{
        return this.http.get<PriceList[]>(environment.webApiBaseUrl + 'Clinic/GetPriceList/'+adminId, {
            responseType: 'json'
        });
    }

    public ChangePassword(changePassword: ChangePassword) {
        return this.http.post(environment.webApiBaseUrl + 'Account/ChangePassword/', changePassword);
    }
    public CheckIfSignedBefore(userId: string) : Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'Account/CheckIfSignedBefore/' + userId);
    }
    
    public SendMail(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'Account/SendMail', mail);
    }

    //****************STARE METODE***********************
    public SendVacationRequest(vacationRequest: Vacation){
        return this.http.post(environment.webApiBaseUrl + 'User/SendVacationRequest/',vacationRequest).subscribe();
    }

   
    

    public GetExaminationRequests(clinicId:string): Observable<User[]> {
        return this.http.get<User[]>(environment.webApiBaseUrl + 'Account/GetRegisterRequests'+clinicId, {
            responseType: 'json'
        });
    }

    public AddNewExamination(examination: NewExamination){
        this.http.post(environment.webApiBaseUrl + 'Examination/AddExamination', examination).subscribe();
    }

    public RequestExaminations(request: RequestExamination): Observable<Examination[]> {
        let result: any;
        return this.http.post(environment.webApiBaseUrl + 'Examination/GetExamination/', request) as Observable<Examination[]>;
}
    
}
