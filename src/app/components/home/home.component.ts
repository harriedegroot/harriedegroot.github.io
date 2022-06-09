import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Profile } from 'app/models/profile.model';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  headlineCursor: boolean = true;
  locationCursor: boolean = false;

  @Input() public profile?: Profile;

  @Input() headline: string[] = [
    'Freelance Developer',
    'Freelance Full-Stack Developer',
    'Freelance Software Architect',
    'Freelance Software Engineer',
  ];
  @Input() location: string[] = [
    //'Netherlands', 
    'Heerenveen'];

  constructor(private zone: NgZone) {}

  ngOnInit(): void {

    setTimeout(() => this.zone.run(() => this.headlineCursor = false), 10*1000);

    gsap.to('.contact .avatar', {
      width: 150,
      height: 150,
      opacity: 1,
      duration: 2,
      ease: 'back',
    });
  }
}
