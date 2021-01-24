import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckPasswordService } from '../services/check-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';
import { MatDialog } from '@angular/material/dialog';
import { CustomEventsService } from '../services/custom-events.service';
import { BiddersService } from '../services/bidders.service';

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
  participationForm: FormGroup = new FormGroup({});

  occupations: Occupation[] = [
    {value: '1', viewValue: 'tire'},
    {value: '2', viewValue: 'suspensions'},
    {value: '3', viewValue: 'turbocharges'},
    {value: '4', viewValue: 'exhaust pipe'},
    {value: '5', viewValue: 'brake pads'},
    {value: '6', viewValue: 'rearview mirrors'},
    {value: '7', viewValue: 'windshield'},
  ];

  dataSource: any = [];


  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public dialog: MatDialog, private customEventsService: CustomEventsService, private bid: BiddersService) { }

  ngOnInit(): void {
    this.createParticipationForm();
  }

  createParticipationForm(): void {
    this.participationForm = this.fb.group(
      {
        Name: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Price: ['', Validators.required],
        Occupation: ['', Validators.required],
      }
    );
  }

  onParticipation(): void {
    this.payload = Object.assign(this.payload, this.participationForm.value);
    axios.post(
      API_BASE_URL + 'addUser', this.payload).then(
          (response) => {
            if (response.status === 200) {
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
    this.getTable();
    this.sendEvent();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  getTable(): any{
    this.bid.getTable().subscribe(
      (data: any) => {
        this.dataSource = data;
        console.log(this.dataSource);
      }
    );
  }

  sendEvent(): void {
    document.dispatchEvent(
      this.customEventsService.createCustomEvent(
        'verifyEvent',
        this.dataSource
      )
    );
  }

}
