import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faLocationPin, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { EmploymentType, Project, Skill } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import * as _ from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  @Input() role: boolean = true;
  @Input() company: boolean = true;
  @Input() skills: boolean = true;
  @Input() chips: boolean = true;
  @Input() expanded: boolean = false;

  private _technologiesEl?: ElementRef | undefined;
  public get technologiesEl(): ElementRef | undefined {
    return this._technologiesEl;
  }
  @ViewChild('technologiesEl')
  public set technologiesEl(value: ElementRef | undefined) {
    if(this._technologiesEl != value) {
      this._technologiesEl = value;
      this._detectMoreTech();
    }
  }

  iconLocation = faLocationPin as IconProp;
  iconExternal = faArrowUpRightFromSquare as IconProp;

  private _technologies?: Skill[];
  get technologies(): Skill[] {
    if (!this._technologies && this.project?.technologies) {
      this._technologies = _.sortBy(
        this.project.technologies,
        (s) => s.proficiency
      );
      this._technologies = _.reverse(this._technologies);
    }
    return this._technologies ?? [];
  }

  get typeLabel(): string {
    return EmploymentType[this.project.role?.type ?? -1] ?? '';
  }

  get showMore(): boolean {
    if (this.expanded) return false;
    return this.hasMoreTechnologies; // || !!this.project?.website;
  }

  hasMoreTechnologies: boolean = false;
  
  private readonly destroyed$ = new Subject<void>();

  constructor(device: DeviceService, private ga: GoogleAnalyticsService) {
    device.resize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this._detectMoreTech());
  }

  ngOnInit(): void {}

  private _detectMoreTech() {
    setTimeout(() => {
      const el = this.technologiesEl?.nativeElement;
      this.hasMoreTechnologies = el?.scrollHeight > 80;
    });
  }

  goto(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
