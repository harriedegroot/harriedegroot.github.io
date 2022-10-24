import { Injectable } from '@angular/core';
import { concat } from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, merge, Observable, of, ReplaySubject, shareReplay, withLatestFrom, zip } from 'rxjs';

export interface Size {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public readonly resize$: Observable<Size> = 
    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((e: any) => {
        return { width: e.target.innerWidth, height: e.target.innerHeight };
      })
    );

  public readonly viewportSize$: Observable<Size> = merge(
    of({ width: window.innerWidth, height: innerHeight } as Size),
    this.resize$
  ).pipe(shareReplay(1))

  public readonly isMobile$ = this.viewportSize$.pipe(
    map(size => size.width <= 900)
  )
  
  constructor(private deviceDetectorService: DeviceDetectorService) { }
}
