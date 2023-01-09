import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-loop',
  templateUrl: './infinite-loop.component.html',
  styleUrls: ['./infinite-loop.component.scss']
})
export class InfiniteLoopComponent implements AfterViewInit, OnChanges{
  
  @Input() fill: number = 60;
  @Input() animate: boolean = true;

  @ViewChild('path', { read: ElementRef })
  path!: ElementRef;

  @ViewChild('spinner', { read: ElementRef })
  spinner!: ElementRef;

  private _initialized: boolean = false;

  ngAfterViewInit() {
    this._initialized = true;
    const length = this.path.nativeElement.getTotalLength();
    this.spinner.nativeElement.style.setProperty('--total-length', length);
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  private update() {
    if(!this._initialized) return;
    this.spinner.nativeElement.style.setProperty('--looping-percent', this.fill);
  }
}
