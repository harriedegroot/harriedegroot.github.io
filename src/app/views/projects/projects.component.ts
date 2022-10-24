import { Component, Input, OnInit } from '@angular/core';
import { Experience, Project } from 'app/models/profile.model';
import * as _ from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() public experience?: Experience[];

  public projects?: Project[];

  get mobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  @Input() showAll: boolean = false;
  
  private _currentYear?: number;
  private readonly _yearCache = new Map<number, boolean>();

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.update();
  }

  private update() {
    this._currentYear = undefined;
    this._yearCache.clear();

    const projects =
      (this.experience || []).map((e) =>
        (e.projects || []).map(
          (p) =>
            ({
              ...p,
              company: p.company ?? e.company,
              role: _.first(e.roles ?? [])?.title,
            } as Project)
        )
      ) ?? [];

    this.projects = _.flatten(projects);
    this.projects = _.sortBy(
      this.projects,
      [(p) => p.timespan?.to, (p) => p.timespan?.from],
      ['desc']
    );
    this.projects = _.reverse(this.projects);
  }

  nextYear(idx: number, date?: Date): boolean {
    if (!this._yearCache.has(idx)) {
      const year = date?.getFullYear();
      if (year && this._currentYear !== year) {
        this._currentYear = year;
        this._yearCache.set(idx, true);
        return true;
      } else {
        this._yearCache.set(idx, false);
      }
    }
    return this._yearCache.get(idx) ?? false;
  }
}
