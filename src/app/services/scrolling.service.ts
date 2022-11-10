import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  throttleTime
} from 'rxjs';

export type Scrolling = 'up' | 'down' | 'idle';

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {
  private _scrollDebounce?: _.DebouncedFunc<() => boolean>;

  private _scrollTarget?: string;
  public get scrollTarget(): string | null {
    return this._scrollTarget ?? null;
  }

  public readonly scrollDirection$: Observable<'up' | 'down'> = fromEvent(window, 'scroll').pipe(
      map(() => window.pageYOffset),
      pairwise(),
      throttleTime(300),
      map(([y1, y2]) => (y2 < y1 ? "up" : "down")),
  );

  public readonly noScroll$: Observable<'idle'> = fromEvent(window, 'scroll').pipe(
    startWith(0),
    debounceTime(200),
    map(() => 'idle')
  );

  public readonly scrolling$: Observable<Scrolling> = merge(this.scrollDirection$, this.noScroll$).pipe(
    switchMap((e) => e === 'idle' ? interval(200).pipe(map(() => 'idle' as Scrolling)) : of(e)),
    distinctUntilChanged()
  )

  public readonly isScrolling$ = this.scrolling$.pipe(
    map(s => s !== 'idle'),
    distinctUntilChanged()
  );

  public readonly scrollPosition$ = fromEvent(window, 'scroll').pipe(
    //throttleTime(50),
    map(() => this.getScrollPosition()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly scrollPercentage$ = fromEvent(window, 'scroll').pipe(
    //throttleTime(50),
    map(() => this.getScrollPercentage()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private viewportScroller: ViewportScroller) {}

  public getScrollPosition(): number {
    return this.viewportScroller.getScrollPosition()[1];
  }

  public getScrollHeight(): number {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }

  public getViewportHeight(): number {
    return window.innerHeight;
  }

  public getScrollPercentage() {
    const percent = this.getScrollPosition() / (this.getScrollHeight() - this.getViewportHeight()) * 100;
    return Math.round(percent);
  }

  public scrollTo(item?: string) {
    this._scrollTarget = item;
    if (item) {
      this.viewportScroller.scrollToAnchor(item);
    }
  }

  public smoothScrollTo(item?: string) {
    this._scrollTarget = item;
    if (item) {
      document
        .getElementById(item)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
    }
  }
}
