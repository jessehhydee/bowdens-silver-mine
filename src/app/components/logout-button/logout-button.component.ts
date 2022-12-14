import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VarStorageService } from 'src/app/services/var-storage.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private router:     Router,
    private varStorage: VarStorageService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Remove token from storage so that access can not be gained again until user has logged back in.
   * 
   * Set observable @var displayLoadingScreen in varStorage to true so that if the user logs back in, the loader will display.
   */
  logout = () => {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    return this.varStorage.pullDisplayLoadingScreen(true)
  }

}
