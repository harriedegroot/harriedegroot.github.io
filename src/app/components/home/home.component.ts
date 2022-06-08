import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'app/models/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@Input() public profile?: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
