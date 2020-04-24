import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  hide = true;

  userid = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);
  passwd = new FormControl('',Validators.required);
  ngOnInit(): void {
  }

  getUserIdErrorMessage() {
    if (this.userid.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userid.hasError('pattern') ? 'Not a valid or registered mobile number' : '';
  }

  getPasswordErrorMessage()
  {
    if (this.passwd.hasError('required')) {
      return 'You must enter a value';
    }

  }
}
