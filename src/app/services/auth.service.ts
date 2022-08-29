import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  acceptedUsername: string  = 'admin';
  acceptedPassword: string  = 'admin01';

  constructor() { }

  /**
   * @returns boolean - true if 'token' exists in local storage.
   * False otherwise.
   */
  isLoggedIn = () => {
    return !!localStorage.getItem('token');
  }

  /**
   * @param enteredUsername - Entered username in login 'username' input
   * @param enteredPassword - Entered password in login 'password' input
   * 
   * If @param enteredUsername equals @var acceptedUsername and @param enteredPassword equals @var acceptedPassword, set token to local storage so user can gain present and future access to /home
   * 
   * @returns boolean - was comparison successful or not.
   */
  doLoginCredMatch = async (enteredUsername: string, enteredPassword: string) => {

    if(enteredUsername ===  this.acceptedUsername && enteredPassword ===  this.acceptedPassword) {
      localStorage.setItem('token', 'yourAccepted!!aabbccdd');
      return true;
    } 
    return false;

  }

}
