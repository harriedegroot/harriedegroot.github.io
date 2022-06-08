import { Component, OnInit } from '@angular/core';
import { PROFILE } from 'app/data/profile';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  experience = PROFILE.experience ?? [];
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

  constructor() { }

  ngOnInit(): void {
  }
  
  onSkillsProgress(percent: number) {
    //console.log(`skills step: ${percent}%`);
  }
}
