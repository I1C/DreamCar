import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

import { CheckPasswordService } from './../services/check-password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: unknown;
  payload = {};
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private checkP: CheckPasswordService, private router: Router) {}

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required, Validators.maxLength(12)]]
      },
      {
        validator: this.checkP.passwordMatchValidator(
          'password',
          'passwordConfirm'
        )
      }
    );
  }

  onRegister(): void {
    this.payload = Object.assign(this.payload, this.registerForm.value);
    axios.post(
      API_BASE_URL + 'auth/register', this.payload).then(
          (response) => {
            if (response.status === 200) {
            console.log('Inregistrare reusita!' + response);
            this.router.navigate(['']);
            }else if (response.status === 204) {
              console.log('Eroarea 1');
            } else {
              console.log('Eroarea 2');
            }
          }
      ).catch( (error) => {
        console.log(error);
      });
    this.registerForm.reset();
  }
}
