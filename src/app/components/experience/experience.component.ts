
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { fadeAnimation, listAnimation } from 'app/helpers/animations';
import { getMonthDifference } from 'app/helpers/date';
import { Experience, Project, Skill } from 'app/models/profile.model';
import * as _ from 'lodash';

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
  animations: [fadeAnimation, listAnimation]
})
export class ExperienceComponent implements OnInit {
  @Input() public hiddenTags: string[] = [];
  @Input() public experience: Experience[] = [];
  @Input() public proficiency: number = 100;
  @Input() public period: number = getYear() - DEFAULT_PERIOD;
  @Input() public exclude: string[] = [];
  
  public get years(): Uint16Array {
    return new Uint16Array(this.categories.keys())
    .filter((years) => years > 0)
    .sort()
    .reverse();
  }
  
  public readonly skills = new Set<string>();
  public readonly categories = new Map<number, Set<string>>();
  public readonly projectsPerSkill = new Map<string, Set<Project>>();
  
  public minYear: number = getYear() - DEFAULT_PERIOD;
  public maxYear: number = getYear();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    //this.refresh();

    // min year
    const projects = _.flatten(this.experience.map((e) => e.projects));
    this.minYear = _.min(projects.map(p => p?.timespan?.from))?.getFullYear() ?? this.minYear;
  }

  public refresh(animate: boolean = true) {
    if(animate) {
      this.clear();
    } else {
      this.categories.clear();
    }
    const skills = new Map<string, MinMax<Date>>();
    const enabled = new Set<string>()
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
          };

          let minMax = skills.get(tech.name) ?? { min: project.timespan.from, max: project.timespan.to };
          minMax.min = project.timespan.from < minMax.min ? project.timespan.from : minMax.min;
          minMax.max = project.timespan.to > minMax.max ? project.timespan.to : minMax.max;
          
          // months += getMonthDifference(
          //   project.timespan?.from,
          //   project.timespan?.to
          // );
          skills.set(tech.name, minMax);
        }
      }
    }

    for (let [name, minMax] of skills) {
      if(!enabled.has(name)) continue;
      if(this.exclude.includes(name)) continue;
      if(minMax.max.getFullYear() < this.period) continue;

      //const years = Math.floor(months / 12);
      const years = Math.floor(getMonthDifference(minMax.min, minMax.max) / 12);
      const skills = this.categories.get(years) ?? new Set<string>();
      skills.add(name);
      this.categories.set(years, skills);
    }

    this.cdRef.detectChanges();
  }

  public clear() {
    this.categories.clear();
    this.cdRef.detectChanges();
  }

  public onProficiencyChange(value: number) {
    if(this.proficiency !== value) {
      //value = Math.max(value, 1);
      this.proficiency = value;
      this.refresh(false);
    }
  }

  public onPeriodChange(year: number | null) {
    if(!year) return;
    if(this.period !== year) {
      this.period = year;
      this.refresh(false);
    }
  }
}
