import { Component, OnInit, ViewChild } from '@angular/core';
import { PROFILE } from 'app/data/profile';
import gsap from 'gsap';
import { PerfectScrollbarComponent, PerfectScrollbarConfig } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  profile = PROFILE;

  scrollbarConfig: Partial<PerfectScrollbarConfig> = {};

  selectedSkillTags = [
    'Programming Language', 
    'Software Framework'
  ];
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


  @ViewChild(PerfectScrollbarComponent, { static: true })
  scrollbar!: PerfectScrollbarComponent;

  constructor() { }

  ngOnInit(): void {
    gsap.to('.next-section', {
      opacity: .4,
      duration: 1,
      //ease: 'bounce',
      delay: 3.8
    });
    gsap.from('.next-section', {
      y: -100,
      duration: 1,
      ease: 'bounce',
      delay: 4
    });
  }
  
  onSkillsProgress(percent: number) {
    //console.log(`skills step: ${percent}%`);
  }

  scrollToBottom() {
    this.scrollbar.directiveRef?.scrollToBottom(0, 200);
  }
}
