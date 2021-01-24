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
      }
    );
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
