import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-marker',
  templateUrl: './timeline-marker.component.html',
  styleUrls: ['./timeline-marker.component.scss']
})
export class TimelineMarkerComponent implements OnInit {

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

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
