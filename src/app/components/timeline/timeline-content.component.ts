import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
})
export class TimelineContentComponent {
  @Input() left: boolean = false;
  @Input() right: boolean = false;
  @Input() alternate: boolean = true;
}
