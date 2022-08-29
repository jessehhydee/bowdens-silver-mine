import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enteredUsername: string   = '';
  enteredPassword: string   = '';
  displayError:    boolean  = false;

  constructor(
    private authService:  AuthService,
    private router:       Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Check that enteredUsername & enteredPassword are correct against the true login credentials.
   * @var proceedToHome is returned a boolean.
   * 
   * If @var proceedToHome is falsy, display error message and clear inputs.
   * Otherwise, direct user to /home.
   */
  login = async () => {

    const proceedToHome = await this.authService.doLoginCredMatch(this.enteredUsername, this.enteredPassword);

    if(!proceedToHome) {
      this.displayError     = true;
      this.enteredUsername  = '';
      this.enteredPassword  = '';
      return;
    }

    this.router.navigate(['home']);

  }

}
