import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipateComponent } from '../participate/participate.component';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';
import { BidiModule } from '@angular/cdk/bidi';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { BiddersService } from '../services/bidders.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userImageLink = '../../assets/car_logo.jpeg';

  displayedColumns: string[] = ['ID', 'CompanyName', 'OccID', 'Price', 'actions'];
  dataSource = [];

  constructor(public dialog: MatDialog, private bid: BiddersService) { }

  ngOnInit(): void {
     this.bid.getTable().subscribe(
       (data: any) => {
         this.dataSource = data;
         console.log(this.dataSource);
       }
     );
  }

  openDialog(): void {
    this.dialog.open(ParticipateComponent);
  }
}
