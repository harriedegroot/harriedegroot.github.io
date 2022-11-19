import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ScrollingService } from 'app/services/scrolling.service';
import { ScrollTrigger } from 'gsap/all';
import {
  debounceTime,
  filter, Subject,
  Subscription
} from 'rxjs';

export type TitleStyle = 'default' | 'transparent' | 'accent' | 'light' | 'dark';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private static COUNTER: number = 0;

  private _scrollTrigger?: ScrollTrigger;

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

  @Input() name!: string;
  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;
  @Input() snap: boolean = true;
  @Input() snapUp: number = 30;
  @Input() snapDown: number = 15;
  @Input() titleStyle: TitleStyle = 'default';

  private _visible: boolean = false;
  public get visible(): boolean {
    return this._visible;
  }

  private _showNext: boolean = false;
  get showNext(): boolean {
    return this._showNext;
  }

  private _snap = new Subject<number>();
  private _snapSubscription?: Subscription;

  constructor(
    private el: ElementRef,
    private scrollingService: ScrollingService
  ) {}

  ngOnInit(): void {
    if (this.snap) {
      
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
    this.scrollingService.smoothScrollTo(this.name);
    this.snap$.emit(this.name);
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
      trigger: '#' + this.name,
      start: 'top bottom',
      onToggle: (self) => this._setVisibility(self.isActive),
      onUpdate: (self) => this._snap.next(this.getScrollPercentage()),
    });
  }

  private _setVisibility(value: boolean) {
    if (this._visible != value) {
      this._visible = value;
      if (value) {
        this.shown$.emit();
      } else {
        this.hidden$.emit();
      }
      this.visible$.emit(value);
    }
    this._scrollTrigger?.refresh();
  }

  onNextClick() {
    this.nextEmitter.emit();
  }

  ngOnDestroy(): void {
    this._scrollTrigger?.kill();
    this._snapSubscription?.unsubscribe();
  }
}
