import { Component, OnInit, ViewChild } from '@angular/core';
import { PROFILE } from 'app/data/profile';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  profile = PROFILE;

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

  constructor() {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    gsap.from('.menu', {
      y: -80,
      duration: 2,
      scale: 0.4,
      ease: 'back',
      delay: 2,
    });

    const nextSectionDelay = 10;
    gsap.to('.next-section', {
      opacity: 0.4,
      duration: 1,
      delay: nextSectionDelay + 0.8,
    });

    gsap.from('.next-section', {
      y: -70,
      duration: 1,
      ease: 'bounce',
      delay: nextSectionDelay + 1,
    });

    var tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      delay: nextSectionDelay + 1.5,
      yoyo: true,
    });
    tl.to('.next-section', {
      y: -30,
      duration: 2,
      ease: 'inOut',
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
