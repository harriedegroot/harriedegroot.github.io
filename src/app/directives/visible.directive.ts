import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import {
  delay,
  distinctUntilChanged,
  shareReplay,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';

@Directive({ selector: '[visible]' })
export class VisibleDirective implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  protected readonly _intersecting$ = new Subject<boolean>();
  private observer?: IntersectionObserver;

  @Input() public visibleClass: string = 'visible';
  @Input() public hiddenClass: string = 'hidden';
  @Input() public toggleClasses: boolean = true;
  @Input() public once: boolean = false;
  @Input() public delay: number = 0; // delay in ms

  @Output('visible') visible$ = this._intersecting$.pipe(
    startWith(false),
    takeUntil(this.destroyed$),
    distinctUntilChanged(),
    shareReplay(1)
  );

  @Output() public readonly show$ = new EventEmitter<void>();
  @Output() public readonly hide$ = new EventEmitter<void>();

  constructor(protected el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.visible$
      .pipe(takeUntil(this.destroyed$), delay(this.delay))
      .subscribe((value) => {
        if (value) {
          this.show$.emit();
        } else {
          this.hide$.emit();
        }
      });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this._intersecting$.next(entry.isIntersecting);
        });
      },
      { threshold: [0] }
    );
    this.observer.observe(this.el.nativeElement);

    if (this.toggleClasses) {
      if (this.once) {
        this.show$
          .pipe(takeUntil(this.destroyed$), take(1))
          .subscribe(() => this._toggleClasses(true));
      } else {
        this.visible$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((visible) => this._toggleClasses(visible));
      }
    }
  }

  private _toggleClasses(visible: boolean): void {
    const nativeElement = this.el.nativeElement;
    if (visible) {
      this.renderer.addClass(nativeElement, this.visibleClass);
      this.renderer.removeClass(nativeElement, this.hiddenClass);
    } else {
      this.renderer.removeClass(nativeElement, this.visibleClass);
      this.renderer.addClass(nativeElement, this.hiddenClass);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
