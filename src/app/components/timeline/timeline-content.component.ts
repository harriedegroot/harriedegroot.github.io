import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
})
export class TimelineContentComponent {
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

  constructor(private cdRef: ChangeDetectorRef) {}
}
