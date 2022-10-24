import { Component, Input, OnInit } from '@angular/core';
import { Experience, Project, TimeSpan } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  @Input() public experience?: Experience[];

  public projects?: Project[];

  get mobile$(): Observable<boolean> {
    return this.device.isMobile$;
    //return this.deviceDetectorService.isMobile();
  }

  @Input() showAll: boolean = false;

  private _currentYear?: number;
  private readonly _yearCache = new Map<number, boolean>();

  constructor(private device: DeviceService) {}

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
              role: p.role ?? _.first(e.roles ?? []),
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

  duration(timespan?: TimeSpan): string {
    if(!timespan?.from || !timespan.to) return '';
    const diff = moment(timespan.to).endOf('month').diff(moment(timespan.from).startOf('month'));
    const years = moment.duration(diff).years();
    const months = moment.duration(diff).months();
    
    return [
      years ? `${years} ${years > 1 ? 'yrs' : 'yr' }` : null,
      months ? `${months} ${months > 1 ? 'mos' : 'mo' }` : null
    ].filter(x => x !== null).join(' ');
  }
}
