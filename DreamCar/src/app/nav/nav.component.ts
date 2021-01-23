import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomEventsService } from '../services/custom-events.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sharedUserName: unknown;
  userImage: unknown;
  userName: unknown;
  isLoggedIn = false;
  userImageLink: any;

  constructor(private customEventsService: CustomEventsService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userName = 'companyName';
      this.userImage = 'companyImage';
      this.isLoggedIn = true;
      this.userImageLink = localStorage.getItem('company_logo');
    }
    this.customEventsService
      .receiveEventData('customEvent')
      .subscribe((result) => {
        this.userName = JSON.parse(String(result)).userName;
        this.userImage = JSON.parse(String(result)).userImage;
        this.isLoggedIn = JSON.parse(String(result)).isLoggedIn;
        if (localStorage.getItem('token')) {
          this.isLoggedIn = true;
          this.userImageLink = localStorage.getItem('company_logo');
        }
      });
  }

  getLogout(): void {
    localStorage.clear();
    this.userImage = '';
    this.userName = '';
    this.isLoggedIn = false;
  }

  user(): void{
    if (localStorage.getItem('token')){
      this.router.navigate(['"home"']);
    }
  }
}
