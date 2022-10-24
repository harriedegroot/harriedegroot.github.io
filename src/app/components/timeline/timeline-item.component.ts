import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineContentComponent {

  public readonly iconLeft = faCaretLeft as IconProp;
  public readonly iconRight = faCaretRight as IconProp;

  private _left: boolean = false;
  public get left(): boolean {
    return this._left;
  }
  @Input() public set left(value: boolean) {
    if(this._left !== value) {
      this._left = value;
      this.cdRef.detectChanges();
    }
  }

  private _right: boolean = false;
  public get right(): boolean {
    return this._right;
  }
  @Input() public set right(value: boolean) {
    if(this._right !== value) {
      this._right = value;
      this.cdRef.detectChanges();
    }
  }

  private _alternate: boolean = true;
  public get alternate(): boolean {
    return this._alternate;
  }
  @Input() public set alternate(value: boolean) {
    if(this._alternate !== value) {
      this._alternate = value;
      this.cdRef.detectChanges();
    }
  }

  @Input() line: boolean = true;
  @Input() indicator: boolean = true;
  @Input() indicatorLine: boolean = true;

  constructor(private cdRef: ChangeDetectorRef) {}
}
