import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Output,
    Renderer2
} from '@angular/core';
import {
    distinctUntilChanged,
    filter,
    fromEvent,
    map,
    shareReplay,
    Subject,
    take,
    takeUntil
} from 'rxjs';

@Directive({ selector: '[visible]' })
export class VisibleDirective implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();

  @Input() public visibleClass: string = 'visible';
  @Input() public hiddenClass: string = 'hidden';
  @Input() public toggleClasses: boolean = true;
  @Input() public once: boolean = false;

  @Output('visible') visible$ = fromEvent(window, 'scroll').pipe(
    takeUntil(this.destroyed$),
    map(() => this.isVisible()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  @Output() show$ = this.visible$.pipe(filter((value) => value === true));
  @Output() hide$ = this.visible$.pipe(filter((value) => value === false));

  constructor(protected el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
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

  public isVisible(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
