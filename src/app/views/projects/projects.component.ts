import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { timespan, toDate, toMoment } from 'app/helpers/date';
import { Experience, Project, TimeSpan } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import { timeStamp } from 'console';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  private _experience?: Experience[] | undefined;
  public get experience(): Experience[] | undefined {
    return this._experience;
  }
  @Input()
  public set experience(value: Experience[] | undefined) {
    if(this.experience !== value) {
      this._experience = value;
      this.update();
    }
  }

  public projects?: Project[];

  get mobile$(): Observable<boolean> {
    return this.device.isMobile$;
  }

  @Input() showAll: boolean = false;

  private _currentYear?: number;
  private readonly _yearCache = new Map<number, boolean>();

  constructor(private device: DeviceService) {}

  ngOnInit(): void {}

  private update() {
    this._currentYear = undefined;
    this._yearCache.clear();

    let projects =
      (this.experience || []).map((e) =>
        (e.projects || []).map(
          (p) =>
            ({
              ...p,
              company: p.company ?? e.company,
              timespan: timespan(p.timespan),
              role: p.role ?? _.first(e.roles ?? []),
            } as Project)
        )
      ) ?? [];

    let list = _.flatten(projects);
    list = _.sortBy(
      list,
      [(p) => p.timespan?.to, (p) => p.timespan?.from],
      ['desc']
    );
    this.projects = _.reverse(list);
  }

  nextYear(idx: number, date?: Date | string): boolean {
    if (!this._yearCache.has(idx)) {
      const year = moment(date).toDate()?.getFullYear();
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

  formatDate(date: string|Date|undefined, format: string): string {
    return toMoment(date).format(format);
  }
}
