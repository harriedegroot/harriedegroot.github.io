import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

import { Profile } from 'app/models/profile.model';
import { ScrollingService } from 'app/services/scrolling.service';
import { gsap } from 'gsap';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

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

  @Output('next') public readonly next$ = new EventEmitter<void>();
  nextSectionVisible: boolean = true;

  constructor(private zone: NgZone,  private scrollingService: ScrollingService) {}

  ngOnInit(): void {
    setTimeout(
      () => this.zone.run(() => (this.headlineCursor = false)),
      12 * 1000
    );

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

    this.scrollingService.scrollPosition$
      .pipe(
        filter((p) => p > 100),
        take(1)
      )
      .subscribe((pos) => (this.nextSectionVisible = false));
  }

  onNextSection() {
    this.next$.emit();
  }
}
