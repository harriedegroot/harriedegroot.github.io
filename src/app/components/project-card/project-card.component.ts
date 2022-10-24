import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'app/models/profile.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project!: Project;
  @Input() role: boolean = true;
  @Input() company: boolean = true;
  @Input() technologies: boolean = false;
  @Input() chips: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
