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
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { TimelineContentComponent } from './timeline-item.component';
import { TimelineMarkerComponent } from './timeline-marker.component';

export type Side = 'left' | 'right';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [fadeAnimation]
})
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() side: Side = 'right';

  private readonly _register = new Map<number, boolean>();
  private _initialized: boolean = false;
  private readonly update$ = new Subject<void>();
  private readonly destroyed$ = new Subject<void>();

  private _alternate: boolean = true;
  public get alternate(): boolean {
    return this._alternate;
  }
  @Input() public set alternate(value: boolean) {
    if (this._alternate !== value) {
      this._alternate = value;
      if (this._initialized) {
        this.update$.next();
      }
    }
  }

  private _contents: QueryList<TimelineContentComponent> | undefined;
  public get contents(): QueryList<TimelineContentComponent> | undefined {
    return this._contents;
  }
  @ContentChildren(TimelineContentComponent)
  public set contents(value: QueryList<TimelineContentComponent> | undefined) {
    this._contents = value;
    this.loading = true;
    this.register();
    if (this._initialized) {
      this.update$.next();
    }
  }

  @ContentChildren(TimelineMarkerComponent)
  public markers: QueryList<TimelineMarkerComponent> | undefined;

  public loading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.update$
      .pipe(takeUntil(this.destroyed$), debounceTime(20))
      .subscribe(() => this._update());
  }

  ngAfterViewInit(): void {
    this.update$.next();
    this._initialized = true;
  }

  private register() {
    this.contents?.forEach((content, idx) =>
      this._register.set(idx, content.alternate)
    );
  }

  private _update(): void {
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

    this.loading = false;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
