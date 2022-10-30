import { ViewportScroller } from '@angular/common';
import { HostListener, Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  shareReplay,
  Subject,
} from 'rxjs';

const SCROLL_DEBOUNCE = 50;
const CONTINUE_DEBOUNCE = 600;

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {
  private _scrollDebounce?: _.DebouncedFunc<() => boolean>;

  private _scrollTarget?: string;
  public get scrollTarget(): string | null {
    return this._scrollTarget ?? null;
  }

  public readonly scrolling$ = new Subject<boolean>();
  private _isScrolling: boolean = false;
  public get isScrolling(): boolean {
    return this._isScrolling;
  }
  public set isScrolling(value: boolean) {
    if (this._isScrolling !== value) {
      this._isScrolling = value;
      this.scrolling$.next(value);
    }
  }

  public readonly scrollPosition$ = fromEvent(window, 'scroll').pipe(
    debounceTime(50),
    map(() => this.getScrollPosition()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly scrollPercentage$ = fromEvent(window, 'scroll').pipe(
    debounceTime(50),
    map(() => this.getScrollPercentage()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private viewportScroller: ViewportScroller) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolling = true;
    this._scrollDebounce?.cancel();
    this._scrollDebounce = _.debounce(
      () => (this.isScrolling = false),
      SCROLL_DEBOUNCE
    );
  }

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
