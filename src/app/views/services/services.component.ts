import { ChangeDetectorRef, Component } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { gsap } from 'gsap';
import { sum } from 'lodash';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  public yearsExperience: number = 1;
  public projects: number = 1;
  public infiniteFill: number = 0;
  public customerSatisfaction: number = 1;

  private _delay: number = -1;
  private _shown: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profile$.pipe(take(1), filter(() => this._delay !== -1)).subscribe(() => this.show(this._delay));
  }
    
  public show(delay: number = 2) {
    this._delay = delay;
    
    const profile = this.profileService.profile;
    if(!profile)  return;
    
    if(this._shown) return;
    this._shown = true;

    const yearExperience = new Date().getFullYear() - 2007;
    const projects = sum(profile?.experience?.map(e => e.projects?.length ?? 0)) ?? [0];
    const customerSatisfaction = 100;
    const ease = "circ"; //'slowmo'

    const targetYears = { val: this.yearsExperience };
    gsap.to(targetYears, {
      duration: 4,
      val: yearExperience,
      ease,
      delay,
      onUpdate: () => {
        this.yearsExperience = Math.round(targetYears.val);
        this.cdRef.detectChanges();
      },
    });

    const targetProjects = { val: this.projects };
    gsap.to(targetProjects, {
      duration: 6,
      val: projects,
      ease,
      delay,
      onUpdate: () => {
        this.projects = Math.round(targetProjects.val);
        this.cdRef.detectChanges();
      },
    });

    const infinitePercent = { val: this.infiniteFill };
    gsap.to(infinitePercent, {
      duration: 8,
      val: 100,
      ease: 'linear',
      delay,
      onUpdate: () => {
        this.infiniteFill = Math.round(infinitePercent.val);
        this.cdRef.detectChanges();
      },
    });

    const targetPercent = { val: this.customerSatisfaction };
    gsap.to(targetPercent, {
      duration: 8,
      val: customerSatisfaction,
      ease,
      delay,
      onUpdate: () => {
        this.customerSatisfaction = Math.round(targetPercent.val);
        this.cdRef.detectChanges();
      },
    });
  }
}
