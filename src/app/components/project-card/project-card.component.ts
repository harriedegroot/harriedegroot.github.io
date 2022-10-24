import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmploymentType, Project, Skill } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import * as _ from 'lodash';
import { Subject, takeUntil } from 'rxjs';

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

  @ViewChild('technologiesEl')
  technologiesEl?: ElementRef;

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
    return this.hasMoreTechnologies || !!this.project?.website;
  }

  private _hasMoreTechnologies?: boolean;
  get hasMoreTechnologies(): boolean {
    if (this._hasMoreTechnologies === undefined) {
      const el = this.technologiesEl?.nativeElement;
      this._hasMoreTechnologies = el?.scrollHeight > 80;
    }
    return this._hasMoreTechnologies;
  }

  private readonly destroyed$ = new Subject<void>();

  constructor(private device: DeviceService) {
    device.resize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => (this._hasMoreTechnologies = undefined));
  }

  ngOnInit(): void {}

  goto(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
