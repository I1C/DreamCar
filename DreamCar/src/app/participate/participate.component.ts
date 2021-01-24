import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckPasswordService } from '../services/check-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';
import { MatDialog } from '@angular/material/dialog';

interface Occupation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit {

  selectedValue = '';
  hide: unknown;
  payload = {};
  registerForm: FormGroup = new FormGroup({});

  occupations: Occupation[] = [
    {value: '1', viewValue: 'tire'},
    {value: '2', viewValue: 'suspensions'},
    {value: '3', viewValue: 'turbocharges'},
    {value: '4', viewValue: 'exhaust pipe'},
    {value: '5', viewValue: 'brake pads'},
    {value: '6', viewValue: 'rearview mirrors'},
    {value: '7', viewValue: 'windshield'},
  ];


  constructor(private fb: FormBuilder, private checkP: CheckPasswordService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registerForm = this.fb.group(
      {
        Name: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Price: ['', Validators.required],
        Occupation: ['', Validators.required],
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
      API_BASE_URL + 'addUser', this.payload).then(
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
