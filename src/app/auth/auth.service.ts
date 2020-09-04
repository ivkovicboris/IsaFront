import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';


@Injectable()
export class AuthService {
  constructor() {}
  // ...

  public isAdmin(): boolean {
    // this will be passed from the route config
    // on the data property
    const token = localStorage.getItem('token');
    if (token === null){
      return false;
    }
    // decode the token to get its payload
    //const tokenPayload = decode(token);
    if ( localStorage.getItem('Role') === 'Administrator') {
      return true;
    }
    return false;
  }
  
}