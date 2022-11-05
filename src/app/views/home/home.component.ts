import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ScrollingService } from 'app/services/scrolling.service';

import { Profile } from 'app/models/profile.model';
import { gsap } from 'gsap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  headlineCursor: boolean = true;
  locationCursor: boolean = false;

  @Input() public profile?: Profile | null;

  @Input() headline: string[] = [
    'MSc. Artificial Intelligence',
    'Freelance Full-Stack Developer',
    'Freelance Software Architect',
    'Freelance Software Engineer',
  ];
  @Input() location: string[] = [
    //'Netherlands',
    'Heerenveen',
  ];

  @Input() public sticky: boolean = true;
  visible: boolean = true;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private zone: NgZone,
    private scrollingService: ScrollingService
  ) {}

  ngOnInit(): void {
    this.scrollingService.scrollPosition$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((pos) => {
        if (pos < 50) {
          this.showMenu();
        } else {
          this.hideMenu();
        }
      });

    setTimeout(
      () => this.zone.run(() => (this.headlineCursor = false)),
      12 * 1000
    );

    this.showMenu(2);

    gsap.to('.contact .avatar', {
      width: 150,
      height: 150,
      opacity: 1,
      duration: 2,
      ease: 'back',
    });

    gsap.from('.contact .info .name', {
      width: 0,
      ease: 'power3',
      duration: 1,
      delay: 1.2,
    });

    gsap.to('.contact .typed', {
      opacity: 1,
      duration: 0.5,
      delay: 2,
    });
  }

  private _shown: boolean = false;
  public showMenu(delay?: number): void {
    if (this._shown) return;
    this._shown = true;
    
    gsap.to('#home-footer', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: delay,
    });
  }

  public hideMenu(delay?: number) {
    if (!this._shown) return;
    this._shown = false;

    gsap.to('#home-footer', {
      opacity: 0,
      y: 70,
      duration: 0.7,
      delay: delay,
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
