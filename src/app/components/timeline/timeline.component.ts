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
  @Input() alternate: boolean = true;

  @ContentChildren(TimelineContentComponent)
  public contents: QueryList<TimelineContentComponent> | undefined;

  @ContentChildren(TimelineMarkerComponent)
  public markers: QueryList<TimelineMarkerComponent> | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.update();
  }

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
    this.markers?.forEach((marker) => (marker.alternate = this.alternate));
  }
}
