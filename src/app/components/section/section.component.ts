import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/all';
import {
  debounceTime,
  filter,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';
import gsap from 'gsap';
import { ScrollingService } from 'app/services/scrolling.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private static COUNTER: number = 0;

  private _scrollTrigger?: ScrollTrigger;
  private _idx = ++SectionComponent.COUNTER;
  readonly id: string = `section_${this._idx}`;

  get height() {
    return this.fullPage || !this.visible ? '100vh' : 'auto';
  }

  @Output('shown') public readonly shown$ = new EventEmitter<void>();
  @Output('hidden') public readonly hidden$ = new EventEmitter<void>();
  @Output('visible') public readonly visible$ = new EventEmitter<boolean>();
  @Output('snap') public readonly snap$ = new EventEmitter<string>();

  private readonly _nextEmitter = new EventEmitter<void>();
  @Output('next') public get nextEmitter() {
    this._showNext = true;
    return this._nextEmitter;
  }

  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;
  @Input() snap: boolean = true;
  @Input() snapUp: number = 30;
  @Input() snapDown: number = 15;

  private _visible: boolean = false;
  public get visible(): boolean {
    return this._visible;
  }

  private _showNext: boolean = false;
  get showNext(): boolean {
    return this._showNext;
  }

  private _snapTween?: gsap.core.Tween;
  private _snap = new Subject<number>();
  private _snapSubscription?: Subscription;

  constructor(
    private el: ElementRef,
    private scrollingService: ScrollingService
  ) {}

  ngOnInit(): void {
    if (this.snap) {
      this.scrollingService.scrollDirection$
        .pipe(throttleTime(500))
        .subscribe((dir) => this._snapTween?.pause());

      const snapUp = 0.01 * this.snapUp;
      const snapDown = -0.01 * this.snapDown;
      this._snapSubscription = this._snap
        .pipe(
          debounceTime(600),
          filter((percent) => this._visible),
          filter(
            (percent) =>
              (percent > 0 && percent < snapUp) ||
              (percent < 0 && percent > snapDown)
          )
        )
        .subscribe((percent) => this.snapTween(percent));
    }
  }

  public snapTween(percent: number) {
    // if (!this._snapTween) {
    //   this._snapTween = gsap.to(window, {
    //     duration: 0.3,
    //     scrollTo: '#' + this.id,
    //     ease: 'power1.inOut',
    //   });
    // } else {
    //   this._snapTween.restart();
    // }
    
    //console.log('SNAP', this.id)
    
    this.scrollingService.smoothScrollTo(this.id);

    this.snap$.emit(this.id);
  }

  public isFullScreen(): boolean {
    return this.el.nativeElement.offsetHeight <= window.innerHeight;
  }

  public getScrollPercentage(): number {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const top = rect.top;
    const height = window.innerHeight;
    const percent = top / height;
    return percent;
  }

  ngAfterViewInit(): void {
    this._scrollTrigger = ScrollTrigger.create({
      trigger: '#' + this.id,
      start: 'top bottom',
      onToggle: (self) => this._setVisibility(self.isActive),
      onUpdate: (self) => this._snap.next(this.getScrollPercentage()),
    });
  }

  private _setVisibility(value: boolean) {
    if (this._visible != value) {
      this._visible = value;
      if (value) {
        this.showTitle();
        this.shown$.emit();
      } else {
        //this._snapTween?.pause();
        this.hidden$.emit();
      }
      this.visible$.emit(value);
    }
    this._scrollTrigger?.refresh();
  }

  onNextClick() {
    this.nextEmitter.emit();
  }

  public showTitle(animate: boolean = true) {}

  public hideTitle(animate: boolean = true) {}

  ngOnDestroy(): void {
    this._scrollTrigger?.kill();
    this._snapSubscription?.unsubscribe();
    this._snapTween?.kill();
  }
}
