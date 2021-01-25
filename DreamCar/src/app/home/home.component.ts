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

  partial = false;

  progress = true;
  winner = false;

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

  distance2 = 1;

  id1 = 999;
  id2 = 999;
  id3 = 999;
  id4 = 999;
  id5 = 999;
  id6 = 999;
  id7 = 999;

  email: any;
  companyName: any;
  em1: any;
  em2: any;
  em3: any;
  em4: any;
  em5: any;
  em6: any;
  em7: any;

  ms1: any;
  ms2: any;
  ms3: any;
  ms4: any;
  ms5: any;
  ms6: any;
  ms7: any;

  countDownDate = new Date(Date.now() + 12096e5).getTime();
  // countDownDate = new Date(Date.now() + 5000).getTime();
  count: any;
  x = setInterval(() => {
    const now = new Date().getTime();
    const distance = this.countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((distance % (1000 * 60)) / 1000);
    this.count = days + 'd ' + hours + 'h ' + minutes + 'm ' + second + 's ';
    if (distance < 0){
    this.distance2 = 0;
    this.getTable();
    clearInterval(this.x);
    }
  });

  bidder = {
    ID: undefined,
    CompanyName: undefined,
    OccID: undefined,
    Price: undefined,
    Email: undefined
  };

  userImageLink = '../../assets/car_logo.jpeg';

  displayedColumns: string[] = ['ID', 'CompanyName', 'OccID', 'Price', 'actions'];
  displayedColumns2: string[] = ['ID', 'CompanyName', 'OccID', 'Price'];
  dataSource: any = [];

  // tslint:disable-next-line:max-line-length
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
            if (this.distance2 === 0){
              this.count = 'Expired';
              this.progress = false;
              this.winner = false;
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 1){
                if (i.Price < this.id1) {
                  this.tire = true;
                  this.winner = true;
                  console.log('Tire-boolean: ' + this.tire);
                  this.id1 = i.Price;
                  this.winner1 = i.CompanyName;
                  console.log('Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em1 = i.Email;
                  this.ms1 = ' Congratulations! You are the Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em1', this.em1.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms1);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 2){
                if (i.Price < this.id2) {
                  this.suspensions = true;
                  this.winner = true;
                  console.log('Suspensions-boolean: ' + this.suspensions);
                  this.id2 = i.Price;
                  this.winner2 = i.CompanyName;
                  console.log('Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em2 = i.Email;
                  this.ms2 = ' Congratulations! You are the Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em2', this.em2.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms2);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 3){
                if (i.Price < this.id3) {
                  this.turbocharges = true;
                  this.winner = true;
                  console.log('Turbocharges-boolean: ' + this.turbocharges);
                  this.id3 = i.Price;
                  this.winner3 = i.CompanyName;
                  console.log('Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em3 = i.Email;
                  this.ms3 = ' Congratulations! You are the Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em3', this.em3.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms3);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 4){
                if (i.Price < this.id4) {
                  this.exhaustPipe = true;
                  this.winner = true;
                  console.log('ExhaustPipe-boolean: ' + this.exhaustPipe);
                  this.id4 = i.Price;
                  this.winner4 = i.CompanyName;
                  console.log('ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em4 = i.Email;
                  this.ms4 = ' Congratulations! You are the ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em4', this.em4.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms4);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 5){
                if (i.Price < this.id5) {
                  this.brakePads = true;
                  this.winner = true;
                  console.log('BrakePads-boolean: ' + this.brakePads);
                  this.id5 = i.Price;
                  this.winner5 = i.CompanyName;
                  console.log('BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em5 = i.Email;
                  this.ms5 = ' Congratulations! You are the BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em5', this.em5.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms5);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 6){
                if (i.Price < this.id6) {
                  this.rearviewMirrors = true;
                  this.winner = true;
                  console.log('RearviewMirrors-boolean: ' + this.rearviewMirrors);
                  this.id6 = i.Price;
                  this.winner6 = i.CompanyName;
                  console.log('RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em6 = i.Email;
                  this.ms6 = ' Congratulations! You are the RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em6', this.em6.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms6);
                }
              }
              // tslint:disable-next-line:triple-equals
              if (i.OccID == 7){
                if (i.Price < this.id7) {
                  this.windshield = true;
                  this.winner = true;
                  console.log('Windshield-boolean: ' + this.windshield);
                  this.id7 = i.Price;
                  this.winner7 = i.CompanyName;
                  console.log('Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                  this.em7 = i.Email;
                  this.ms7 = ' Congratulations! You are the Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                  localStorage.setItem('em7', this.em7.toString());
                  this.sendEmail(i.Email, i.CompanyName, this.ms7);
                }
              }
            }
            // tslint:disable-next-line:max-line-length
            if (localStorage.getItem('id1')){
              this.winner = true;
              this.tire = true;
              this.id1 = +(localStorage.getItem('id1') || 0);
              this.winner1 = localStorage.getItem('comp1');
            } else if (localStorage.getItem('id2')){
              this.winner = true;
              this.suspensions = true;
              this.id2 = +(localStorage.getItem('id2') || 0);
              this.winner2 = localStorage.getItem('comp2');
            } else if (localStorage.getItem('id3')){
              this.winner = true;
              this.turbocharges = true;
              this.id3 = +(localStorage.getItem('id3') || 0);
              this.winner3 = localStorage.getItem('comp3');
            } else if (localStorage.getItem('id4')){
              this.winner = true;
              this.exhaustPipe = true;
              this.id4 = +(localStorage.getItem('id4') || 0);
              this.winner4 = localStorage.getItem('comp4');
            } else if (localStorage.getItem('id5')){
              this.winner = true;
              this.brakePads = true;
              this.id5 = +(localStorage.getItem('id5') || 0);
              this.winner5 = localStorage.getItem('comp5');
            } else if (localStorage.getItem('id6')){
              this.winner = true;
              this.rearviewMirrors = true;
              this.id6 = +(localStorage.getItem('id6') || 0);
              this.winner6 = localStorage.getItem('comp6');
            } else if (localStorage.getItem('id7')){
              this.winner = true;
              this.windshield = true;
              this.id7 = +(localStorage.getItem('id7') || 0);
              this.winner7 = localStorage.getItem('comp7');
            }

          // tslint:disable-next-line:triple-equals
            if (i.OccID == 1){
            if (i.Price <= 30) {
              if (this.tire === false && (!localStorage.getItem('id1'))) {
                this.tire = true;
                this.winner = true;
                console.log('Tire-boolean: ' + this.tire);
                this.id1 = i.Price;
                this.winner1 = i.CompanyName;
                this.em1 = i.Email;
                this.ms1 = ' Congratulations! You are the Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                localStorage.setItem('id1', this.id1.toString());
                localStorage.setItem('comp1', this.winner1.toString());
                localStorage.setItem('em1', this.em1.toString());
                console.log('Tire-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                this.sendEmail(i.Email, i.CompanyName, this.ms1);
              } else if (this.tire === false) {
                this.tire = true;
                this.winner = true;
                console.log('Tire-boolean: ' + this.tire);
                this.id1 = +(localStorage.getItem('id1') || 0);
                this.winner1 = localStorage.getItem('comp1');
                this.em1 = localStorage.getItem('em1');
                this.ms1 = 'Congratulations! You are the Tire-winner: ' + this.winner1 + ' with ' + this.id1 + '$/Lot!';
                console.log('Tire-winner: ' + this.winner1 + ' with ' + this.id1 + '$/Lot!');
                this.sendEmail(this.em1, this.winner1, this.ms1);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 2){
            if (i.Price <= 30) {
              if (this.suspensions === false && (!localStorage.getItem('id2'))) {
                this.suspensions = true;
                this.winner = true;
                console.log('Suspensions-boolean: ' + this.suspensions);
                this.id2 = i.Price;
                this.winner2 = i.CompanyName;
                this.em2 = i.Email;
                this.ms2 = ' Congratulations! You are the Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                localStorage.setItem('em2', this.em2.toString());
                localStorage.setItem('id2', this.id2.toString());
                localStorage.setItem('comp2', this.winner2.toString());
                console.log('Suspensions-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                this.sendEmail(i.Email, i.CompanyName, this.ms2);
              } else if (this.suspensions === false){
              this.suspensions = true;
              this.winner = true;
              console.log('Suspensions-boolean: ' + this.suspensions);
              this.id2 = +(localStorage.getItem('id2') || 0);
              this.winner2 = localStorage.getItem('comp2');
              this.em2 = localStorage.getItem('em2');
              this.ms2 = 'Congratulations! You are the Suspensions-winner: ' + this.winner2 + ' with ' + this.id2 + '$/Lot!';
              console.log('Suspensions-winner: ' + i.winner2 + ' with ' + this.id2 + '$/Lot!');
              this.sendEmail(this.em2, this.winner2, this.ms2);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 3){
            if (i.Price <= 30) {
              if (this.turbocharges === false && (!localStorage.getItem('id3'))){
              this.turbocharges = true;
              this.winner = true;
              console.log('Turbocharges-boolean: ' + this.turbocharges);
              this.id3 = i.Price;
              this.winner3 = i.CompanyName;
              this.em3 = i.Email;
              this.ms3 = ' Congratulations! You are the Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
              localStorage.setItem('id3', this.id3.toString());
              localStorage.setItem('comp3', this.winner3.toString());
              localStorage.setItem('em3', this.em3.toString());
              console.log('Turbocharges-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
              this.sendEmail(i.Email, i.CompanyName, this.ms3);
              } else if (this.turbocharges === false){
              this.turbocharges = true;
              this.winner = true;
              console.log('Turbocharges-boolean: ' + this.turbocharges);
              this.id3 = +(localStorage.getItem('id3') || 0);
              this.winner3 = localStorage.getItem('comp3');
              this.em3 = localStorage.getItem('em3');
              this.ms3 = 'Congratulations! You are the Turbocharges-winner: ' + this.winner3 + ' with ' + this.id3 + '$/Lot!';
              console.log('Turbocharges-winner: ' + this.winner3 + ' with ' + this.id3 + '$/Lot!');
              this.sendEmail(this.em3, this.winner3, this.ms3);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 4){
            if (i.Price <= 30) {
              if (this.exhaustPipe === false && (!localStorage.getItem('id4'))){
                this.exhaustPipe = true;
                this.winner = true;
                console.log('ExhaustPipe-boolean: ' + this.exhaustPipe);
                this.id4 = i.Price;
                this.winner4 = i.CompanyName;
                this.em4 = i.Email;
                this.ms4 = ' Congratulations! You are the ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
                localStorage.setItem('id4', this.id4.toString());
                localStorage.setItem('comp4', this.winner4.toString());
                localStorage.setItem('em4', this.em4.toString());
                console.log('ExhaustPipe-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
                this.sendEmail(i.Email, i.CompanyName, this.ms4);
              } else if (this.exhaustPipe === false){
                this.exhaustPipe = true;
                this.winner = true;
                console.log('ExhaustPipe-boolean: ' + this.exhaustPipe);
                this.id4 = +(localStorage.getItem('id4') || 0);
                this.winner4 = localStorage.getItem('comp4');
                this.em4 = localStorage.getItem('em4');
                this.ms4 = 'Congratulations! You are the ExhaustPipe-winner: ' + this.winner4 + ' with ' + this.id4 + '$/Lot!';
                console.log('ExhaustPipe-winner: ' + this.winner4 + ' with ' + this.id4 + '$/Lot!');
                this.sendEmail(this.em4, this.winner4, this.ms4);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 5 ){
            if (i.Price <= 30) {
              if (this.brakePads === false && (!localStorage.getItem('id5'))){
              this.brakePads = true;
              this.winner = true;
              console.log('BrakePads-boolean: ' + this.brakePads);
              this.id5 = i.Price;
              this.winner5 = i.CompanyName;
              this.em5 = i.Email;
              this.ms5 = ' Congratulations! You are the BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
              localStorage.setItem('id5', this.id5.toString());
              localStorage.setItem('comp5', this.winner5.toString());
              localStorage.setItem('em5', this.em5.toString());
              console.log('BrakePads-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
              this.sendEmail(i.Email, i.CompanyName, this.ms5);
              } else if (this.brakePads === false){
              this.brakePads = true;
              this.winner = true;
              console.log('BrakePads-boolean: ' + this.brakePads);
              this.id5 = +(localStorage.getItem('id5') || 0);
              this.winner5 = localStorage.getItem('comp5');
              this.em5 = localStorage.getItem('em5');
              this.ms5 = 'Congratulations! You are the BrakePads-winner: ' + this.winner5 + ' with ' + this.id5 + '$/Lot!';
              console.log('BrakePads-winner: ' + this.winner5 + ' with ' + this.id5 + '$/Lot!');
              this.sendEmail(this.em5, this.winner5, this.ms5);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 6){
            if (i.Price <= 30) {
              if (this.rearviewMirrors === false && (!localStorage.getItem('id6'))){
              this.rearviewMirrors = true;
              this.winner = true;
              console.log('RearviewMirrors-boolean: ' + this.rearviewMirrors);
              this.id6 = i.Price;
              this.winner6 = i.CompanyName;
              this.em6 = i.Email;
              this.ms6 = ' Congratulations! You are the RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
              localStorage.setItem('id6', this.id6.toString());
              localStorage.setItem('comp6', this.winner6.toString());
              localStorage.setItem('em6', this.em6.toString());
              console.log('RearviewMirrors-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
              this.sendEmail(i.Email, i.CompanyName, this.ms6);
              } else if (this.rearviewMirrors === false){
                this.rearviewMirrors = true;
                this.winner = true;
                console.log('RearviewMirrors-boolean: ' + this.rearviewMirrors);
                this.id6 = +(localStorage.getItem('id6') || 0);
                this.winner6 = localStorage.getItem('comp6');
                this.em6 = localStorage.getItem('em6');
                this.ms6 = 'Congratulations! You are the RearviewMirrors-winner: ' + this.winner6 + ' with ' + this.id6 + '$/Lot!';
                console.log('RearviewMirrors-winner: ' + this.winner6 + ' with ' + this.id6 + '$/Lot!');
                this.sendEmail(this.em6, this.winner6, this.ms6);
              }
            }
          }
          // tslint:disable-next-line:triple-equals
            if (i.OccID == 7){
            if (i.Price <= 30) {
              if (this.windshield === false && (!localStorage.getItem('id6'))){
              this.windshield = true;
              this.winner = true;
              console.log('Windshield-boolean: ' + this.windshield);
              this.id7 = i.Price;
              this.winner7 = i.CompanyName;
              this.em7 = i.Email;
              this.ms7 = ' Congratulations! You are the Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!';
              localStorage.setItem('id7', this.id7.toString());
              localStorage.setItem('comp7', this.winner7.toString());
              localStorage.setItem('em7', this.em7.toString());
              console.log('Windshield-winner: ' + i.CompanyName + ' with ' + i.Price + '$/Lot!');
              this.sendEmail(i.Email, i.CompanyName, this.ms7);
              } else if (this.windshield === false){
                this.windshield = true;
                this.winner = true;
                console.log('Windshield-boolean: ' + this.windshield);
                this.id7 = +(localStorage.getItem('id7') || 0);
                this.winner7 = localStorage.getItem('comp7');
                this.em7 = localStorage.getItem('em7');
                this.ms7 = 'Congratulations! You are the Turbocharges-winner: ' + this.winner7 + ' with ' + this.id7 + '$/Lot!';
                console.log('Windshield-winner: ' + this.winner7 + ' with ' + this.id7 + '$/Lot!');
                this.sendEmail(this.em7, this.winner7, this.ms7);
              }
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

  // tslint:disable-next-line:typedef
  sendEmail(Email: any, CompanyName: any, Message: any){
    const user = {
      // tslint:disable-next-line:object-literal-shorthand
      Email: Email,
      // tslint:disable-next-line:object-literal-shorthand
      CompanyName: CompanyName,
      // tslint:disable-next-line:object-literal-shorthand
      Message: Message
    };
    this.bid.sendEmail(API_BASE_URL + 'sendEmail', user).subscribe(
      data => {

        const res: any = data;
        console.log('Email has been sent!!!');
      },

      err => {
        console.log(err);
      }, () => {
        console.log('Then other functions.....');
      }
    );
  }
}
