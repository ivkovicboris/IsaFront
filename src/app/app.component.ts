import { Component } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HospitalFront';
  token: any;

  constructor(private router: Router) {}

  HomePageRouting(){
    this.token = localStorage.getItem('token');
    const tokenPayload = jwt_decode(this.token);
    if(this.token==null){
      this.router.navigate(['/login'])
    }
    
    if (tokenPayload.Role=='Patient') { this.router.navigate(['/patientHomePage/']);}      
    else if (tokenPayload.Role=='ClinicAdmin'){ this.router.navigate(['/adminClinicHomePage/']);}
    else if (tokenPayload.Role=='Doctor'){ this.router.navigate(['/doctorHomePage/']);}
    else if (tokenPayload.Role=='Nurse'){ this.router.navigate(['/doctorHomePage/']);}
    else if (tokenPayload.Role=='ClinicCenterAdmin') { this.router.navigate(['/adminKCHomePage/'])}
  }

  LogOut(){
    this.token = localStorage.setItem('token', null);
    this.router.navigate(['/login'])
  }
}
