import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipateComponent } from '../participate/participate.component';
import { BiddersService } from '../services/bidders.service';
import { CustomEventsService } from '../services/custom-events.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  getTable(): any{
    this.bid.getTable().subscribe(
      (data: any) => {
        this.dataSource = data;
        console.log(this.dataSource);
      }
    );
  }
}
