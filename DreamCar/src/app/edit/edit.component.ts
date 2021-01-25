import { Component, OnInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
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
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
  ID: any;
  CompanyName: any;
  OccID: any;
  Price: any;
  Email: any;

  bidder: any;


  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public dialog: MatDialog, private customEventsService: CustomEventsService, private bid: BiddersService) { }

  ngOnInit(): void {
    this.createParticipationForm();
    this.customEventsService.receiveEventData('editBidder').subscribe(
      (result: any) => {
        this.ID = JSON.parse(String(result)).ID;
        this.CompanyName = JSON.parse(String(result)).CompanyName;
        this.OccID = JSON.parse(String(result)).OccID;
        this.Price = JSON.parse(String(result)).Price;
        this.Email = JSON.parse(String(result)).Email;
      }
    );
    this.bidder = localStorage.getItem('bidder');
    this.ID = localStorage.getItem('ID');
    this.CompanyName = localStorage.getItem('CompanyName');
    this.OccID = localStorage.getItem('OccID');
    this.Price = localStorage.getItem('Price');
    this.Email = localStorage.getItem('Email');
    // tslint:disable-next-line:max-line-length
    // console.log('ID: ' + this.ID + ', CompanyName: ' + this.CompanyName + ', OccupationID: ' + this.OccID + ', Price: ' + this.Price + ', Email: ' + this.Email);
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

  onEdit(): void {
    this.payload = Object.assign(this.payload, this.participationForm.value);

    axios.put(
        API_BASE_URL + 'updateByID',
        {
          ID: this.ID,
          Name: this.CompanyName,
          Email: this.Email,
          Price: this.Price,
          Occupation: this.OccID,
        },
        {
          headers: { 'x-auth-token': `${localStorage.getItem('token')}` },
        }
      ).then((res) => {
        console.log(res);
        this.getTable();
      });
    this.getTable();
    this.sendEvent();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  getTable(): any{
    this.bid.getTable().subscribe(
      (data: any) => {
        this.dataSource = data;
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
