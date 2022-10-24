import {
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { TimelineContentComponent } from './timeline-content.component';

export type Side = 'left' | 'right';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() side: Side = 'right';
  @Input() alternate: boolean = true;

  private _contents?: QueryList<TimelineContentComponent> | undefined;
  public get contents(): QueryList<TimelineContentComponent> | undefined {
    return this._contents;
  }
  @ContentChildren(TimelineContentComponent)
  public set contents(value: QueryList<TimelineContentComponent> | undefined) {
    if(this._contents !== value) {
      this._contents = this.update(value);
    }
  }

  constructor() {}

  private update(value: QueryList<TimelineContentComponent> | undefined): QueryList<TimelineContentComponent> | undefined {
    if (!value) return undefined;

    if (this.alternate) {
      let ignore = 0;
      const left = this.side === 'left';

      value.forEach((content, index) => {
        if (content.alternate === false) {
          ignore++;
        } 
        const odd = Boolean((index + ignore) & 1);
        content.left = left ? !odd : odd;
        content.right = left ? odd : !odd;
      });
    } else {
      value.forEach((content) => {
        content.left = this.side === 'left';
        content.right = this.side === 'right';
      });
    }
    value.forEach((content) => (content.alternate = this.alternate));
    return value;
  }
}
