import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';
import { EditComponent } from '../edit/edit.component';
import { ParticipateComponent } from '../participate/participate.component';
import { BiddersService } from '../services/bidders.service';
import { CustomEventsService } from '../services/custom-events.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  progress = true;

  tire = false;
  suspensions = false;
  turbocharges = false;
  exhaustPipe = false;
  brakePads = false;
  rearviewMirrors = false;
  windshield = false;

  winner1: any;
  winner2: any;
  winner3: any;
  winner4: any;
  winner5: any;
  winner6: any;
  winner7: any;

  id1 = 999;
  id2 = 999;
  id3 = 999;
  id4 = 999;
  id5 = 999;
  id6 = 999;
  id7 = 999;

  countDownDate = new Date(Date.now() + 12096e5).getTime();
  now = new Date().getTime();
  distance = this.countDownDate - this.now;
  count: any;

  bidder = {
    ID: undefined,
    CompanyName: undefined,
    OccID: undefined,
    Price: undefined,
    Email: undefined
  };

  userImageLink = '../../assets/car_logo.jpeg';

  displayedColumns: string[] = ['ID', 'CompanyName', 'OccID', 'Price', 'actions'];
  dataSource: any = [];

  constructor(public dialog: MatDialog, private bid: BiddersService, private customEventsService: CustomEventsService) { }

  ngOnInit(): void {
    this.getTable();
    this.customEventsService.receiveEventData('verifyEvent').subscribe(
      (result: any) => {
        this.dataSource = JSON.parse(String(result)).dataSource;
      }
    );
  }

  setMin1(): void {
    console.log('A intrat!!!!');
    console.log(this.dataSource);
  }

  openDialog(): void {
    this.dialog.open(ParticipateComponent);
  }

  openEdit(ID: any, CompanyName: any, OccID: any, Price: any, Email: any ): void {
    const data: any = {ID, CompanyName, OccID, Price, Email};
    this.bidder.ID = ID;
    this.bidder.CompanyName = CompanyName;
    this.bidder.OccID = OccID;
    this.bidder.Price = Price;
    this.bidder.Email = Email;
    document.dispatchEvent(
      this.customEventsService.createCustomEvent('editBidder', this.bidder)
    );
    console.log('ID: ' + ID + ', CompanyName: ' + CompanyName + ', OccupationID: ' + OccID + ', Price: ' + Price + ', Email: ' + Email);
    console.log(this.bidder);
    localStorage.setItem('ID', ID);
    localStorage.setItem('CompanyName', CompanyName);
    localStorage.setItem('OccID', OccID);
    localStorage.setItem('Price', Price);
    localStorage.setItem('Email', Email);
    localStorage.setItem('bidder', this.bidder.toString());
    this.dialog.open(EditComponent);
  }

  getTable(): any{
    this.bid.getTable().subscribe(
      (data: any) => {
        this.dataSource = data;
        console.log(this.dataSource);
        for (const i of this.dataSource){
          const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const second = Math.floor((distance % (1000 * 60)) / 1000);
            this.count = days + 'd ' + hours + 'h ' + minutes + 'm ' + second + 's ';
            if (this.distance < 0){
              clearInterval(x);
              this.count = 'Expired';
              this.progress = false;
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 1){
                if (i.Price < this.id1) {
                  this.tire = true;
                  console.log('Tire-boolean: ' + this.tire);
                  this.id1 = i.Price;
                  this.winner1 = i.CompanyName;
                  console.log('Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 2){
                if (i.Price < this.id2) {
                  this.suspensions = true;
                  console.log('Suspensions-boolean: ' + this.suspensions);
                  this.id2 = i.Price;
                  this.winner2 = i.CompanyName;
                  console.log('Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 3){
                if (i.Price < this.id3) {
                  this.turbocharges = true;
                  console.log('Turbocharges-boolean: ' + this.turbocharges);
                  this.id3 = i.Price;
                  this.winner3 = i.CompanyName;
                  console.log('Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 4){
                if (i.Price < this.id4) {
                  this.exhaustPipe = true;
                  console.log('ExhaustPipe-boolean: ' + this.exhaustPipe);
                  this.id4 = i.Price;
                  this.winner4 = i.CompanyName;
                  console.log('ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 5){
                if (i.Price < this.id5) {
                  this.brakePads = true;
                  console.log('BrakePads-boolean: ' + this.brakePads);
                  this.id5 = i.Price;
                  this.winner5 = i.CompanyName;
                  console.log('BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 6){
                if (i.Price < this.id6) {
                  this.rearviewMirrors = true;
                  console.log('RearviewMirrors-boolean: ' + this.rearviewMirrors);
                  this.id6 = i.Price;
                  this.winner6 = i.CompanyName;
                  console.log('RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 7){
                if (i.Price < this.id7) {
                  this.windshield = true;
                  console.log('Windshield-boolean: ' + this.windshield);
                  this.id7 = i.Price;
                  this.winner7 = i.CompanyName;
                  console.log('Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                }
              }
            }
          });
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 1){
            if (i.Price <= 30) {
              this.tire = true;
              console.log('Tire-boolean: ' + this.tire);
              this.id1 = i.Price;
              this.winner1 = i.CompanyName;
              console.log('Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 2){
            if (i.Price <= 30) {
              this.suspensions = true;
              console.log('Suspensions-boolean: ' + this.suspensions);
              this.id2 = i.Price;
              this.winner2 = i.CompanyName;
              console.log('Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 3){
            if (i.Price <= 30) {
              this.turbocharges = true;
              console.log('Turbocharges-boolean: ' + this.turbocharges);
              this.id3 = i.Price;
              this.winner3 = i.CompanyName;
              console.log('Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 4){
            if (i.Price <= 30) {
              this.exhaustPipe = true;
              console.log('ExhaustPipe-boolean: ' + this.exhaustPipe);
              this.id4 = i.Price;
              this.winner4 = i.CompanyName;
              console.log('ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 5){
            if (i.Price <= 30) {
              this.brakePads = true;
              console.log('BrakePads-boolean: ' + this.brakePads);
              this.id5 = i.Price;
              this.winner5 = i.CompanyName;
              console.log('BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 6){
            if (i.Price <= 30) {
              this.rearviewMirrors = true;
              console.log('RearviewMirrors-boolean: ' + this.rearviewMirrors);
              this.id6 = i.Price;
              this.winner6 = i.CompanyName;
              console.log('RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
          // tslint:disable-next-line:triple-equals
          if (i.OccID == 7){
            if (i.Price <= 30) {
              this.windshield = true;
              console.log('Windshield-boolean: ' + this.windshield);
              this.id7 = i.Price;
              this.winner7 = i.CompanyName;
              console.log('Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
            }
          }
        }
      }
    );
    this.setMin1();
  }

  deleteBidder(ID: any): void{
    console.log(ID);
    axios.delete(API_BASE_URL + 'deleteByID/' + ID, {
      data: {
        ID
      },
      headers: { 'x-auth-token': `${localStorage.getItem('token')}` },
    }).then((res) => {
      console.log(res);
      this.getTable();
    });
  }
}
