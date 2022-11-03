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

  @Input() public profile?: Profile | null;

  @Input() headline: string[] = [
    'MSc. Artificial Intelligence',
    'Freelance Full-Stack Developer',
    'Freelance Software Architect',
    'Freelance Software Engineer',
  ];
  @Input() location: string[] = [
    //'Netherlands', 
    'Heerenveen'];

  constructor(private zone: NgZone) {}

  ngOnInit(): void {

    setTimeout(() => this.zone.run(() => this.headlineCursor = false), 12*1000);

    gsap.to('.contact .avatar', {
      width: 150,
      height: 150,
      opacity: 1,
      duration: 2,
      ease: 'back',
    });

    gsap.from('.contact .info .name', {
      width: 0,
      ease: 'power3',
      duration: 1,
      delay: 1.2
    });

    gsap.to('.contact .typed', {
      opacity: 1,
      duration: .5,
      delay: 2
    });

    gsap.to('#home-footer', {
      opacity: 1,
      duration: .7,
      delay: 2
      // delay: 3.5
    });
    gsap.from('#home-footer', {
      y: 70,
      duration: .7,
      delay: 2
      //delay: 3.5
    });
  }
}
