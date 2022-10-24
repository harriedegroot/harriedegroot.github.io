import { Component, Input, OnInit } from '@angular/core';
import { Project, Skill } from 'app/models/profile.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project!: Project;
  @Input() role: boolean = true;
  @Input() company: boolean = true;
  @Input() skills: boolean = true;
  @Input() chips: boolean = true;

  private _technologies?: Skill[];
  get technologies(): Skill[] {
    if(!this._technologies && this.project?.technologies) {
      this._technologies = _.sortBy(this.project.technologies, s => s.proficiency);
      this._technologies = _.reverse(this._technologies);
    }
    return this._technologies ?? [];
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
