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
  filter, fromEvent, Subject, takeUntil
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

  // get height() {
  //   return this.fullPage || !this.visible ? `${window.innerHeight}px` : 'auto';
  // }
  public height: string = 'auto';

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
  @Input() heightSource: 'window' | 'viewport' = 'viewport';
  @Input() title?: string;
  @Input() snap: boolean = true;
  @Input() snapUp: number = 30;
  @Input() snapDown: number = 15;
  @Input() titleStyle: TitleStyle = 'default';

  private _visible: boolean = false;
  public set visible(value: boolean) {
    this._visible = value;
    this.updateHeight();
  }
  public get visible(): boolean {
    return this._visible;
  }

  private _showNext: boolean = false;
  get showNext(): boolean {
    return this._showNext;
  }

  private _snap = new Subject<number>();
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private scrollingService: ScrollingService
  ) {}

  ngOnInit(): void {
    this.updateHeight();
    fromEvent(window, 'resize').pipe(takeUntil(this.destroyed$), debounceTime(500)).subscribe(() => this.updateHeight());
    if (this.snap) {
      
      const snapUp = 0.01 * this.snapUp;
      const snapDown = -0.01 * this.snapDown;
      this._snap
        .pipe(
          takeUntil(this.destroyed$),
          debounceTime(600),
          filter((percent) => this.visible),
          filter(
            (percent) =>
              (percent > 0 && percent < snapUp) ||
              (percent < 0 && percent > snapDown)
          )
        )
        .subscribe((percent) => this.snapTween(percent));
    }
  }

  public updateHeight() {
    if(this.fullPage) {
      this.height = this.heightSource === 'window' ? `${window.innerHeight}px` : '100vh';
    } else {
      this.height = 'auto';
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
    
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
