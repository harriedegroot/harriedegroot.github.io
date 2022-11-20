import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  shareReplay
} from 'rxjs';

export interface Size {
  width: number;
  height: number;
}

export type Orientation = 'horizontal' | 'vertical';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public mobileWidth: number = 900;
  public get isMobile(): boolean {
    return window.innerWidth < this.mobileWidth;
  }

  public readonly resize$: Observable<Size> = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    distinctUntilChanged(),
    map((e: any) => ({
      width: e.target.innerWidth,
      height: e.target.innerHeight,
    }))
  );

  public readonly viewportSize$: Observable<Size> = merge(
    of({ width: window.innerWidth, height: innerHeight } as Size),
    this.resize$
  ).pipe(shareReplay(1));

  public readonly isMobile$ = this.viewportSize$.pipe(
    map((size) => size.width <= this.mobileWidth)
  );

  public readonly isDesktop$ = this.viewportSize$.pipe(
    map((size) => size.width > this.mobileWidth)
  );

  public orientation$: Observable<Orientation> = this.resize$.pipe(
    map((size) => (size.width > size.height ? 'horizontal' : 'vertical')),
    distinctUntilChanged(),
  );

  constructor(private deviceDetectorService: DeviceDetectorService) {}
}
