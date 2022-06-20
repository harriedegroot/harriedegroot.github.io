import { Component, OnInit, ViewChild } from '@angular/core';
import { PROFILE } from 'app/data/profile';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import { SkillsComponent } from '../skills/skills.component';

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

  @ViewChild(SkillsComponent, {static: true })
  skills!: SkillsComponent;

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

    const nextSectionDelay = 2;
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

  onShow(item: string) {
    switch(item){
      case 'home':
        // start background inimation
        break;
      case 'skills':
        this.skills.play();
        break;
    }
  }

  onHide(item: string) {
    switch(item){
      case 'home':
        // stop background inimation
        break;
      case 'skills':
        this.skills.pause();
        break;
    }
  }

  onSkillsProgress(percent: number) {
    //console.log(`skills step: ${percent}%`);
  }

  navigateTo(item: string) {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: '#' + item,
      ease: 'power2',
    });
  }
}
