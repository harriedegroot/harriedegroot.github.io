import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { fadeAnimation } from 'app/helpers/animations';
import { Subject } from 'rxjs';
import { TimelineContentComponent } from './timeline-item.component';
import { TimelineMarkerComponent } from './timeline-marker.component';

export type Side = 'left' | 'right';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [fadeAnimation]
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @Input() side: Side = 'right';

  private readonly _register = new Map<number, boolean>();
  private readonly destroyed$ = new Subject<void>();

  private _initialized: boolean = false;

  private _alternate: boolean = true;
  public get alternate(): boolean {
    return this._alternate;
  }
  @Input() public set alternate(value: boolean) {
    if (this._alternate !== value) {
      this._alternate = value;
      this._update();
    }
  }

  private _contents: QueryList<TimelineContentComponent> | undefined;
  public get contents(): QueryList<TimelineContentComponent> | undefined {
    return this._contents;
  }
  @ContentChildren(TimelineContentComponent)
  public set contents(value: QueryList<TimelineContentComponent> | undefined) {
    this._contents = value;
    this.register();
    this._update();
  }

  @ContentChildren(TimelineMarkerComponent)
  private _markers: QueryList<TimelineMarkerComponent> | undefined;
  public get markers(): QueryList<TimelineMarkerComponent> | undefined {
    return this._markers;
  }
  public set markers(value: QueryList<TimelineMarkerComponent> | undefined) {
    this._markers = value;
    this._update();
  }

  constructor() {}

  ngAfterViewInit() {
    this._initialized = true;
    this._update();
  }

  private register() {
    this.contents?.forEach((content, idx) =>
      this._register.set(idx, content.alternate)
    );
  }

  private _update(): void {
    if (!this._initialized) return;
    if (!this.contents) return;
    
    if (this.alternate) {
      let ignore = 0;
      const left = this.side === 'left';

      this.contents.forEach((content, index) => {
        if (!this._register.get(index)) {
          ignore++;
        }
        const odd = Boolean((index + ignore) & 1);
        content.left = left ? !odd : odd;
        content.right = left ? odd : !odd;
      });
    } else {
      this.contents.forEach((content) => {
        content.left = this.side === 'left';
        content.right = this.side === 'right';
      });
    }
    this.contents.forEach((content) => (content.alternate = this.alternate));
    this.markers?.forEach((marker) => (marker.alternate = this.alternate));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
