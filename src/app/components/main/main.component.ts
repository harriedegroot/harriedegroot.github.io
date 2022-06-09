import { Component, OnInit, ViewChild } from '@angular/core';
import { PROFILE } from 'app/data/profile';
import gsap from 'gsap';
// import {
//   PerfectScrollbarComponent,
//   PerfectScrollbarConfig,
// } from 'ngx-perfect-scrollbar';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  profile = PROFILE;

  // scrollbarConfig: Partial<PerfectScrollbarConfig> = {};

  selectedSkillTags = ['Programming Language', 'Software Framework'];
  hiddenSkillTags = [
    'API',
    'Algorithm',
    'Machine Learning',
    'DevOps',
    'Low-Code',
    'Android',
    'iOS',
    //'Database',
    'Design Pattern',
  ];

  // @ViewChild(PerfectScrollbarComponent, { static: true })
  // scrollbar!: PerfectScrollbarComponent;

  constructor() {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to('.next-section', {
      opacity: 0.4,
      duration: 1,
      //ease: 'bounce',
      delay: 4.8,
    });

    gsap.from('.next-section', {
      y: -70,
      duration: 1,
      ease: 'bounce',
      delay: 5,
    });

    var tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      delay: 6.5,
      yoyo: true,
    });
    tl.to('.next-section', {
      y: -30,
      duration: 2,
      ease: 'inOut',
    });

    let initialMenu = gsap.from('.menu', {
      y: -80,
      duration: 1.5,
      scale: 0.4,
      ease: 'back',
      delay: 3,
    });

    let actionMenu = gsap.to('.menu', {
      y: '-=60',
      duration: 0.5,
      ease: 'power2.in',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: '.menu',
      start: '10px top',
      onEnter: () => actionMenu.play(),
      onLeaveBack: () => actionMenu.reverse(),
    });
  }

  onSkillsProgress(percent: number) {
    //console.log(`skills step: ${percent}%`);
  }

  onMenuClick(item: string) {
    const pages = ['skills'];
    if (!pages.includes(item)) return;

    gsap.to(window, {
      duration: 0.2,
      scrollTo: '#section-' + item,
      ease: 'power2',
      autoKill: true,
    });
  }
}
