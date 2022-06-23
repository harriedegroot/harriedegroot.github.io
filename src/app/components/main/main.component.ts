import { Component, OnInit, ViewChild } from '@angular/core';
import { PROFILE } from 'app/data/profile';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import { AboutComponent } from '../about/about.component';
import { BackgroundComponent } from '../background/background.component';
import { SkillsComponent } from '../skills/skills.component';

function animateFrom(elem: any, direction: number = 1) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("from-left")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("from-right")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto",
  });
}

function hide(elem: any) {
  gsap.set(elem, {autoAlpha: 0});
}

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

  excludeExperience = ['Mustache Templates'];

  @ViewChild(BackgroundComponent, {static: true })
  background!: BackgroundComponent;

  @ViewChild(AboutComponent, {static: true })
  about!: AboutComponent;

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

    gsap.utils.toArray(".quote").forEach(function(elem: any) {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function() { animateFrom(elem) }, 
        onEnterBack: function() { animateFrom(elem, -1) },
        onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });
  }

  onShow(item: string) {
    switch(item){
      case 'background':
        this.background.enabled = true;
        break;
      case 'about':
        break;
      case 'skills':
        this.skills.play();
        break;
    }
  }

  onHide(item: string) {
    switch(item){
      case 'home':
        this.background.enabled = false;
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
