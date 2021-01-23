/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

/* eslint-disable @typescript-eslint/no-empty-function */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  hide: unknown;

  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password,
    };
    axios
      .post(API_BASE_URL + 'auth/login', payload)
      .then( (response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('token', response.data);
          this.router.navigate(['/home']);
          console.log('A mers!');
        } else if (response.status === 204) {
          console.log('Eroarea 1');
        } else {
          console.log('Eroarea 2');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


