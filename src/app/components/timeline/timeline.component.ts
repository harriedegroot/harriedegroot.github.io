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
    this._contents = value;
    this.update();
  }

  constructor() {}

  private update(): void {
    if (!this.contents) return;

    if (this.alternate) {
      let ignore = 0;
      const left = this.side === 'left';

      this.contents.forEach((content, index) => {
        if (content.alternate === false) {
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
  }
}
