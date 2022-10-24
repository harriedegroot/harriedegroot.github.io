import { Component, Input, OnInit } from '@angular/core';
import { Experience, Project } from 'app/models/profile.model';
import * as _ from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  private currentYear?: number;

  @Input() public experience?: Experience[];
  
  public projects?: Project[];

  get mobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  constructor(private deviceDetectorService:DeviceDetectorService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.update();
  }
  
  private update() {
    this.currentYear = undefined;
    const projects = (this.experience || [])
      .map(e => (e.projects || [])
      .map(p => ({
        ...p, 
        company: p.company ?? e.company, 
        role: _.first(e.roles ?? [])?.title
      }) as Project)
    ) ?? [];
  
    this.projects = _.flatten(projects);
    //this.projects = _.sortBy(this.projects, p => p.timespan?.from, ['desc']);
    this.projects = _.sortBy(this.projects, [p => p.timespan?.to, p => p.timespan?.from], ['desc']);
    this.projects = _.reverse(this.projects);
  }

  prevYear(date?: Date): boolean {
    const year = date?.getFullYear();
    if(year && this.currentYear !== year) {
      this.currentYear = year;
      return true;
    }
    return false;
  }

}
