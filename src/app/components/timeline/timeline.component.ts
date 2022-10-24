import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { TimelineContentComponent } from './timeline-item.component';
import { TimelineMarkerComponent } from './timeline-marker.component';

export type Side = 'left' | 'right';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterViewInit{
  @Input() side: Side = 'right';

  private readonly _register = new Map<number, boolean>();
  private _initialized: boolean = false;

  private _alternate: boolean = true;
  public get alternate(): boolean {
    return this._alternate;
  }
  @Input() public set alternate(value: boolean) {
    if(this._alternate !== value) {
      this._alternate = value;
      if(this._initialized) {
        this.update();
      }
    }
  }

  private _contents: QueryList<TimelineContentComponent> | undefined;
  public get contents(): QueryList<TimelineContentComponent> | undefined {
    return this._contents;
  }
  @ContentChildren(TimelineContentComponent)
  public set contents(value: QueryList<TimelineContentComponent> | undefined) {
    if(this._contents != value) {
      this._contents = value;

      this.register();
      if(this._initialized) {
        this.update();
      }
    }
  }

  @ContentChildren(TimelineMarkerComponent)
  public markers: QueryList<TimelineMarkerComponent> | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.update();
    this._initialized = true;
  }

  private register() {
    this.contents?.forEach((content, idx) => this._register.set(idx, content.alternate));
  }

  private update(): void {
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
}
