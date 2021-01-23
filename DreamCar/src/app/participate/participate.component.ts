import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckPasswordService } from '../services/check-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit {

  hide: unknown;
  payload = {};
  registerForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private checkP: CheckPasswordService, private router: Router, public dialog: MatDialog) { }

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
            this.closeDialog();
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

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
