import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { gsap } from 'gsap';
import { sum } from 'lodash';
import { take } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  public yearsExperience: number = 1;
  public projects: number = 1;
  public customerSatisfaction: number = 1;

  constructor(private cdRef: ChangeDetectorRef, private zone: NgZone, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profile$.pipe(take(1)).subscribe(profile => this.animate());
  }
    
  private animate() {
    const delay = 2;
    const yearExperience = 15;
    const projects = sum(this.profileService.profile?.experience?.map(e => e.projects?.length ?? 0)) ?? [0];
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
      duration: 7,
      val: projects,
      ease,
      delay,
      onUpdate: () => {
        this.projects = Math.round(targetProjects.val);
        this.cdRef.detectChanges();
      },
    });

    const targetPercent = { val: this.customerSatisfaction };
    gsap.to(targetPercent, {
      duration: 10,
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
