import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { fadeAnimation, listAnimation } from 'app/helpers/animations';
import { getMonthDifference, toDate } from 'app/helpers/date';
import { Experience, Project, Skill } from 'app/models/profile.model';
import * as _ from 'lodash';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

function getYear(): number {
  const date = new Date();
  return date.getFullYear();
}

interface MinMax<T> {
  min: T;
  max: T;
}

const DEFAULT_PERIOD = 5; // last 5 years

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeAnimation, listAnimation],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @Input() public hiddenTags: string[] = [];
  @Input() public proficiency: number = 100;
  @Input() public period: number = getYear() - DEFAULT_PERIOD;
  @Input() public exclude: string[] = [];
  @Input() public minOpacity: number = 0.1;
  @Input() public floatingSliders: boolean = false;
  @Input() public slidersVisible: boolean = false;

  private _experience: Experience[] | null = null;
  public get experience(): Experience[] | null {
    return this._experience;
  }
  @Input()
  public set experience(value: Experience[] | null) {
    this._experience = value;
    this.initExperience();
  }

  @Output('proficiency') public readonly onProficiencyChange$ =
    new EventEmitter<number>();
  @Output('period') public readonly onPeriodChange$ =
    new EventEmitter<number>();

  public get years(): Uint16Array {
    return new Uint16Array(this.categories.keys())
      .filter((years) => years > 0)
      .sort()
      .reverse();
  }

  public readonly skills = new Set<string>();
  public readonly categories = new Map<number, Set<Skill>>();
  public readonly sorted = new Map<number, Skill[]>();
  public readonly projectsPerSkill = new Map<string, Set<Project>>();

  public minYear: number = getYear() - DEFAULT_PERIOD;
  public maxYear: number = getYear();

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private ga: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this._scrollingUpdate());

    this.onProficiencyChange$
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe((value) =>
        this.ga.event(
          'experience_proficiency_change',
          'experience',
          'proficiency',
          value,
          true
        )
      );

    this.onPeriodChange$
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe((value) =>
        this.ga.event(
          'experience_period_change',
          'experience',
          'year',
          value,
          true
        )
      );
  }

  public _scrollingUpdate(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.floatingSliders = rect.top < 0 && rect.bottom > 0;
    this.slidersVisible = rect.bottom > 130;
  }

  private initExperience() {
    // min year
    const projects = _.flatten(this.experience?.map((e) => e.projects)) ?? [];
    this.minYear =
      _.min(projects.map((p) => toDate(p?.timespan?.from)))?.getFullYear() ??
      this.minYear;

    this.refresh(false);
  }

  private _showed = false;
  public show(delay: number = 0): void {
    if(this._showed) return;
    this._showed = true;
    if(delay > 0) {
      setTimeout(() => this.refresh(), delay);
    } else {
      this.refresh();
    }
  }

  public refresh(animate: boolean = true) {
    if (!this._showed || !this.experience) return;

    if (animate) {
      this.clear();
    } else {
      this.categories.clear();
    }
  
    const skills = new Map<string, { skill: Skill; minMax: MinMax<Date> }>();
    const enabled = new Set<string>();
    if (this.experience) {
      const projects = _.flatten(this.experience.map((e) => e.projects));
      for (let project of projects) {
        if (!project || !project.timespan) continue;
        for (let tech of project.technologies ?? []) {
          if (tech.tags?.some((tag) => this.hiddenTags?.includes(tag))) {
            continue;
          }
          if ((tech.proficiency ?? 0) >= this.proficiency) {
            enabled.add(tech.name);
          }

          let { skill, minMax } = skills.get(tech.name) ?? {
            skill: tech,
            minMax: {
              min: toDate(project.timespan.from),
              max: toDate(project.timespan.to),
            },
          };

          minMax.min =
            toDate(project.timespan.from) < minMax.min
              ? toDate(project.timespan.from)
              : minMax.min;
          minMax.max =
            toDate(project.timespan.to) > minMax.max
              ? toDate(project.timespan.to)
              : minMax.max;
          skills.set(tech.name, { skill, minMax });
        }
      }
    }

    for (let [name, { skill, minMax }] of skills) {
      if (!enabled.has(name)) continue;
      if (this.exclude.includes(name)) continue;
      if (minMax.max.getFullYear() < this.period) continue;

      //const years = Math.floor(months / 12);
      const years = Math.floor(getMonthDifference(minMax.min, minMax.max) / 12);
      const skills = this.categories.get(years) ?? new Set<Skill>();
      skills.add(skill);
      this.categories.set(years, skills);
    }

    this.categories.forEach((value, key) => {
      const sorted = _.sortBy(Array.from(value), (skill) => skill.proficiency);
      return this.sorted.set(key, _.reverse(sorted));
    });

    this.cdRef.detectChanges();
  }

  public clear() {
    this.categories.clear();
    this.sorted.clear();
    this.cdRef.detectChanges();
  }

  public onProficiencyChange(value: number) {
    if (this.proficiency !== value) {
      //value = Math.max(value, 1);
      this.proficiency = value;
      this.refresh(false);
      this.onProficiencyChange$.emit(value);
    }
  }

  public onPeriodChange(year: number | null) {
    if (!year) return;
    if (this.period !== year) {
      this.period = year;
      this.refresh(false);
      this.onPeriodChange$.emit(year);
    }
  }

  getSkills(year: number, sort: boolean = true): Iterable<Skill> {
    return (sort ? this.sorted : this.categories).get(year) ?? [];
  }

  skillOpacity(skill: Skill) {
    if (this.minOpacity >= 1) return 1;
    return skill
      ? Math.max(0.01 * (skill.proficiency ?? 100), this.minOpacity)
      : 0;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
