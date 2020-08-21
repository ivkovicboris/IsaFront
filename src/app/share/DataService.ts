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
import { Price } from './Price';
import { ChangePassword } from './ChangePassword';
import { RoomDate } from './RoomDate';
import { RoomExamination } from './RoomExamination';
import { Review } from './Review';


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
    public GetAdminsFromClinic(clinicId: string): Observable<User[]> {
        return this.http.get<User[]>(environment.webApiBaseUrl + 'Clinic/GetAdminsFromClinic/' + clinicId,  {
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
    public DeleteEmployee(employee: User) {
        return this.http.post(environment.webApiBaseUrl + 'User/DeleteEmployee', employee);
    }

    public GetUserById(id: string): Observable<User[]>{
        return this.http.get<User[]>(environment.webApiBaseUrl + 'User/GetUserById/'+id,  {
            responseType: 'json'
        });
    }
    public GetClinicByAdminId(adminId: string): Observable<Clinic[]>{
        return this.http.get<Clinic[]>(environment.webApiBaseUrl + 'Clinic/GetClinicByAdminId/'+adminId, {
            
        });
    }

    public UpdatePatient(user: RegisterUser) {
        return this.http.post(environment.webApiBaseUrl + 'User/UpdatePatient', user);
    }

    public UpdateEmployee(user: RegisterUser){
        return this.http.post(environment.webApiBaseUrl + 'User/UpdateEmployee', user);
    }

    public AddRoom(room:Room){
        return this.http.post(environment.webApiBaseUrl + 'Clinic/AddRoomToClinic',room);
    }

    public GetAllSpecializations(): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'User/GetAllSpecializations', {
            
        });
    }
    public UpdatePrice(price :Price) {
        return this.http.post(environment.webApiBaseUrl + 'Clinic/UpdatePrice', price);
    }

    public GetPriceList(adminId:string): Observable<Price[]>{
        return this.http.get<Price[]>(environment.webApiBaseUrl + 'Clinic/GetPriceList/'+adminId, {
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
        return this.http.post(environment.webApiBaseUrl + 'Account/SendMail/', mail);
    }

    public GetAllRoomsFromClinicByAdminId(adminId: string): Observable<Room[]>{
        return this.http.get<Room[]>(environment.webApiBaseUrl + 'Clinic/GetAllRooms/' + adminId);
   
    }

    public GetExaminationById(examinationId: string): Observable<Examination[]> {
        return this.http.get<Examination[]>(environment.webApiBaseUrl + 'Examination/GetExaminationById/' + examinationId, {
            responseType: 'json'
        });
    }

    public DeleteRoom(room: Room){
        return this.http.post(environment.webApiBaseUrl + 'Clinic/DeleteRoom',room);
    }

    public UpdateRoom(room: Room){
        return this.http.post(environment.webApiBaseUrl + 'Clinic/UpdateRoom',room);
    }

    public FirstAvailableByDate(roomDate: RoomDate): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Examination/FirstAvailableByDate',roomDate)
    }

    public GetOccupancyForRoomByDate(roomDate: RoomDate): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Examination/GetOccupancyForRoomByDate',roomDate)
    }

    public GetAllDoctorsFromClinic(clinicId: string): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'Clinic/GetAllDoctorsFromClinic/' + clinicId, {
            responseType: 'json'
        });        
    }

    public GetPatientsByClinicId(clinicId: string): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'Clinic/GetPatientsByClinicId/' + clinicId, {
            responseType: 'json'
        });  
    }

    public GetPatientsByDoctorId(doctorId: string): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'Clinic/GetPatientsByDoctorId/' + doctorId, {
            responseType: 'json'
        });  
    }

    //****************STARE METODE***********************
    public VacationRequest(vacationRequest: Vacation){
        return this.http.post(environment.webApiBaseUrl + 'User/VacationRequest', vacationRequest);

    }

    public GetVacationRequests(): Observable<Vacation[]> {
        return this.http.get<Vacation[]>(environment.webApiBaseUrl + 'User/GetVacationRequests', {
            responseType: 'json'
        });
    }

    public AcceptVacationRequests(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'User/AcceptVacationRequests', mail);
    }

    public DenyVacationRequests(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'User/DenyVacationRequests', mail);
    }
    
    public GetFreeExaminationAndDoctorByClinic(request: RequestExamination): Observable<any[]> {
        let result: any;
        return this.http.post(environment.webApiBaseUrl + 'Examination/GetFreeExaminationAndDoctorByClinic/', request) as Observable<any[]>;
    }

    public AcceptExaminationRequest(bookroom: RoomExamination){
        return this.http.post(environment.webApiBaseUrl + 'Examination/AcceptExaminationRequest', bookroom);
    }

    public GetExaminationRequests(clinicId:string): Observable<any> {
        return this.http.get<any>(environment.webApiBaseUrl + 'Examination/GetExaminationRequests/' + clinicId, {
            responseType: 'json'
        });
    }
    public GetAllExaminationsByUserId(userId: string): Observable<Examination[]> {
        return this.http.get<Examination[]>(environment.webApiBaseUrl + 'Examination/GetAllExaminationsByUserId/' + userId, {
            responseType: 'json'
        });
    }

    public AddExamination(examination: NewExamination){
        return this.http.post(environment.webApiBaseUrl + 'Examination/AddExamination', examination);
    }

    public GetClinicByTypeDateExamination(request: RequestExamination): Observable<Clinic[]> {
         let result: any;
        return this.http.post(environment.webApiBaseUrl + 'Examination/GetClinicByTypeDateExamination/', request) as Observable<Clinic[]>;
    }

    public AddReview(review: Review) {
        return this.http.post(environment.webApiBaseUrl + 'Examination/AddReview', review);
    }
    public CheckIfAlreadyReviewed(patientId: string, reviewedId: string): Observable<any>{
        return this.http.get<any>(environment.webApiBaseUrl + 'Examination/CheckIfAlreadyReviewed/'+ patientId + "/" + reviewedId, {
            responseType: 'json'
        });
    }
}