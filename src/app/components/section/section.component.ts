import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/all';
import { debounceTime, filter, Subject, Subscription } from 'rxjs';
import gsap from 'gsap';

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
    return this.fullPage ? '100vh' : 'auto';
  }

  @Output('shown') public readonly shownEmitter = new EventEmitter<void>();
  @Output('hidden') public readonly hiddenEmitter = new EventEmitter<void>();
  @Output('visible') public readonly visibleEmitter = new EventEmitter<boolean>();

  private readonly _nextEmitter = new EventEmitter<void>();
  @Output('next') public get nextEmitter() {
    this._showNext = true;
    return this._nextEmitter;
  }

  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;
  @Input() snap: boolean = true;
  @Input() snapUp: number = 50;
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

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    this._snapTween?.kill();
  }

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.snap) {
      const snapUp = 0.01 * this.snapUp;
      const snapDown = -0.01 * this.snapDown;
      this._snapSubscription = this._snap
        .pipe(
          debounceTime(400),
          filter((percent) => this._visible),
          filter((percent) =>
              (percent > 0 && percent < snapUp) ||
              (percent < 0 && percent > snapDown)
          )
        )
        .subscribe((percent) => this.snapTween(percent));
    }
  }

  public snapTween(percent: number) {
    this._snapTween?.kill();
    this._snapTween = gsap.to(window, {
      duration: 0.3,
      scrollTo: '#' + this.id,
      ease: 'power1.inOut',
      //ease: 'power2',
    });
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
      //markers: true,
      trigger: '#' + this.id,
      start: 'top bottom',
      onToggle: (self) => this._setVisibility(self.isActive),
      onUpdate: (self) => this._snap.next(this.getScrollPercentage()),
      //onUpdate: (self) => this._snap.next(self.progress),
    });
  }

  private _setVisibility(value: boolean) {
    if (this._visible != value) {
      this._visible = value;
      if (value) {
        this.showTitle();
        this.shownEmitter.emit();
      } else {
        this._snapTween?.kill();
        this.hiddenEmitter.emit();
      }
      this.visibleEmitter.emit(value);
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
