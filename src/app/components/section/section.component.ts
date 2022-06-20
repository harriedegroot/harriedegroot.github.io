import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  get height() { return this.fullPage ? '100vh' : 'auto' }

  
  private readonly _nextEmitter = new EventEmitter<void>();
  @Output('next') public get nextEmitter() {
    this._showNext = true;
    return this._nextEmitter;
  }

  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;

  private _showNext: boolean = false;
  get showNext():boolean {
    return this._showNext;
  } 

  constructor() { }

  ngOnInit(): void {
  }

  onNextClick() {
    this.nextEmitter.emit();
  }

}
